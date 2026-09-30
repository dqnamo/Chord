"use client";

import { Popover } from "@base-ui/react/popover";
import { type CalendarDate, fromDate } from "@internationalized/date";
import { MapPinIcon } from "@phosphor-icons/react/dist/csr/MapPin";
import { useMemo, useState } from "react";

import { cn } from "@/helpers/classname-helper";

import { createCalendarChangeDetails, useCalendarContext } from "./context";
import type { NormalizedCalendarEvent } from "./date";
import { moveEventToDate, moveTimedEvent, resizeTimedEvent } from "./date";
import type { CalendarEventRenderState } from "./types";

const eventColorClasses = {
  accent:
    "border-accent-7 bg-accent-3 text-accent-12 hover:bg-accent-4 dark:border-accent-8 dark:bg-accent-4",
  blue: "border-blue-7 bg-blue-3 text-blue-12 hover:bg-blue-4 dark:border-blue-8 dark:bg-blue-4",
  cyan: "border-cyan-7 bg-cyan-3 text-cyan-12 hover:bg-cyan-4 dark:border-cyan-8 dark:bg-cyan-4",
  green:
    "border-green-7 bg-green-3 text-green-12 hover:bg-green-4 dark:border-green-8 dark:bg-green-4",
  orange:
    "border-orange-7 bg-orange-3 text-orange-12 hover:bg-orange-4 dark:border-orange-8 dark:bg-orange-4",
  pink: "border-pink-7 bg-pink-3 text-pink-12 hover:bg-pink-4 dark:border-pink-8 dark:bg-pink-4",
  purple:
    "border-purple-7 bg-purple-3 text-purple-12 hover:bg-purple-4 dark:border-purple-8 dark:bg-purple-4",
  red: "border-red-7 bg-red-3 text-red-12 hover:bg-red-4 dark:border-red-8 dark:bg-red-4",
  yellow:
    "border-yellow-7 bg-yellow-3 text-yellow-12 hover:bg-yellow-4 dark:border-yellow-8 dark:bg-yellow-4",
} as const;

export type CalendarEventButtonProps<TData = unknown> = Omit<
  React.ComponentProps<typeof Popover.Trigger>,
  "children" | "render"
> & {
  event: NormalizedCalendarEvent<TData>;
  compact?: boolean;
  continuesBefore?: boolean;
  continuesAfter?: boolean;
  dragging?: boolean;
  resizing?: boolean;
  showTime?: boolean;
};

export function CalendarEventOverflow<TData = unknown>({
  className,
  date,
  events,
}: {
  className?: string;
  date: CalendarDate;
  events: NormalizedCalendarEvent<TData>[];
}) {
  const context = useCalendarContext<TData>();

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={`${events.length} more ${
          events.length === 1 ? "event" : "events"
        } on ${new Intl.DateTimeFormat(context.locale, {
          dateStyle: "full",
          timeZone: context.timeZone,
        }).format(date.toDate(context.timeZone))}`}
        className={cn(
          "absolute inset-x-1 bottom-1 z-10 h-5 cursor-pointer rounded-md px-1 text-left text-[0.625rem] font-medium text-grayscale-11 outline-none",
          "hover:bg-grayscale-3 hover:text-grayscale-12 focus-visible:outline-2 focus-visible:outline-accent-8",
          className,
        )}
      >
        +{events.length}
        <span className="hidden sm:inline"> more</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="z-50" sideOffset={6}>
          <Popover.Popup
            className={cn(
              "medium-shadow flex max-h-80 w-72 origin-[var(--transform-origin)] flex-col gap-1 overflow-y-auto rounded-2xl border border-grayscale-3 bg-grayscale-0 p-2 outline-none",
              "transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
              "dark:border-grayscale-4 dark:bg-grayscale-2",
            )}
          >
            <Popover.Title className="px-1 pb-1 text-xs font-semibold">
              {new Intl.DateTimeFormat(context.locale, {
                dateStyle: "full",
                timeZone: context.timeZone,
              }).format(date.toDate(context.timeZone))}
            </Popover.Title>
            {events.map((event) => (
              <CalendarEventButton
                compact
                event={event}
                key={event.id}
                showTime={!event.allDay}
              />
            ))}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function formatEventRange<TData>(
  event: NormalizedCalendarEvent<TData>,
  locale: string,
  timeZone: string,
) {
  if (event.allDay) {
    return event.startDate.add({ days: 1 }).compare(event.endDate) === 0
      ? new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone,
        }).format(event.start)
      : `${new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "short",
          timeZone,
        }).format(event.start)} – ${new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone,
        }).format(new Date(event.end.getTime() - 1))}`;
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone,
  });
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
  const start = `${dateFormatter.format(event.start)}, ${timeFormatter.format(
    event.start,
  )}`;
  const endTime = timeFormatter.format(event.end);

  return event.startDate.add({ days: 1 }).compare(event.endDate) === 0
    ? `${start}–${endTime}`
    : `${start} – ${dateFormatter.format(event.end)}, ${endTime}`;
}

