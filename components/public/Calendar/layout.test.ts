import { describe, expect, it } from "vitest";

import { getVisibleRange, normalizeEvents, toCalendarDateValue } from "./date";
import {
  layoutDaySpanEvents,
  layoutMonthEvents,
  layoutTimedEventsForDay,
} from "./layout";

describe("calendar layout engine", () => {
  it("places overlapping timed events in deterministic columns", () => {
    const events = normalizeEvents(
      [
        {
          id: "a",
          title: "A",
          start: "2026-07-30T08:00:00Z",
          end: "2026-07-30T10:00:00Z",
        },
        {
          id: "b",
          title: "B",
          start: "2026-07-30T08:30:00Z",
          end: "2026-07-30T09:30:00Z",
        },
        {
          id: "c",
          title: "C",
          start: "2026-07-30T09:00:00Z",
          end: "2026-07-30T11:00:00Z",
        },
      ],
      "UTC",
    );
    const date = toCalendarDateValue("2026-07-30", "UTC");
    const layout = layoutTimedEventsForDay(events, date, "UTC", 7, 20);

    expect(layout).toHaveLength(3);
    expect(new Set(layout.map((item) => item.left)).size).toBe(3);
    expect(layout.every((item) => item.width === 100 / 3)).toBe(true);
  });

  it("clips midnight-ending events to the end of the day", () => {
    const [event] = normalizeEvents(
      [
        {
          id: "late",
          title: "Late",
          start: "2026-07-30T22:00:00Z",
          end: "2026-07-31T00:00:00Z",
        },
      ],
      "UTC",
    );
    const date = toCalendarDateValue("2026-07-30", "UTC");
    const [layout] = layoutTimedEventsForDay([event], date, "UTC", 20, 24);

    expect(layout.top).toBe(50);
    expect(layout.height).toBe(50);
  });

  it("continues multi-day events across month week boundaries", () => {
    const events = normalizeEvents(
      [
        {
          id: "conference",
          title: "Conference",
          start: "2026-07-24",
          end: "2026-07-30",
          allDay: true,
        },
      ],
      "UTC",
    );
    const date = toCalendarDateValue("2026-07-15", "UTC");
    const range = getVisibleRange(date, "month", "en-GB", "mon");
    const layout = layoutMonthEvents(events, range);

    expect(layout.segments).toHaveLength(2);
    expect(layout.segments[0].continuesAfter).toBe(true);
    expect(layout.segments[1].continuesBefore).toBe(true);
  });

  it("lays all-day spans across only the supplied visible days", () => {
    const events = normalizeEvents(
      [
        {
          id: "offsite",
          title: "Offsite",
          start: "2026-07-30",
          end: "2026-08-03",
          allDay: true,
        },
      ],
      "UTC",
    );
    const days = [
      "2026-07-29",
      "2026-07-30",
      "2026-07-31",
      "2026-08-01",
      "2026-08-02",
    ].map((value) => toCalendarDateValue(value, "UTC"));
    const layout = layoutDaySpanEvents(events, days);

    expect(layout.segments[0]).toMatchObject({
      startColumn: 1,
      span: 4,
      continuesAfter: false,
      continuesBefore: false,
    });
  });
});
