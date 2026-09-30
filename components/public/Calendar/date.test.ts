import { describe, expect, it } from "vitest";

import {
  eachDay,
  getVisibleRange,
  moveTimedEvent,
  navigateDate,
  normalizeEvent,
  normalizeEvents,
  snapMinutes,
  toCalendarDateValue,
} from "./date";

describe("calendar date engine", () => {
  it("keeps all-day ranges date-only and end-exclusive", () => {
    const event = normalizeEvent(
      {
        id: "launch",
        title: "Launch",
        start: "2026-07-30",
        end: "2026-07-31",
        allDay: true,
      },
      "Europe/London",
    );

    expect(event.startDate.toString()).toBe("2026-07-30");
    expect(event.endDate.toString()).toBe("2026-07-31");
    expect(event.endDate.compare(event.startDate)).toBe(1);
  });

  it("rejects inverted and zero-length events", () => {
    expect(() =>
      normalizeEvent(
        {
          id: "invalid",
          title: "Invalid",
          start: "2026-07-30T10:00:00Z",
          end: "2026-07-30T10:00:00Z",
        },
        "UTC",
      ),
    ).toThrow(/must end after/);
  });

  it("rejects duplicate event identities", () => {
    const event = {
      id: "duplicate",
      title: "Duplicate",
      start: "2026-07-30",
      end: "2026-07-31",
      allDay: true,
    };

    expect(() => normalizeEvents([event, event], "Europe/London")).toThrow(
      /must be unique/,
    );
  });

  it("converts absolute times across a daylight-saving transition", () => {
    const event = normalizeEvent(
      {
        id: "dst",
        title: "DST",
        start: "2026-03-29T00:30:00Z",
        end: "2026-03-29T02:30:00Z",
      },
      "Europe/London",
    );

    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: "Europe/London",
    });

    expect(formatter.format(event.start)).toBe("00:30");
    expect(formatter.format(event.end)).toBe("03:30");
    expect(event.end.getTime() - event.start.getTime()).toBe(2 * 60 * 60_000);
  });

  it("produces complete month and week ranges", () => {
    const date = toCalendarDateValue("2026-07-15", "Europe/London");
    const month = getVisibleRange(date, "month", "en-GB", "mon");
    const week = getVisibleRange(date, "week", "en-GB", "mon");

    expect(month.start.toString()).toBe("2026-06-29");
    expect(month.end.toString()).toBe("2026-08-03");
    expect(eachDay(month.start, month.end)).toHaveLength(35);
    expect(week.start.toString()).toBe("2026-07-13");
    expect(week.end.toString()).toBe("2026-07-20");
  });

  it("moves timed events while preserving their absolute duration", () => {
    const event = normalizeEvent(
      {
        id: "review",
        title: "Review",
        start: "2026-07-30T08:00:00Z",
        end: "2026-07-30T09:30:00Z",
      },
      "Europe/London",
    );
    const targetDate = toCalendarDateValue("2026-08-03", "Europe/London");
    const mutation = moveTimedEvent(
      event,
      targetDate,
      10 * 60,
      "Europe/London",
    );

    expect(
      (mutation.end as Date).getTime() - (mutation.start as Date).getTime(),
    ).toBe(90 * 60_000);
    expect(
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/London",
      }).format(mutation.start as Date),
    ).toBe("10:00");
  });

  it("snaps interaction positions to configured increments", () => {
    expect(snapMinutes(547, 15)).toBe(540);
    expect(snapMinutes(548, 15)).toBe(555);
  });

  it("navigates agenda views by their configured range", () => {
    const date = toCalendarDateValue("2026-07-30", "Europe/London");

    expect(navigateDate(date, "agenda", 1, 14).toString()).toBe("2026-08-13");
    expect(navigateDate(date, "agenda", -1, 14).toString()).toBe("2026-07-16");
  });
});
