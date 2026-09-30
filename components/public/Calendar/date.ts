import {
  type CalendarDate,
  fromDate,
  isToday,
  isWeekend,
  parseAbsolute,
  parseDate,
  startOfMonth,
  startOfWeek,
  toCalendarDate,
  toZoned,
} from "@internationalized/date";

import type {
  CalendarDateInput,
  CalendarEvent,
  CalendarEventMutation,
  CalendarView,
} from "./types";

export type NormalizedCalendarEvent<TData = unknown> = {
  source: CalendarEvent<TData>;
  id: string;
  title: string;
  start: Date;
  end: Date;
  startDate: CalendarDate;
  endDate: CalendarDate;
  allDay: boolean;
  color: NonNullable<CalendarEvent<TData>["color"]>;
};

export type CalendarRange = {
  start: CalendarDate;
  end: CalendarDate;
};

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function toCalendarDateValue(
  value: CalendarDateInput,
  timeZone: string,
): CalendarDate {
  if (value instanceof Date) {
    return toCalendarDate(fromDate(value, timeZone));
  }

  if (DATE_ONLY_PATTERN.test(value)) {
    return parseDate(value);
  }

  return toCalendarDate(parseAbsolute(value, timeZone));
}

export function toAbsoluteDate(value: CalendarDateInput, timeZone: string) {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (DATE_ONLY_PATTERN.test(value)) {
    return parseDate(value).toDate(timeZone);
  }

  return parseAbsolute(value, timeZone).toDate();
}

export function normalizeEvent<TData>(
  event: CalendarEvent<TData>,
  timeZone: string,
): NormalizedCalendarEvent<TData> {
  const allDay = event.allDay ?? false;

  if (allDay) {
    const startDate = toCalendarDateValue(event.start, timeZone);
    const endDate = toCalendarDateValue(event.end, timeZone);

    if (endDate.compare(startDate) <= 0) {
      throw new RangeError(
        `Calendar event "${event.id}" must end after it starts.`,
      );
    }

    return {
      source: event,
      id: event.id,
      title: event.title,
      start: startDate.toDate(timeZone),
      end: endDate.toDate(timeZone),
      startDate,
      endDate,
      allDay: true,
      color: event.color ?? "accent",
    };
  }

  const start = toAbsoluteDate(event.start, timeZone);
  const end = toAbsoluteDate(event.end, timeZone);

  if (end.getTime() <= start.getTime()) {
    throw new RangeError(
      `Calendar event "${event.id}" must end after it starts.`,
    );
  }

  return {
    source: event,
    id: event.id,
    title: event.title,
    start,
    end,
    startDate: toCalendarDate(fromDate(start, timeZone)),
    endDate: toCalendarDate(
      fromDate(new Date(end.getTime() - 1), timeZone),
    ).add({
      days: 1,
    }),
    allDay: false,
    color: event.color ?? "accent",
  };
}

export function normalizeEvents<TData>(
  events: CalendarEvent<TData>[],
  timeZone: string,
) {
  const ids = new Set<string>();

  return events.map((event) => {
    if (ids.has(event.id)) {
      throw new RangeError(`Calendar event id "${event.id}" must be unique.`);
    }

    ids.add(event.id);
    return normalizeEvent(event, timeZone);
  });
}

export function eachDay(start: CalendarDate, end: CalendarDate) {
  const days: CalendarDate[] = [];

  for (let day = start; day.compare(end) < 0; day = day.add({ days: 1 })) {
    days.push(day);
  }

  return days;
}

export function getVisibleRange(
  value: CalendarDate,
  view: CalendarView,
  locale: string,
  firstDayOfWeek?: Parameters<typeof startOfWeek>[2],
  agendaDays = 30,
): CalendarRange {
  if (view === "month") {
    const monthStart = startOfMonth(value);
    const start = startOfWeek(monthStart, locale, firstDayOfWeek);
    const monthEnd = monthStart.add({ months: 1 });
    let end = startOfWeek(monthEnd, locale, firstDayOfWeek);

    if (end.compare(monthEnd) < 0 || end.compare(monthEnd) === 0) {
      end = end.add({ weeks: 1 });
    }

    return { start, end };
  }

  if (view === "week") {
    const start = startOfWeek(value, locale, firstDayOfWeek);
    return { start, end: start.add({ weeks: 1 }) };
  }

  if (view === "agenda") {
    return { start: value, end: value.add({ days: agendaDays }) };
  }

  return { start: value, end: value.add({ days: 1 }) };
}

