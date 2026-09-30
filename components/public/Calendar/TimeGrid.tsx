// biome-ignore-all lint/a11y/useFocusableInteractive: WAI-ARIA grid rows delegate focus to interactive gridcell buttons.
// biome-ignore-all lint/a11y/useSemanticElements: The time-slot interaction grid is not a data table.
"use client";

import type { CalendarDate } from "@internationalized/date";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/helpers/classname-helper";

import { createCalendarChangeDetails, useCalendarContext } from "./context";
import type { NormalizedCalendarEvent } from "./date";
import {
  dateAtMinutes,
  getEventsInRange,
  isDateToday,
  moveEventToDate,
  moveTimedEvent,
  resizeTimedEvent,
  snapMinutes,
  wallMinutes,
} from "./date";
import { CalendarEventButton, CalendarEventOverflow } from "./Event";
import {
  getAllDayEvents,
  layoutDaySpanEvents,
  layoutTimedEventsForDay,
} from "./layout";

type TimeGesture<TData> =
  | {
      type: "create";
      pointerId: number;
      startDate: CalendarDate;
      startMinutes: number;
      currentDate: CalendarDate;
      currentMinutes: number;
      originX: number;
      originY: number;
      moved: boolean;
    }
  | {
      type: "move" | "resize";
      pointerId: number;
      event: NormalizedCalendarEvent<TData>;
      element: HTMLElement;
      originX: number;
      originY: number;
      originalHeight: number;
      offsetMinutes: number;
      moved: boolean;
    }
  | {
      type: "move-all-day";
      pointerId: number;
      event: NormalizedCalendarEvent<TData>;
      element: HTMLElement;
      originX: number;
      originY: number;
      moved: boolean;
    }
  | null;

