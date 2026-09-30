// biome-ignore-all lint/a11y/useFocusableInteractive: WAI-ARIA layout-grid rows and cells delegate focus to their child buttons.
// biome-ignore-all lint/a11y/useSemanticElements: The interactive calendar grid is not a data table.
"use client";

import { type CalendarDate, startOfMonth } from "@internationalized/date";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/helpers/classname-helper";

import { createCalendarChangeDetails, useCalendarContext } from "./context";
import type { NormalizedCalendarEvent } from "./date";
import {
  eachDay,
  getEventsInRange,
  getVisibleRange,
  isDateToday,
  isWeekendDate,
  moveEventToDate,
} from "./date";
import { CalendarEventButton, CalendarEventOverflow } from "./Event";
import { layoutMonthEvents } from "./layout";

type MonthGesture<TData> =
  | {
      type: "create";
      pointerId: number;
      start: CalendarDate;
      current: CalendarDate;
      originX: number;
      originY: number;
      moved: boolean;
    }
  | {
      type: "move";
      pointerId: number;
      event: NormalizedCalendarEvent<TData>;
      originX: number;
      originY: number;
      moved: boolean;
      element: HTMLElement;
    }
  | null;

function dateFromPoint(clientX: number, clientY: number) {
  const element = document
    .elementsFromPoint(clientX, clientY)
    .map((candidate) => candidate.closest("[data-calendar-date]"))
    .find(Boolean);
  const value = element?.getAttribute("data-calendar-date");
  return value ? value : null;
}

