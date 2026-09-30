import {
  type CalendarDate,
  fromDate,
  toCalendarDate,
} from "@internationalized/date";

import {
  type CalendarRange,
  eachDay,
  eventIntersectsRange,
  type NormalizedCalendarEvent,
  wallMinutes,
} from "./date";

export type MonthEventSegment<TData = unknown> = {
  event: NormalizedCalendarEvent<TData>;
  weekIndex: number;
  startColumn: number;
  span: number;
  row: number;
  continuesBefore: boolean;
  continuesAfter: boolean;
};

export type MonthLayout<TData = unknown> = {
  segments: MonthEventSegment<TData>[];
  hiddenByDay: Map<string, number>;
};

export type TimedEventLayout<TData = unknown> = {
  event: NormalizedCalendarEvent<TData>;
  date: CalendarDate;
  top: number;
  height: number;
  left: number;
  width: number;
  continuesBefore: boolean;
  continuesAfter: boolean;
};

export type DaySpanEventLayout<TData = unknown> = {
  event: NormalizedCalendarEvent<TData>;
  startColumn: number;
  span: number;
  row: number;
  continuesBefore: boolean;
  continuesAfter: boolean;
};

function rangesOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
) {
  return startA < endB && endA > startB;
}

export function layoutMonthEvents<TData>(
  events: NormalizedCalendarEvent<TData>[],
  range: CalendarRange,
  maxRows = 3,
  isDateVisible: (date: CalendarDate) => boolean = () => true,
): MonthLayout<TData> {
  const days = eachDay(range.start, range.end);
  const weekCount = Math.ceil(days.length / 7);
  const segments: MonthEventSegment<TData>[] = [];
  const hiddenByDay = new Map<string, number>();

  for (let weekIndex = 0; weekIndex < weekCount; weekIndex += 1) {
    const weekStart = range.start.add({ weeks: weekIndex });
    const weekEnd = weekStart.add({ weeks: 1 });
    const weekRange = { start: weekStart, end: weekEnd };
    const visibleWeekDays = eachDay(weekStart, weekEnd).filter(isDateVisible);
    const weekEvents = events
      .filter((event) => eventIntersectsRange(event, weekRange))
      .sort((a, b) => {
        const startA =
          a.startDate.compare(weekStart) < 0 ? weekStart : a.startDate;
        const startB =
          b.startDate.compare(weekStart) < 0 ? weekStart : b.startDate;
        const startDifference = startA.compare(startB);

        if (startDifference !== 0) {
          return startDifference;
        }

        const endA = a.endDate.compare(weekEnd) > 0 ? weekEnd : a.endDate;
        const endB = b.endDate.compare(weekEnd) > 0 ? weekEnd : b.endDate;
        return endB.compare(startB) - endA.compare(startA);
      });
    const occupiedRows: Array<Array<[number, number]>> = [];

    for (const event of weekEvents) {
      const coveredDays = visibleWeekDays.filter(
        (day) =>
          event.startDate.compare(day) <= 0 &&
          event.endDate.compare(day.add({ days: 1 })) >= 0,
      );

      if (coveredDays.length === 0) {
        continue;
      }

      const clippedStart = coveredDays[0];
      const clippedEnd = coveredDays.at(-1)?.add({ days: 1 }) ?? clippedStart;
      const startColumn = visibleWeekDays.findIndex(
        (day) => day.compare(clippedStart) === 0,
      );
      const span = coveredDays.length;
      let row = 0;

      while (
        occupiedRows[row]?.some(([start, end]) =>
          rangesOverlap(startColumn, startColumn + span, start, end),
        )
      ) {
        row += 1;
      }

      occupiedRows[row] ??= [];
      occupiedRows[row].push([startColumn, startColumn + span]);

      if (row >= maxRows) {
        for (const day of coveredDays) {
          const key = day.toString();
          hiddenByDay.set(key, (hiddenByDay.get(key) ?? 0) + 1);
        }
        continue;
      }

      segments.push({
        event,
        weekIndex,
        startColumn,
        span,
        row,
        continuesBefore: event.startDate.compare(clippedStart) < 0,
        continuesAfter: event.endDate.compare(clippedEnd) > 0,
      });
    }
  }

  return { segments, hiddenByDay };
}

type PositionedEvent<TData> = {
  event: NormalizedCalendarEvent<TData>;
  start: number;
  end: number;
  column: number;
  columnCount: number;
  continuesBefore: boolean;
  continuesAfter: boolean;
};

function layoutOverlapGroup<TData>(
  group: Array<Omit<PositionedEvent<TData>, "column" | "columnCount">>,
) {
  const columns: Array<Array<(typeof group)[number]>> = [];
  const positioned: PositionedEvent<TData>[] = [];

  for (const item of group) {
    let column = columns.findIndex(
      (entries) =>
        !entries.some((entry) =>
          rangesOverlap(item.start, item.end, entry.start, entry.end),
        ),
    );

    if (column === -1) {
      column = columns.length;
      columns.push([]);
    }

    columns[column].push(item);
    positioned.push({ ...item, column, columnCount: 0 });
  }

  const columnCount = columns.length;
  return positioned.map((item) => ({ ...item, columnCount }));
}