export function eventIntersectsRange<TData>(
  event: NormalizedCalendarEvent<TData>,
  range: CalendarRange,
) {
  return (
    event.endDate.compare(range.start) > 0 &&
    event.startDate.compare(range.end) < 0
  );
}

export function getEventsInRange<TData>(
  events: NormalizedCalendarEvent<TData>[],
  range: CalendarRange,
) {
  return events
    .filter((event) => eventIntersectsRange(event, range))
    .sort((a, b) => {
      if (a.allDay !== b.allDay) {
        return a.allDay ? -1 : 1;
      }

      const startDifference = a.start.getTime() - b.start.getTime();
      if (startDifference !== 0) {
        return startDifference;
      }

      const durationA = a.end.getTime() - a.start.getTime();
      const durationB = b.end.getTime() - b.start.getTime();
      return durationB - durationA || a.title.localeCompare(b.title);
    });
}

export function isDateToday(date: CalendarDate, timeZone: string) {
  return isToday(date, timeZone);
}

export function isWeekendDate(date: CalendarDate, locale: string) {
  return isWeekend(date, locale);
}

export function dateAtMinutes(
  date: CalendarDate,
  minutes: number,
  timeZone: string,
) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return toZoned(date, timeZone).set({
    hour,
    minute,
    second: 0,
    millisecond: 0,
  });
}

export function wallMinutes(date: Date, timeZone: string) {
  const zoned = fromDate(date, timeZone);
  return zoned.hour * 60 + zoned.minute + zoned.second / 60;
}

export function snapMinutes(minutes: number, stepMinutes: number) {
  return Math.round(minutes / stepMinutes) * stepMinutes;
}

export function moveEventToDate<TData>(
  event: NormalizedCalendarEvent<TData>,
  targetDate: CalendarDate,
  timeZone: string,
): CalendarEventMutation<TData> {
  if (event.allDay) {
    const duration = event.endDate.compare(event.startDate);
    return {
      event: event.source,
      start: targetDate.toString(),
      end: targetDate.add({ days: duration }).toString(),
      allDay: true,
    };
  }

  const originalStart = fromDate(event.start, timeZone);
  const duration = event.end.getTime() - event.start.getTime();
  const start = toZoned(targetDate, timeZone).set({
    hour: originalStart.hour,
    minute: originalStart.minute,
    second: originalStart.second,
    millisecond: originalStart.millisecond,
  });

  return {
    event: event.source,
    start: start.toDate(),
    end: new Date(start.toDate().getTime() + duration),
    allDay: false,
  };
}

export function moveTimedEvent<TData>(
  event: NormalizedCalendarEvent<TData>,
  targetDate: CalendarDate,
  targetMinutes: number,
  timeZone: string,
): CalendarEventMutation<TData> {
  const duration = event.end.getTime() - event.start.getTime();
  const start = dateAtMinutes(targetDate, targetMinutes, timeZone).toDate();

  return {
    event: event.source,
    start,
    end: new Date(start.getTime() + duration),
    allDay: false,
  };
}

export function resizeTimedEvent<TData>(
  event: NormalizedCalendarEvent<TData>,
  targetDate: CalendarDate,
  targetMinutes: number,
  timeZone: string,
): CalendarEventMutation<TData> {
  const proposedEnd = dateAtMinutes(
    targetDate,
    targetMinutes,
    timeZone,
  ).toDate();
  const minimumEnd = event.start.getTime() + 5 * 60_000;
  const end = new Date(Math.max(proposedEnd.getTime(), minimumEnd));

  return {
    event: event.source,
    start: event.start,
    end,
    allDay: false,
  };
}

export function navigateDate(
  date: CalendarDate,
  view: CalendarView,
  direction: -1 | 1,
  agendaDays = 30,
) {
  if (view === "month") {
    return date.add({ months: direction });
  }

  if (view === "week") {
    return date.add({ weeks: direction });
  }

  if (view === "agenda") {
    return date.add({ days: agendaDays * direction });
  }

  return date.add({ days: direction });
}

export function formatDateTitle(
  date: CalendarDate,
  view: CalendarView,
  locale: string,
  timeZone: string,
) {
  const value = date.toDate(timeZone);

  if (view === "day") {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone,
    }).format(value);
  }

  if (view === "week") {
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone,
    }).format(value);
  }

  if (view === "agenda") {
    return "Upcoming";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone,
  }).format(value);
}