export function CalendarMonth<TData = unknown>({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const context = useCalendarContext<TData>();
  const [focusedDate, setFocusedDate] = useState(context.date);
  const [createPreview, setCreatePreview] = useState<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>(null);
  const gestureRef = useRef<MonthGesture<TData>>(null);
  const dayButtonRefs = useRef(new Map<string, HTMLButtonElement>());
  const suppressClickEventIdRef = useRef<string | null>(null);
  const range = useMemo(
    () =>
      getVisibleRange(
        context.date,
        "month",
        context.locale,
        context.firstDayOfWeek,
      ),
    [context.date, context.firstDayOfWeek, context.locale],
  );
  const allDays = useMemo(
    () => eachDay(range.start, range.end),
    [range.end, range.start],
  );
  const visibleDays = useMemo(
    () =>
      context.showWeekends
        ? allDays
        : allDays.filter((day) => !isWeekendDate(day, context.locale)),
    [allDays, context.locale, context.showWeekends],
  );
  const events = useMemo(
    () => getEventsInRange(context.normalizedEvents, range),
    [context.normalizedEvents, range],
  );
  const maxRows = context.monthEventRows;
  const layout = useMemo(
    () =>
      layoutMonthEvents(
        events,
        range,
        maxRows,
        context.showWeekends
          ? undefined
          : (day) => !isWeekendDate(day, context.locale),
      ),
    [context.locale, context.showWeekends, events, maxRows, range],
  );
  const columnCount = context.showWeekends ? 7 : 5;
  const weekCount = Math.ceil(allDays.length / 7);
  const monthStart = startOfMonth(context.date);

  useEffect(() => {
    setFocusedDate(context.date);
  }, [context.date]);

  function focusDate(date: CalendarDate) {
    setFocusedDate(date);
    window.requestAnimationFrame(() => {
      dayButtonRefs.current.get(date.toString())?.focus();
    });
  }

  function handleGridKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    date: CalendarDate,
  ) {
    let nextDate: CalendarDate | null = null;

    if (event.key === "ArrowLeft") {
      nextDate = date.add({ days: -1 });
    } else if (event.key === "ArrowRight") {
      nextDate = date.add({ days: 1 });
    } else if (event.key === "ArrowUp") {
      nextDate = date.add({ days: -7 });
    } else if (event.key === "ArrowDown") {
      nextDate = date.add({ days: 7 });
    } else if (event.key === "Home") {
      nextDate = date.add({ days: -(date.compare(range.start) % 7) });
    } else if (event.key === "End") {
      nextDate = date.add({ days: 6 - (date.compare(range.start) % 7) });
    } else if (event.key === "PageUp") {
      nextDate = date.add({ months: -1 });
    } else if (event.key === "PageDown") {
      nextDate = date.add({ months: 1 });
    } else if (
      (event.key === "Enter" || event.key === " ") &&
      context.selectable
    ) {
      event.preventDefault();
      const details = createCalendarChangeDetails(
        "keyboard-create",
        event.nativeEvent,
      );
      context.onEventCreate?.(
        {
          start: date.toString(),
          end: date.add({ days: 1 }).toString(),
          allDay: true,
        },
        details,
      );
      if (!details.isCanceled) {
        context.announce(`Created an all-day event on ${date.toString()}.`);
      }
      return;
    }

    if (!nextDate) {
      return;
    }

    event.preventDefault();

    if (nextDate.compare(range.start) < 0 || nextDate.compare(range.end) >= 0) {
      context.setDate(nextDate, "date-press", event.nativeEvent);
    }

    focusDate(nextDate);
  }

  function startCreate(
    event: React.PointerEvent<HTMLButtonElement>,
    date: CalendarDate,
  ) {
    if (
      !context.selectable ||
      event.button !== 0 ||
      event.currentTarget.closest("[data-calendar-event-id]")
    ) {
      return;
    }

    gestureRef.current = {
      type: "create",
      pointerId: event.pointerId,
      start: date,
      current: date,
      originX: event.clientX,
      originY: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveCreate(event: React.PointerEvent<HTMLButtonElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.type !== "create") {
      return;
    }

    const moved =
      gesture.moved ||
      Math.hypot(
        event.clientX - gesture.originX,
        event.clientY - gesture.originY,
      ) > 5;
    const dateValue = dateFromPoint(event.clientX, event.clientY);
    const nextDate = visibleDays.find((day) => day.toString() === dateValue);

    if (!nextDate) {
      return;
    }

    gesture.moved = moved;
    gesture.current = nextDate;

    if (moved) {
      const start =
        gesture.start.compare(nextDate) <= 0 ? gesture.start : nextDate;
      const end =
        gesture.start.compare(nextDate) <= 0
          ? nextDate.add({ days: 1 })
          : gesture.start.add({ days: 1 });
      setCreatePreview({ start, end });
    }
  }

  function finishCreate(event: React.PointerEvent<HTMLButtonElement>) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    setCreatePreview(null);

    if (!gesture || gesture.type !== "create" || !gesture.moved) {
      return;
    }

    event.preventDefault();
    const start =
      gesture.start.compare(gesture.current) <= 0
        ? gesture.start
        : gesture.current;
    const end =
      gesture.start.compare(gesture.current) <= 0
        ? gesture.current.add({ days: 1 })
        : gesture.start.add({ days: 1 });
    const details = createCalendarChangeDetails(
      "pointer-create",
      event.nativeEvent,
    );
    context.onEventCreate?.(
      {
        start: start.toString(),
        end: end.toString(),
        allDay: true,
      },
      details,
    );

    if (!details.isCanceled) {
      context.announce(
        `Created an all-day event from ${start.toString()} to ${end
          .add({ days: -1 })
          .toString()}.`,
      );
    }
  }

  function cancelGesture() {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    setCreatePreview(null);
    context.setInteraction(null);

    if (gesture?.type === "move") {
      gesture.element.style.pointerEvents = "";
      gesture.element.style.transform = "";
    }
  }

  function startEventMove(
    eventObject: React.PointerEvent<HTMLElement>,
    calendarEvent: NormalizedCalendarEvent<TData>,
  ) {
    if (
      !context.editable ||
      calendarEvent.source.editable === false ||
      eventObject.button !== 0
    ) {
      return;
    }

    eventObject.stopPropagation();
    eventObject.currentTarget.setPointerCapture(eventObject.pointerId);
    gestureRef.current = {
      type: "move",
      pointerId: eventObject.pointerId,
      event: calendarEvent,
      originX: eventObject.clientX,
      originY: eventObject.clientY,
      moved: false,
      element: eventObject.currentTarget,
    };
    context.setInteraction({ type: "move", event: calendarEvent });
  }

  function moveEvent(eventObject: React.PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.type !== "move") {
      return;
    }

    const deltaX = eventObject.clientX - gesture.originX;
    const deltaY = eventObject.clientY - gesture.originY;
    gesture.moved = gesture.moved || Math.hypot(deltaX, deltaY) > 5;

    if (gesture.moved) {
      gesture.element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      gesture.element.style.pointerEvents = "none";
    }
  }

  function finishEventMove(eventObject: React.PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    context.setInteraction(null);

    if (!gesture || gesture.type !== "move") {
      return;
    }

    const dateValue = dateFromPoint(eventObject.clientX, eventObject.clientY);
    gesture.element.style.transform = "";
    gesture.element.style.pointerEvents = "";

    if (!gesture.moved || !dateValue) {
      return;
    }

    eventObject.preventDefault();
    suppressClickEventIdRef.current = gesture.event.id;
    const targetDate = visibleDays.find((day) => day.toString() === dateValue);
    if (!targetDate) {
      return;
    }

    const details = createCalendarChangeDetails(
      "pointer-move",
      eventObject.nativeEvent,
    );
    context.onEventMove?.(
      moveEventToDate(gesture.event, targetDate, context.timeZone),
      details,
    );

    if (!details.isCanceled) {
      context.announce(
        `Moved ${gesture.event.title} to ${targetDate.toString()}.`,
      );
    }
  }

  const weekdayDates = visibleDays.slice(0, columnCount);

  return (
    <div
      aria-label={new Intl.DateTimeFormat(context.locale, {
        month: "long",
        year: "numeric",
        timeZone: context.timeZone,
      }).format(context.date.toDate(context.timeZone))}
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      role="grid"
      {...props}
    >
      <div
        className="grid border-grayscale-3 border-b bg-grayscale-1/50 dark:border-grayscale-4 dark:bg-grayscale-2/50"
        role="row"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {weekdayDates.map((date) => (
          <div
            className="px-2 py-2 text-center text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-grayscale-11"
            key={date.toString()}
            role="columnheader"
          >
            {new Intl.DateTimeFormat(context.locale, {
              weekday: "short",
              timeZone: context.timeZone,
            }).format(date.toDate(context.timeZone))}
          </div>
        ))}
      </div>
      <div
        className="grid min-h-0 flex-1 overflow-y-auto"
        role="rowgroup"
        style={{
          gridTemplateRows: `repeat(${weekCount}, minmax(4rem, 1fr))`,
        }}
      >
        {Array.from({ length: weekCount }, (_, weekIndex) => {
          const weekStart = range.start.add({ weeks: weekIndex });
          const weekDays = eachDay(
            weekStart,
            weekStart.add({ weeks: 1 }),
          ).filter(
            (day) =>
              context.showWeekends || !isWeekendDate(day, context.locale),
          );
          const weekSegments = layout.segments.filter(
            (segment) => segment.weekIndex === weekIndex,
          );

          return (
            <div
              className={cn(
                "relative grid min-h-16 border-grayscale-3 border-b last:border-b-0 dark:border-grayscale-4",
              )}
              key={weekStart.toString()}
              role="row"
              style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              }}
            >
              {weekDays.map((date, dayIndex) => {
                const outside = date.month !== monthStart.month;
                const today = isDateToday(date, context.timeZone);
                const previewed =
                  createPreview !== null &&
                  date.compare(createPreview.start) >= 0 &&
                  date.compare(createPreview.end) < 0;
                const dayEvents = events.filter(
                  (event) =>
                    event.startDate.compare(date) <= 0 &&
                    event.endDate.compare(date.add({ days: 1 })) >= 0,
                );
                const hiddenCount =
                  layout.hiddenByDay.get(date.toString()) ?? 0;
                const visibleIds = new Set(
                  weekSegments
                    .filter(
                      (segment) =>
                        segment.startColumn <= dayIndex &&
                        segment.startColumn + segment.span > dayIndex,
                    )
                    .map((segment) => segment.event.id),
                );
                const hiddenEvents = dayEvents.filter(
                  (event) => !visibleIds.has(event.id),
                );

                return (
                  <div
                    className={cn(
                      "relative min-w-0 border-grayscale-3 border-e last:border-e-0 dark:border-grayscale-4",
                      outside && "bg-grayscale-1/55 dark:bg-grayscale-2/35",
                      previewed && "bg-accent-2 dark:bg-accent-3/50",
                    )}
                    data-calendar-date={date.toString()}
                    key={date.toString()}
                    role="gridcell"
                  >
                    <button
                      aria-current={today ? "date" : undefined}
                      aria-label={new Intl.DateTimeFormat(context.locale, {
                        dateStyle: "full",
                        timeZone: context.timeZone,
                      }).format(date.toDate(context.timeZone))}
                      className={cn(
                        "absolute inset-0 z-0 cursor-default touch-none p-1.5 text-left outline-none focus-visible:z-20 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-8",
                      )}
                      data-calendar-date={date.toString()}
                      onClick={(event) =>
                        context.setDate(date, "date-press", event.nativeEvent)
                      }
                      onKeyDown={(event) => handleGridKeyDown(event, date)}
                      onPointerDown={(event) => startCreate(event, date)}
                      onPointerCancel={cancelGesture}
                      onPointerMove={moveCreate}
                      onPointerUp={finishCreate}
                      ref={(node) => {
                        if (node) {
                          dayButtonRefs.current.set(date.toString(), node);
                        } else {
                          dayButtonRefs.current.delete(date.toString());
                        }
                      }}
                      tabIndex={focusedDate.compare(date) === 0 ? 0 : -1}
                      type="button"
                    >
                      <span
                        className={cn(
                          "inline-flex size-6 items-center justify-center rounded-full text-xs font-medium text-grayscale-11",
                          outside && "text-grayscale-11",
                          today &&
                            "bg-accent-11 font-semibold text-grayscale-1 shadow-sm",
                        )}
                      >
                        {date.day}
                      </span>
                    </button>
                    {hiddenCount > 0 && (
                      <CalendarEventOverflow
                        date={date}
                        events={hiddenEvents}
                      />
                    )}
                  </div>
                );
              })}

              <div className="pointer-events-none absolute inset-x-0 top-8 bottom-0 z-10">
                {weekSegments.map((segment) => {
                  const dragging =
                    context.interaction?.type === "move" &&
                    context.interaction.event.id === segment.event.id;

                  return (
                    <div
                      className="pointer-events-auto absolute h-5 px-0.5"
                      key={`${segment.event.id}-${weekStart.toString()}`}
                      style={{
                        insetInlineStart: `${
                          (segment.startColumn / columnCount) * 100
                        }%`,
                        top: `${segment.row * 22}px`,
                        width: `${(segment.span / columnCount) * 100}%`,
                      }}
                    >
                      <CalendarEventButton
                        compact
                        continuesAfter={segment.continuesAfter}
                        continuesBefore={segment.continuesBefore}
                        dragging={dragging}
                        event={segment.event}
                        onClick={(event) => {
                          if (
                            suppressClickEventIdRef.current === segment.event.id
                          ) {
                            event.preventDefault();
                            suppressClickEventIdRef.current = null;
                          }
                        }}
                        onPointerDown={(event) =>
                          startEventMove(event, segment.event)
                        }
                        onPointerCancel={cancelGesture}
                        onPointerMove={moveEvent}
                        onPointerUp={finishEventMove}
                        showTime={!segment.event.allDay && segment.span === 1}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