export function layoutTimedEventsForDay<TData>(
  events: NormalizedCalendarEvent<TData>[],
  date: CalendarDate,
  timeZone: string,
  dayStartHour: number,
  dayEndHour: number,
): TimedEventLayout<TData>[] {
  const dayStartMinutes = dayStartHour * 60;
  const dayEndMinutes = dayEndHour * 60;
  const nextDay = date.add({ days: 1 });
  const candidates = events
    .filter(
      (event) =>
        !event.allDay &&
        event.endDate.compare(date) > 0 &&
        event.startDate.compare(nextDay) < 0,
    )
    .map((event) => {
      const startsToday = event.startDate.compare(date) === 0;
      const endsToday = event.endDate.compare(nextDay) <= 0;
      const start = startsToday ? wallMinutes(event.start, timeZone) : 0;
      const zonedEnd = fromDate(event.end, timeZone);
      const endDate = toCalendarDate(zonedEnd);
      const end =
        endsToday && endDate.compare(nextDay) === 0 && zonedEnd.hour === 0
          ? 24 * 60
          : endsToday
            ? wallMinutes(event.end, timeZone)
            : 24 * 60;

      return {
        event,
        start: Math.max(start, dayStartMinutes),
        end: Math.min(Math.max(end, start + 5), dayEndMinutes),
        continuesBefore: !startsToday || start < dayStartMinutes,
        continuesAfter: !endsToday || end > dayEndMinutes,
      };
    })
    .filter(
      (event) => event.start < dayEndMinutes && event.end > dayStartMinutes,
    )
    .sort(
      (a, b) =>
        a.start - b.start ||
        b.end - b.start - (a.end - a.start) ||
        a.event.title.localeCompare(b.event.title),
    );

  const groups: Array<typeof candidates> = [];
  let currentGroup: typeof candidates = [];
  let currentGroupEnd = -1;

  for (const candidate of candidates) {
    if (currentGroup.length === 0 || candidate.start < currentGroupEnd) {
      currentGroup.push(candidate);
      currentGroupEnd = Math.max(currentGroupEnd, candidate.end);
    } else {
      groups.push(currentGroup);
      currentGroup = [candidate];
      currentGroupEnd = candidate.end;
    }
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  const visibleMinutes = dayEndMinutes - dayStartMinutes;

  return groups.flatMap((group) =>
    layoutOverlapGroup(group).map((item) => ({
      event: item.event,
      date,
      top: ((item.start - dayStartMinutes) / visibleMinutes) * 100,
      height: Math.max(1.5, ((item.end - item.start) / visibleMinutes) * 100),
      left: (item.column / item.columnCount) * 100,
      width: 100 / item.columnCount,
      continuesBefore: item.continuesBefore,
      continuesAfter: item.continuesAfter,
    })),
  );
}

export function getAllDayEvents<TData>(
  events: NormalizedCalendarEvent<TData>[],
  range: CalendarRange,
) {
  return events.filter(
    (event) => event.allDay && eventIntersectsRange(event, range),
  );
}

export function layoutDaySpanEvents<TData>(
  events: NormalizedCalendarEvent<TData>[],
  days: CalendarDate[],
  maxRows = 2,
) {
  const visible: DaySpanEventLayout<TData>[] = [];
  const hiddenByDay = new Map<string, number>();
  const occupiedRows: Array<Array<[number, number]>> = [];

  const sortedEvents = [...events].sort((a, b) => {
    const startA = days.findIndex(
      (day) =>
        a.startDate.compare(day) <= 0 &&
        a.endDate.compare(day.add({ days: 1 })) >= 0,
    );
    const startB = days.findIndex(
      (day) =>
        b.startDate.compare(day) <= 0 &&
        b.endDate.compare(day.add({ days: 1 })) >= 0,
    );
    const spanA = days.filter(
      (day) =>
        a.startDate.compare(day) <= 0 &&
        a.endDate.compare(day.add({ days: 1 })) >= 0,
    ).length;
    const spanB = days.filter(
      (day) =>
        b.startDate.compare(day) <= 0 &&
        b.endDate.compare(day.add({ days: 1 })) >= 0,
    ).length;
    return startA - startB || spanB - spanA || a.title.localeCompare(b.title);
  });

  for (const event of sortedEvents) {
    const coveredIndexes = days.flatMap((day, index) =>
      event.startDate.compare(day) <= 0 &&
      event.endDate.compare(day.add({ days: 1 })) >= 0
        ? [index]
        : [],
    );

    if (coveredIndexes.length === 0) {
      continue;
    }

    const startColumn = coveredIndexes[0];
    const span = coveredIndexes.length;
    let row = 0;

    while (
      occupiedRows[row]?.some(([start, end]) =>
        rangesOverlap(startColumn, startColumn + span, start, end),
      )
    ) {
      row += 1;
    }

    occupiedRows[row] ??= [];
    occupiedRows[row].push([startColumn, startColumn + span]);

    if (row >= maxRows) {
      for (const index of coveredIndexes) {
        const key = days[index].toString();
        hiddenByDay.set(key, (hiddenByDay.get(key) ?? 0) + 1);
      }
      continue;
    }

    visible.push({
      event,
      startColumn,
      span,
      row,
      continuesBefore: event.startDate.compare(days[startColumn]) < 0,
      continuesAfter:
        event.endDate.compare(days[startColumn + span - 1].add({ days: 1 })) >
        0,
    });
  }

  return { segments: visible, hiddenByDay };
}