function getEventTimeLabel<TData>(
  event: NormalizedCalendarEvent<TData>,
  locale: string,
  timeZone: string,
) {
  if (event.allDay) {
    return "All day";
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(event.start);
}

export function CalendarEventButton<TData = unknown>({
  className,
  event,
  compact = false,
  continuesBefore = false,
  continuesAfter = false,
  dragging = false,
  resizing = false,
  showTime = true,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  ...props
}: CalendarEventButtonProps<TData>) {
  const context = useCalendarContext<TData>();
  const renderEvent = context.renderEvent;
  const selected = context.selectedEventId === event.id;
  const [focused, setFocused] = useState(false);
  const state = useMemo<CalendarEventRenderState<TData>>(
    () => ({
      event: event.source,
      allDay: event.allDay,
      compact,
      continuesAfter,
      continuesBefore,
      dragging,
      focused,
      resizing,
      selected,
    }),
    [
      compact,
      continuesAfter,
      continuesBefore,
      dragging,
      event,
      focused,
      resizing,
      selected,
    ],
  );

  function commitMove(
    mutation: ReturnType<typeof moveEventToDate<TData>>,
    reason: "keyboard-move",
    sourceEvent: Event,
  ) {
    const details = createCalendarChangeDetails(reason, sourceEvent);
    context.onEventMove?.(mutation, details);
    if (!details.isCanceled) {
      context.announce(`Moved ${event.title}.`);
    }
  }

  function commitResize(
    mutation: ReturnType<typeof resizeTimedEvent<TData>>,
    sourceEvent: Event,
  ) {
    const details = createCalendarChangeDetails("keyboard-resize", sourceEvent);
    context.onEventResize?.(mutation, details);
    if (!details.isCanceled) {
      context.announce(`Resized ${event.title}.`);
    }
  }

  function handleKeyboard(
    eventObject: Parameters<
      NonNullable<React.ComponentProps<typeof Popover.Trigger>["onKeyDown"]>
    >[0],
  ) {
    onKeyDown?.(eventObject);

    if (
      eventObject.defaultPrevented ||
      !context.editable ||
      event.source.editable === false
    ) {
      return;
    }

    if (!eventObject.altKey || eventObject.key === "Enter") {
      return;
    }

    const dayDelta =
      eventObject.key === "ArrowLeft"
        ? -1
        : eventObject.key === "ArrowRight"
          ? 1
          : 0;
    const minuteDelta =
      eventObject.key === "ArrowUp"
        ? -context.stepMinutes
        : eventObject.key === "ArrowDown"
          ? context.stepMinutes
          : 0;

    if (dayDelta === 0 && minuteDelta === 0) {
      return;
    }

    eventObject.preventDefault();
    eventObject.stopPropagation();

    if (eventObject.shiftKey) {
      if (event.allDay) {
        const currentDuration = event.endDate.compare(event.startDate);
        const nextDuration = Math.max(
          1,
          currentDuration + dayDelta + Math.sign(minuteDelta),
        );
        const details = createCalendarChangeDetails(
          "keyboard-resize",
          eventObject.nativeEvent,
        );
        context.onEventResize?.(
          {
            event: event.source,
            start: event.startDate.toString(),
            end: event.startDate.add({ days: nextDuration }).toString(),
            allDay: true,
          },
          details,
        );
        if (!details.isCanceled) {
          context.announce(`Resized ${event.title}.`);
        }
        return;
      }

      const zonedEnd = fromDate(event.end, context.timeZone);
      const targetDate = event.endDate.add({ days: dayDelta - 1 });
      commitResize(
        resizeTimedEvent(
          event,
          targetDate,
          zonedEnd.hour * 60 + zonedEnd.minute + minuteDelta,
          context.timeZone,
        ),
        eventObject.nativeEvent,
      );
      return;
    }

    if (event.allDay || dayDelta !== 0) {
      commitMove(
        moveEventToDate(
          event,
          event.startDate.add({ days: dayDelta || Math.sign(minuteDelta) }),
          context.timeZone,
        ),
        "keyboard-move",
        eventObject.nativeEvent,
      );
      return;
    }

    const zonedStart = fromDate(event.start, context.timeZone);
    commitMove(
      moveTimedEvent(
        event,
        event.startDate,
        zonedStart.hour * 60 + zonedStart.minute + minuteDelta,
        context.timeZone,
      ),
      "keyboard-move",
      eventObject.nativeEvent,
    );
  }

  function handlePress(
    eventObject: Parameters<
      NonNullable<React.ComponentProps<typeof Popover.Trigger>["onClick"]>
    >[0],
  ) {
    onClick?.(eventObject);

    if (eventObject.defaultPrevented) {
      return;
    }

    const details = createCalendarChangeDetails(
      "event-press",
      eventObject.nativeEvent,
    );
    context.onEventPress?.(event.source, details);

    if (!details.isCanceled) {
      context.setSelectedEventId(
        event.id,
        "event-press",
        eventObject.nativeEvent,
      );
    }
  }

  function handleFocus(
    eventObject: Parameters<
      NonNullable<React.ComponentProps<typeof Popover.Trigger>["onFocus"]>
    >[0],
  ) {
    setFocused(true);
    onFocus?.(eventObject);
  }

  function handleBlur(
    eventObject: Parameters<
      NonNullable<React.ComponentProps<typeof Popover.Trigger>["onBlur"]>
    >[0],
  ) {
    setFocused(false);
    onBlur?.(eventObject);
  }

  const eventLabel = `${event.title}, ${formatEventRange(
    event,
    context.locale,
    context.timeZone,
  )}`;
  const triggerClassName = cn(
    "group/event relative isolate flex min-w-0 cursor-pointer select-none items-start gap-1 overflow-hidden border px-1.5 text-left text-[0.6875rem] font-medium leading-4 outline-none",
    "transition-[background-color,box-shadow,opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] motion-reduce:transform-none",
    "focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-accent-8 focus-visible:outline-offset-1",
    eventColorClasses[event.color],
    compact ? "h-5 rounded-md py-px" : "h-full min-h-6 rounded-lg py-1",
    selected &&
      "z-10 ring-2 ring-accent-8 ring-offset-1 ring-offset-grayscale-0",
    dragging && "z-30 opacity-80 shadow-lg",
    continuesBefore && "rounded-s-none border-s-0",
    continuesAfter && "rounded-e-none border-e-0",
    className,
  );

  return (
    <Popover.Root
      onOpenChange={(open, details) => {
        if (!open && selected) {
          context.setSelectedEventId(null, "event-press", details.event);
        }
      }}
      open={selected}
    >
      <Popover.Trigger
        aria-label={eventLabel}
        className={triggerClassName}
        data-all-day={event.allDay ? "" : undefined}
        data-calendar-event-id={event.id}
        data-continues-after={continuesAfter ? "" : undefined}
        data-continues-before={continuesBefore ? "" : undefined}
        data-dragging={dragging ? "" : undefined}
        data-focused={focused ? "" : undefined}
        data-resizing={resizing ? "" : undefined}
        data-selected={selected ? "" : undefined}
        onBlur={handleBlur}
        onClick={handlePress}
        onFocus={handleFocus}
        onKeyDown={handleKeyboard}
        render={
          renderEvent
            ? (renderProps) => renderEvent(renderProps, state)
            : undefined
        }
        {...props}
      >
        {showTime && (
          <span className="shrink-0 opacity-70">
            {getEventTimeLabel(event, context.locale, context.timeZone)}
          </span>
        )}
        <span className="min-w-0 truncate">{event.title}</span>
        {resizing && (
          <span className="ms-auto size-1.5 shrink-0 rounded-full bg-current opacity-70" />
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="z-50" sideOffset={8}>
          <Popover.Popup
            className={cn(
              "medium-shadow w-72 origin-[var(--transform-origin)] rounded-2xl border border-grayscale-3 bg-grayscale-0 p-3 text-grayscale-12 outline-none",
              "transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
              "dark:border-grayscale-4 dark:bg-grayscale-2",
            )}
          >
            <Popover.Title className="text-sm font-semibold">
              {event.title}
            </Popover.Title>
            <Popover.Description className="mt-1 text-xs leading-5 text-grayscale-11">
              {formatEventRange(event, context.locale, context.timeZone)}
            </Popover.Description>
            {event.source.location && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-grayscale-11">
                <MapPinIcon aria-hidden="true" size={14} />
                <span className="truncate">{event.source.location}</span>
              </div>
            )}
            {event.source.description && (
              <p className="mt-2 border-grayscale-3 border-t pt-2 text-xs leading-5 text-grayscale-11 dark:border-grayscale-4">
                {event.source.description}
              </p>
            )}
            {context.editable && event.source.editable !== false && (
              <p className="mt-3 text-[0.625rem] leading-4 text-grayscale-11">
                Alt + arrow moves. Alt + Shift + arrow resizes.
              </p>
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
