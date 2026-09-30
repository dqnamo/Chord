"use client";

import { useRender } from "@base-ui/react/use-render";
import type { CalendarDate } from "@internationalized/date";
import { CalendarDotsIcon } from "@phosphor-icons/react/dist/csr/CalendarDots";
import { useMemo, useState } from "react";

import Button from "@/components/public/Button";
import { cn } from "@/helpers/classname-helper";

import { useCalendarContext } from "./context";
import {
  eachDay,
  getEventsInRange,
  getVisibleRange,
  isDateToday,
  isWeekendDate,
} from "./date";
import { CalendarEventButton } from "./Event";
import { CalendarMonth } from "./Month";
import { CalendarTimeGrid } from "./TimeGrid";
import type { CalendarView as CalendarViewValue } from "./types";

export function CalendarViewport({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div", { view: CalendarViewValue }>) {
  const context = useCalendarContext();

  return useRender({
    defaultTagName: "div",
    render,
    state: { view: context.view },
    props: {
      className: cn("flex min-h-0 flex-1 flex-col", className),
      ...props,
    },
  });
}

export function CalendarWeek<TData = unknown>(
  props: React.ComponentProps<"div">,
) {
  const context = useCalendarContext<TData>();
  const range = useMemo(
    () =>
      getVisibleRange(
        context.date,
        "week",
        context.locale,
        context.firstDayOfWeek,
      ),
    [context.date, context.firstDayOfWeek, context.locale],
  );
  const days = useMemo(
    () =>
      eachDay(range.start, range.end).filter(
        (day) => context.showWeekends || !isWeekendDate(day, context.locale),
      ),
    [context.locale, context.showWeekends, range.end, range.start],
  );

  return <CalendarTimeGrid days={days} {...props} />;
}

export function CalendarDay<TData = unknown>(
  props: React.ComponentProps<"div">,
) {
  const context = useCalendarContext<TData>();
  return <CalendarTimeGrid days={[context.date]} {...props} />;
}

function AgendaDay<TData>({
  date,
  events,
}: {
  date: CalendarDate;
  events: ReturnType<typeof getEventsInRange<TData>>;
}) {
  const context = useCalendarContext<TData>();
  const today = isDateToday(date, context.timeZone);

  return (
    <section
      aria-labelledby={`calendar-agenda-${date.toString()}`}
      className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-grayscale-3 border-b py-3 last:border-b-0 dark:border-grayscale-4 sm:grid-cols-[5rem_minmax(0,1fr)]"
    >
      <h3
        aria-label={new Intl.DateTimeFormat(context.locale, {
          dateStyle: "full",
          timeZone: context.timeZone,
        }).format(date.toDate(context.timeZone))}
        className="text-center"
        id={`calendar-agenda-${date.toString()}`}
      >
        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-grayscale-11">
          {new Intl.DateTimeFormat(context.locale, {
            weekday: "short",
            timeZone: context.timeZone,
          }).format(date.toDate(context.timeZone))}
        </span>
        <span
          className={cn(
            "mx-auto mt-1 flex size-8 items-center justify-center rounded-full text-base font-semibold text-grayscale-11",
            today && "bg-accent-11 text-grayscale-1 shadow-sm",
          )}
        >
          {date.day}
        </span>
      </h3>
      <div className="flex min-w-0 flex-col gap-1.5 pe-3">
        {events.map((event) => (
          <CalendarEventButton
            className="min-h-9"
            continuesAfter={event.endDate.compare(date.add({ days: 1 })) > 0}
            continuesBefore={event.startDate.compare(date) < 0}
            event={event}
            key={`${date.toString()}-${event.id}`}
            showTime={!event.allDay}
          />
        ))}
      </div>
    </section>
  );
}

function CalendarAgendaContents<TData = unknown>({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const context = useCalendarContext<TData>();
  const [extraDays, setExtraDays] = useState(0);
  const range = useMemo(
    () => ({
      start: context.date,
      end: context.date.add({ days: context.agendaDays + extraDays }),
    }),
    [context.agendaDays, context.date, extraDays],
  );
  const days = useMemo(
    () =>
      eachDay(range.start, range.end).filter(
        (day) => context.showWeekends || !isWeekendDate(day, context.locale),
      ),
    [context.locale, context.showWeekends, range.end, range.start],
  );
  const events = useMemo(
    () => getEventsInRange(context.normalizedEvents, range),
    [context.normalizedEvents, range],
  );
  const populatedDays = days
    .map((date) => ({
      date,
      events: events.filter(
        (event) =>
          event.startDate.compare(date) <= 0 &&
          event.endDate.compare(date.add({ days: 1 })) >= 0,
      ),
    }))
    .filter((group) => group.events.length > 0);

  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto", className)} {...props}>
      <div className="mx-auto w-full max-w-3xl px-2 sm:px-4">
        {populatedDays.length > 0 ? (
          populatedDays.map((group) => (
            <AgendaDay
              date={group.date}
              events={group.events}
              key={group.date.toString()}
            />
          ))
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-10 items-center justify-center rounded-xl border border-grayscale-3 bg-grayscale-1 text-grayscale-11 dark:border-grayscale-4 dark:bg-grayscale-2">
              <CalendarDotsIcon aria-hidden="true" size={20} />
            </div>
            <p className="mt-3 text-sm font-semibold text-grayscale-11">
              Nothing scheduled
            </p>
            <p className="mt-1 max-w-xs text-xs leading-5 text-grayscale-11">
              There are no events in this range. Choose another date or create
              an event from a calendar grid.
            </p>
          </div>
        )}
        <div className="flex justify-center py-5">
          <Button
            onClick={() =>
              setExtraDays((current) => current + context.agendaDays)
            }
            type="button"
            variant="secondary"
          >
            Load {context.agendaDays} more days
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CalendarAgenda<TData = unknown>(
  props: React.ComponentProps<"div">,
) {
  const context = useCalendarContext<TData>();

  return (
    <CalendarAgendaContents
      key={`${context.date.toString()}-${context.agendaDays}`}
      {...props}
    />
  );
}

export function CalendarView<TData = unknown>() {
  const context = useCalendarContext<TData>();

  if (context.view === "week") {
    return <CalendarWeek />;
  }

  if (context.view === "day") {
    return <CalendarDay />;
  }

  if (context.view === "agenda") {
    return <CalendarAgenda />;
  }

  return <CalendarMonth />;
}