type TimePosition = {
  date: CalendarDate;
  minutes: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function eventElementsFromPoint(clientX: number, clientY: number) {
  return document.elementsFromPoint(clientX, clientY);
}

export function CalendarTimeGrid<TData = unknown>({
  className,
  days,
  ...props
}: React.ComponentProps<"div"> & {
  days: CalendarDate[];
}) {
  const context = useCalendarContext<TData>();
  const [now, setNow] = useState<Date | null>(null);
  const [focusedSlot, setFocusedSlot] = useState(() => ({
    date: context.date.toString(),
    minutes: context.dayStartHour * 60,
  }));
  const [createPreview, setCreatePreview] = useState<{
    date: CalendarDate;
    startMinutes: number;
    endMinutes: number;
  } | null>(null);
  const slotRefs = useRef(new Map<string, HTMLButtonElement>());
  const gridRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<TimeGesture<TData>>(null);
  const suppressClickEventIdRef = useRef<string | null>(null);
  const dayStartMinutes = context.dayStartHour * 60;
  const dayEndMinutes = context.dayEndHour * 60;
  const visibleMinutes = dayEndMinutes - dayStartMinutes;
  const hourHeight = context.density === "compact" ? 52 : 64;
  const gridHeight = (visibleMinutes / 60) * hourHeight;
  const slotCount = Math.ceil(visibleMinutes / context.stepMinutes);
  const range = useMemo(
    () => ({
      start: days[0],
      end: days.at(-1)?.add({ days: 1 }) ?? days[0].add({ days: 1 }),
    }),
    [days],
  );
  const events = useMemo(
    () => getEventsInRange(context.normalizedEvents, range),
    [context.normalizedEvents, range],
  );
  const allDayEvents = useMemo(
    () => getAllDayEvents(events, range),
    [events, range],
  );
  const allDayLayout = useMemo(
    () => layoutDaySpanEvents(allDayEvents, days, 2),
    [allDayEvents, days],
  );
  const hiddenAllDayEvents = useMemo(
    () =>
      days.map((date, dayIndex) => {
        if (!allDayLayout.hiddenByDay.has(date.toString())) {
          return [];
        }

        const visibleIds = new Set(
          allDayLayout.segments
            .filter(
              (segment) =>
                segment.startColumn <= dayIndex &&
                segment.startColumn + segment.span > dayIndex,
            )
            .map((segment) => segment.event.id),
        );

        return allDayEvents.filter(
          (event) =>
            event.startDate.compare(date) <= 0 &&
            event.endDate.compare(date.add({ days: 1 })) >= 0 &&
            !visibleIds.has(event.id),
        );
      }),
    [allDayEvents, allDayLayout, days],
  );
  const timedLayouts = useMemo(
    () =>
      days.map((date) =>
        layoutTimedEventsForDay(
          events,
          date,
          context.timeZone,
          context.dayStartHour,
          context.dayEndHour,
        ),
      ),
    [context.dayEndHour, context.dayStartHour, context.timeZone, days, events],
  );

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setFocusedSlot({
      date: context.date.toString(),
      minutes: dayStartMinutes,
    });
  }, [context.date, dayStartMinutes]);

  function getPositionFromPoint(
    clientX: number,
    clientY: number,
  ): TimePosition | null {
    const grid = gridRef.current;
    if (!grid) {
      return null;
    }

    const dateValue = eventElementsFromPoint(clientX, clientY)
      .map((element) => element.closest("[data-calendar-slot-date]"))
      .find(Boolean)
      ?.getAttribute("data-calendar-slot-date");
    const date = days.find((day) => day.toString() === dateValue);

    if (!date) {
      return null;
    }

    const rect = grid.getBoundingClientRect();
    const rawMinutes =
      dayStartMinutes + ((clientY - rect.top) / rect.height) * visibleMinutes;

    return {
      date,
      minutes: clamp(
        snapMinutes(rawMinutes, context.stepMinutes),
        dayStartMinutes,
        dayEndMinutes,
      ),
    };
  }

  function focusSlot(date: CalendarDate, minutes: number) {
    const normalizedMinutes = clamp(
      snapMinutes(minutes, context.stepMinutes),
      dayStartMinutes,
      dayEndMinutes - context.stepMinutes,
    );
    const key = `${date.toString()}-${normalizedMinutes}`;
    setFocusedSlot({ date: date.toString(), minutes: normalizedMinutes });
    window.requestAnimationFrame(() => slotRefs.current.get(key)?.focus());
  }

  function createEvent(
    startDate: CalendarDate,
    startMinutes: number,
    endDate: CalendarDate,
    endMinutes: number,
    reason: "keyboard-create" | "pointer-create",
    sourceEvent: Event,
  ) {
    let start = dateAtMinutes(
      startDate,
      startMinutes,
      context.timeZone,
    ).toDate();
    let end = dateAtMinutes(endDate, endMinutes, context.timeZone).toDate();

    if (end.getTime() < start.getTime()) {
      [start, end] = [end, start];
    }

    if (end.getTime() === start.getTime()) {
      end = new Date(start.getTime() + context.stepMinutes * 60_000);
    }

    const details = createCalendarChangeDetails(reason, sourceEvent);
    context.onEventCreate?.(
      {
        start,
        end,
        allDay: false,
      },
      details,
    );

    if (!details.isCanceled) {
      context.announce(
        `Created an event at ${new Intl.DateTimeFormat(context.locale, {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: context.timeZone,
        }).format(start)}.`,
      );
    }
  }

  function handleSlotKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    date: CalendarDate,
    minutes: number,
  ) {
    const dayIndex = days.findIndex((day) => day.compare(date) === 0);
    let nextDate = date;
    let nextMinutes = minutes;

    if (event.key === "ArrowLeft") {
      nextDate = days[Math.max(0, dayIndex - 1)] ?? date;
    } else if (event.key === "ArrowRight") {
      nextDate = days[Math.min(days.length - 1, dayIndex + 1)] ?? date;
    } else if (event.key === "ArrowUp") {
      nextMinutes -= context.stepMinutes;
    } else if (event.key === "ArrowDown") {
      nextMinutes += context.stepMinutes;
    } else if (event.key === "Home") {
      nextMinutes = dayStartMinutes;
    } else if (event.key === "End") {
      nextMinutes = dayEndMinutes - context.stepMinutes;
    } else if (
      (event.key === "Enter" || event.key === " ") &&
      context.selectable
    ) {
      event.preventDefault();
      createEvent(
        date,
        minutes,
        date,
        minutes + context.stepMinutes,
        "keyboard-create",
        event.nativeEvent,
      );
      return;
    } else {
      return;
    }

    event.preventDefault();
    focusSlot(nextDate, nextMinutes);
  }

  function startCreate(
    event: React.PointerEvent<HTMLButtonElement>,
    date: CalendarDate,
    minutes: number,
  ) {
    if (!context.selectable || event.button !== 0) {
      return;
    }

    gestureRef.current = {
      type: "create",
      pointerId: event.pointerId,
      startDate: date,
      startMinutes: minutes,
      currentDate: date,
      currentMinutes: minutes + context.stepMinutes,
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

    const position = getPositionFromPoint(event.clientX, event.clientY);
    if (!position) {
      return;
    }

    gesture.moved =
      gesture.moved ||
      Math.hypot(
        event.clientX - gesture.originX,
        event.clientY - gesture.originY,
      ) > 5;
    gesture.currentDate = position.date;
    gesture.currentMinutes = position.minutes;

    if (gesture.moved && position.date.compare(gesture.startDate) === 0) {
      setCreatePreview({
        date: position.date,
        startMinutes: Math.min(gesture.startMinutes, position.minutes),
        endMinutes: Math.max(
          gesture.startMinutes + context.stepMinutes,
          position.minutes,
        ),
      });
    } else {
      setCreatePreview(null);
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
    createEvent(
      gesture.startDate,
      gesture.startMinutes,
      gesture.currentDate,
      gesture.currentMinutes,
      "pointer-create",
      event.nativeEvent,
    );
  }

  function cancelGesture() {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    setCreatePreview(null);
    context.setInteraction(null);

    if (
      gesture?.type === "move" ||
      gesture?.type === "resize" ||
      gesture?.type === "move-all-day"
    ) {
      gesture.element.style.height = "";
      gesture.element.style.pointerEvents = "";
      gesture.element.style.transform = "";
    }
  }

  function startEventGesture(
    eventObject: React.PointerEvent<HTMLElement>,
    calendarEvent: NormalizedCalendarEvent<TData>,
    type: "move" | "resize",
  ) {
    if (
      !context.editable ||
      calendarEvent.source.editable === false ||
      eventObject.button !== 0
    ) {
      return;
    }

    const element =
      (eventObject.currentTarget.closest(
        "[data-calendar-event-layout]",
      ) as HTMLElement | null) ?? eventObject.currentTarget;
    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    const gridRect = grid.getBoundingClientRect();
    const eventRect = element.getBoundingClientRect();
    const offsetMinutes =
      ((eventObject.clientY - eventRect.top) / gridRect.height) *
      visibleMinutes;

    eventObject.stopPropagation();
    eventObject.currentTarget.setPointerCapture(eventObject.pointerId);
    gestureRef.current = {
      type,
      pointerId: eventObject.pointerId,
      event: calendarEvent,
      element,
      originX: eventObject.clientX,
      originY: eventObject.clientY,
      originalHeight: eventRect.height,
      offsetMinutes: type === "move" ? offsetMinutes : 0,
      moved: false,
    };
    context.setInteraction({ type, event: calendarEvent });
  }

  function moveEventGesture(eventObject: React.PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    if (!gesture || (gesture.type !== "move" && gesture.type !== "resize")) {
      return;
    }

    const deltaX = eventObject.clientX - gesture.originX;
    const deltaY = eventObject.clientY - gesture.originY;
    gesture.moved = gesture.moved || Math.hypot(deltaX, deltaY) > 4;

    if (gesture.moved) {
      gesture.element.style.pointerEvents = "none";
      gesture.element.style.transform =
        gesture.type === "move"
          ? `translate3d(${deltaX}px, ${deltaY}px, 0)`
          : `translate3d(0, 0, 0)`;
      if (gesture.type === "resize") {
        gesture.element.style.height = `${Math.max(
          12,
          gesture.originalHeight + deltaY,
        )}px`;
      }
    }
  }

  function finishEventGesture(eventObject: React.PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    context.setInteraction(null);

    if (!gesture || (gesture.type !== "move" && gesture.type !== "resize")) {
      return;
    }

    const position = getPositionFromPoint(
      eventObject.clientX,
      eventObject.clientY,
    );
    gesture.element.style.pointerEvents = "";
    gesture.element.style.transform = "";
    gesture.element.style.height = "";

    if (!gesture.moved || !position) {
      return;
    }

    eventObject.preventDefault();
    suppressClickEventIdRef.current = gesture.event.id;
    const details = createCalendarChangeDetails(
      gesture.type === "move" ? "pointer-move" : "pointer-resize",
      eventObject.nativeEvent,
    );

    if (gesture.type === "move") {
      const targetMinutes = clamp(
        snapMinutes(
          position.minutes - gesture.offsetMinutes,
          context.stepMinutes,
        ),
        dayStartMinutes,
        dayEndMinutes - context.stepMinutes,
      );
      context.onEventMove?.(
        moveTimedEvent(
          gesture.event,
          position.date,
          targetMinutes,
          context.timeZone,
        ),
        details,
      );
    } else {
      context.onEventResize?.(
        resizeTimedEvent(
          gesture.event,
          position.date,
          position.minutes,
          context.timeZone,
        ),
        details,
      );
    }

    if (!details.isCanceled) {
      context.announce(
        `${gesture.type === "move" ? "Moved" : "Resized"} ${
          gesture.event.title
        }.`,
      );
    }
  }

  function startAllDayMove(
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

    const element =
      (eventObject.currentTarget.closest(
        "[data-calendar-event-layout]",
      ) as HTMLElement | null) ?? eventObject.currentTarget;
    eventObject.stopPropagation();
    eventObject.currentTarget.setPointerCapture(eventObject.pointerId);
    gestureRef.current = {
      type: "move-all-day",
      pointerId: eventObject.pointerId,
      event: calendarEvent,
      element,
      originX: eventObject.clientX,
      originY: eventObject.clientY,
      moved: false,
    };
    context.setInteraction({ type: "move", event: calendarEvent });
  }

  function moveAllDay(eventObject: React.PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.type !== "move-all-day") {
      return;
    }

    const deltaX = eventObject.clientX - gesture.originX;
    const deltaY = eventObject.clientY - gesture.originY;
    gesture.moved = gesture.moved || Math.hypot(deltaX, deltaY) > 5;

    if (gesture.moved) {
      gesture.element.style.pointerEvents = "none";
      gesture.element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    }
  }

  function finishAllDayMove(eventObject: React.PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    context.setInteraction(null);

    if (!gesture || gesture.type !== "move-all-day") {
      return;
    }

    const targetDateValue = eventElementsFromPoint(
      eventObject.clientX,
      eventObject.clientY,
    )
      .map((element) => element.closest("[data-calendar-all-day-date]"))
      .find(Boolean)
      ?.getAttribute("data-calendar-all-day-date");
    gesture.element.style.pointerEvents = "";
    gesture.element.style.transform = "";

    if (!gesture.moved || !targetDateValue) {
      return;
    }

    eventObject.preventDefault();
    suppressClickEventIdRef.current = gesture.event.id;
    const targetDate = days.find((day) => day.toString() === targetDateValue);
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

  const columnTemplate = `3.5rem repeat(${days.length}, minmax(7.5rem, 1fr))`;

  return (
    <div className={cn("min-h-0 flex-1 overflow-auto", className)} {...props}>
      <div
        className="relative min-w-[42rem]"
        style={{ minWidth: days.length === 1 ? "22rem" : undefined }}
      >
        <div
          className="sticky top-0 z-30 grid h-13 border-grayscale-3 border-b bg-grayscale-0/95 backdrop-blur-md dark:border-grayscale-4 dark:bg-grayscale-1/95"
          style={{ gridTemplateColumns: columnTemplate }}
        >
          <div className="sticky start-0 z-20 flex items-end justify-end border-grayscale-3 border-e bg-inherit p-1.5 text-[0.5625rem] font-medium uppercase tracking-wide text-grayscale-11 dark:border-grayscale-4">
            {context.timeZone.split("/").at(-1)?.replaceAll("_", " ")}
          </div>
          {days.map((date) => {
            const today = isDateToday(date, context.timeZone);
            return (
              <button
                className="group flex min-w-0 cursor-pointer flex-col items-center justify-center border-grayscale-3 border-e px-2 outline-none last:border-e-0 hover:bg-grayscale-2 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-8 dark:border-grayscale-4 dark:hover:bg-grayscale-2"
                key={date.toString()}
                onClick={(event) =>
                  context.setDate(date, "date-press", event.nativeEvent)
                }
                type="button"
              >
                <span className="text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-grayscale-11">
                  {new Intl.DateTimeFormat(context.locale, {
                    weekday: "short",
                    timeZone: context.timeZone,
                  }).format(date.toDate(context.timeZone))}
                </span>
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-6 items-center justify-center rounded-full text-sm font-semibold text-grayscale-11",
                    today && "bg-accent-11 text-grayscale-1 shadow-sm",
                  )}
                >
                  {date.day}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="sticky top-13 z-20 grid min-h-[4.5rem] border-grayscale-3 border-b bg-grayscale-0/95 dark:border-grayscale-4 dark:bg-grayscale-1/95"
          style={{ gridTemplateColumns: columnTemplate }}
        >
          <div className="sticky start-0 z-20 flex justify-end border-grayscale-3 border-e bg-inherit p-1.5 text-[0.625rem] font-medium text-grayscale-11 dark:border-grayscale-4">
            all-day
          </div>
          <div
            className="relative grid min-h-[4.5rem]"
            style={{
              gridColumn: "2 / -1",
              gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
            }}
          >
            {days.map((date) => (
              <div
                className="border-grayscale-3 border-e last:border-e-0 dark:border-grayscale-4"
                data-calendar-all-day-date={date.toString()}
                key={date.toString()}
              />
            ))}
            <div className="pointer-events-none absolute inset-x-0 top-1 z-10">
              {allDayLayout.segments.map((segment) => {
                const dragging =
                  context.interaction?.type === "move" &&
                  context.interaction.event.id === segment.event.id;
                return (
                  <div
                    className="pointer-events-auto absolute h-5 px-0.5"
                    data-calendar-event-layout=""
                    key={segment.event.id}
                    style={{
                      insetInlineStart: `${
                        (segment.startColumn / days.length) * 100
                      }%`,
                      top: `${segment.row * 22}px`,
                      width: `${(segment.span / days.length) * 100}%`,
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
                        startAllDayMove(event, segment.event)
                      }
                      onPointerCancel={cancelGesture}
                      onPointerMove={moveAllDay}
                      onPointerUp={finishAllDayMove}
                      showTime={false}
                    />
                  </div>
                );
              })}
              {hiddenAllDayEvents.map((hiddenEvents, dayIndex) =>
                hiddenEvents.length > 0 ? (
                  <div
                    className="pointer-events-auto absolute top-12 h-5 px-0.5"
                    key={`overflow-${days[dayIndex].toString()}`}
                    style={{
                      insetInlineStart: `${(dayIndex / days.length) * 100}%`,
                      width: `${100 / days.length}%`,
                    }}
                  >
                    <CalendarEventOverflow
                      className="static block w-full"
                      date={days[dayIndex]}
                      events={hiddenEvents}
                    />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: columnTemplate, height: gridHeight }}
        >
          <div className="sticky start-0 z-20 border-grayscale-3 border-e bg-grayscale-0 dark:border-grayscale-4 dark:bg-grayscale-1">
            {Array.from(
              { length: context.dayEndHour - context.dayStartHour + 1 },
              (_, index) => {
                const hour = context.dayStartHour + index;
                return (
                  <span
                    className="-translate-y-1/2 absolute inset-x-0 pe-2 text-right text-[0.625rem] tabular-nums text-grayscale-11"
                    key={hour}
                    style={{ top: index * hourHeight }}
                  >
                    {new Intl.DateTimeFormat(context.locale, {
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: context.timeZone,
                    }).format(
                      dateAtMinutes(
                        days[0],
                        hour * 60,
                        context.timeZone,
                      ).toDate(),
                    )}
                  </span>
                );
              },
            )}
          </div>
          <div className="relative" style={{ gridColumn: "2 / -1" }}>
            <div
              aria-label="Calendar time grid"
              className="absolute inset-0 grid"
              ref={gridRef}
              role="grid"
              style={{
                gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${slotCount}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: slotCount }, (_, slotIndex) => {
                const minutes =
                  dayStartMinutes + slotIndex * context.stepMinutes;
                return (
                  <div className="contents" key={minutes} role="row">
                    {days.map((date) => {
                      const key = `${date.toString()}-${minutes}`;
                      const hourLine = minutes % 60 === 0;
                      return (
                        <button
                          aria-label={`${new Intl.DateTimeFormat(
                            context.locale,
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              timeZone: context.timeZone,
                            },
                          ).format(
                            date.toDate(context.timeZone),
                          )}, ${new Intl.DateTimeFormat(context.locale, {
                            hour: "numeric",
                            minute: "2-digit",
                            timeZone: context.timeZone,
                          }).format(
                            dateAtMinutes(
                              date,
                              minutes,
                              context.timeZone,
                            ).toDate(),
                          )}`}
                          className={cn(
                            "touch-none cursor-crosshair border-grayscale-3 border-e border-t bg-transparent outline-none last:border-e-0",
                            !hourLine &&
                              "border-t-grayscale-2 dark:border-t-grayscale-3/60",
                            "focus-visible:z-10 focus-visible:bg-accent-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-8 dark:border-e-grayscale-4",
                          )}
                          data-calendar-slot-date={date.toString()}
                          data-calendar-slot-minutes={minutes}
                          key={key}
                          onClick={(event) =>
                            context.setDate(
                              date,
                              "date-press",
                              event.nativeEvent,
                            )
                          }
                          onKeyDown={(event) =>
                            handleSlotKeyDown(event, date, minutes)
                          }
                          onPointerDown={(event) =>
                            startCreate(event, date, minutes)
                          }
                          onPointerCancel={cancelGesture}
                          onPointerMove={moveCreate}
                          onPointerUp={finishCreate}
                          ref={(node) => {
                            if (node) {
                              slotRefs.current.set(key, node);
                            } else {
                              slotRefs.current.delete(key);
                            }
                          }}
                          role="gridcell"
                          tabIndex={
                            focusedSlot.date === date.toString() &&
                            focusedSlot.minutes === minutes
                              ? 0
                              : -1
                          }
                          type="button"
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-0 z-10">
              {days.map((date, dayIndex) => {
                const today = isDateToday(date, context.timeZone);
                const nowMinutes =
                  now && today ? wallMinutes(now, context.timeZone) : null;
                const showNow =
                  nowMinutes !== null &&
                  nowMinutes >= dayStartMinutes &&
                  nowMinutes <= dayEndMinutes;
                return (
                  <div
                    className="absolute inset-y-0 border-grayscale-3 border-e last:border-e-0 dark:border-grayscale-4"
                    data-calendar-slot-date={date.toString()}
                    key={date.toString()}
                    style={{
                      insetInlineStart: `${(dayIndex / days.length) * 100}%`,
                      width: `${100 / days.length}%`,
                    }}
                  >
                    {showNow && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 z-20 border-accent-9 border-t"
                        style={{
                          top: `${
                            ((nowMinutes - dayStartMinutes) / visibleMinutes) *
                            100
                          }%`,
                        }}
                      >
                        <span className="-start-1 -top-1 absolute size-2 rounded-full bg-accent-9 shadow-sm" />
                      </div>
                    )}

                    {createPreview &&
                      createPreview.date.compare(date) === 0 && (
                        <div
                          className="absolute inset-x-1 rounded-lg border border-accent-7 bg-accent-3/80 shadow-sm"
                          style={{
                            height: `${
                              ((createPreview.endMinutes -
                                createPreview.startMinutes) /
                                visibleMinutes) *
                              100
                            }%`,
                            top: `${
                              ((createPreview.startMinutes - dayStartMinutes) /
                                visibleMinutes) *
                              100
                            }%`,
                          }}
                        />
                      )}

                    {timedLayouts[dayIndex].map((layout) => {
                      const dragging =
                        context.interaction?.type === "move" &&
                        context.interaction.event.id === layout.event.id;
                      const resizing =
                        context.interaction?.type === "resize" &&
                        context.interaction.event.id === layout.event.id;
                      return (
                        <div
                          className="group/layout pointer-events-auto absolute px-0.5 py-px will-change-transform"
                          data-calendar-event-layout=""
                          key={`${layout.event.id}-${date.toString()}`}
                          style={{
                            height: `${layout.height}%`,
                            insetInlineStart: `${layout.left}%`,
                            top: `${layout.top}%`,
                            width: `${layout.width}%`,
                            zIndex: dragging || resizing ? 30 : 10,
                          }}
                        >
                          <CalendarEventButton
                            continuesAfter={layout.continuesAfter}
                            continuesBefore={layout.continuesBefore}
                            dragging={dragging}
                            event={layout.event}
                            onClick={(event) => {
                              if (
                                suppressClickEventIdRef.current ===
                                layout.event.id
                              ) {
                                event.preventDefault();
                                suppressClickEventIdRef.current = null;
                              }
                            }}
                            onPointerDown={(event) =>
                              startEventGesture(event, layout.event, "move")
                            }
                            onPointerCancel={cancelGesture}
                            onPointerMove={moveEventGesture}
                            onPointerUp={finishEventGesture}
                            resizing={resizing}
                          />
                          {context.editable &&
                            layout.event.source.editable !== false && (
                              <button
                                aria-label={`Resize ${layout.event.title}`}
                                className="absolute inset-x-1 bottom-0 z-20 h-2 cursor-ns-resize touch-none rounded-b-lg outline-none focus-visible:outline-2 focus-visible:outline-accent-8"
                                onPointerDown={(event) =>
                                  startEventGesture(
                                    event,
                                    layout.event,
                                    "resize",
                                  )
                                }
                                onPointerCancel={cancelGesture}
                                onPointerMove={moveEventGesture}
                                onPointerUp={finishEventGesture}
                                type="button"
                              >
                                <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current opacity-0 transition-opacity duration-150 group-hover/layout:opacity-40 group-focus-within/layout:opacity-40" />
                              </button>
                            )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
