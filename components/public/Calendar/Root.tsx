"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useCallback, useMemo, useState } from "react";

import { cn } from "@/helpers/classname-helper";

import {
  type CalendarContextValue,
  type CalendarInteraction,
  CalendarProvider,
  createCalendarChangeDetails,
} from "./context";
import { normalizeEvents, toCalendarDateValue } from "./date";
import type {
  CalendarChangeReason,
  CalendarRootProps,
  CalendarRootState,
  CalendarView,
} from "./types";

const DEFAULT_VIEWS: CalendarView[] = ["month", "week", "day", "agenda"];
const STEP_MINUTES = [5, 10, 15, 20, 30, 60] as const;

function validateConfiguration({
  agendaDays,
  dayEndHour,
  dayStartHour,
  locale,
  monthEventRows,
  stepMinutes,
  timeZone,
  view,
}: {
  agendaDays: number;
  dayEndHour: number;
  dayStartHour: number;
  locale: string;
  monthEventRows: number;
  stepMinutes: number;
  timeZone: string;
  view: CalendarView;
}) {
  if (!DEFAULT_VIEWS.includes(view)) {
    throw new RangeError(`Unsupported calendar view "${view}".`);
  }

  if (
    !Number.isInteger(dayStartHour) ||
    dayStartHour < 0 ||
    dayStartHour >= 24
  ) {
    throw new RangeError("dayStartHour must be an integer between 0 and 23.");
  }

  if (
    !Number.isInteger(dayEndHour) ||
    dayEndHour <= dayStartHour ||
    dayEndHour > 24
  ) {
    throw new RangeError(
      "dayEndHour must be an integer greater than dayStartHour and no more than 24.",
    );
  }

  if (!STEP_MINUTES.includes(stepMinutes as (typeof STEP_MINUTES)[number])) {
    throw new RangeError("stepMinutes must be 5, 10, 15, 20, 30, or 60.");
  }

  if (!Number.isInteger(agendaDays) || agendaDays < 1 || agendaDays > 365) {
    throw new RangeError("agendaDays must be an integer between 1 and 365.");
  }

  if (
    !Number.isInteger(monthEventRows) ||
    monthEventRows < 1 ||
    monthEventRows > 6
  ) {
    throw new RangeError("monthEventRows must be an integer between 1 and 6.");
  }

  if (typeof timeZone !== "string" || timeZone.length === 0) {
    throw new TypeError("timeZone must be an explicit IANA time-zone name.");
  }

  try {
    new Intl.DateTimeFormat(locale, { timeZone }).format();
  } catch {
    throw new RangeError(
      `Invalid calendar locale "${locale}" or time zone "${timeZone}".`,
    );
  }
}

export function CalendarRoot<TData = unknown>({
  children,
  className,
  events,
  value: valueProp,
  defaultValue,
  onValueChange,
  view: viewProp,
  defaultView = "month",
  onViewChange,
  selectedEventId: selectedEventIdProp,
  defaultSelectedEventId = null,
  onSelectedEventIdChange,
  onEventPress,
  onEventCreate,
  onEventMove,
  onEventResize,
  locale = "en-GB",
  timeZone,
  firstDayOfWeek,
  dayStartHour = 7,
  dayEndHour = 20,
  stepMinutes = 30,
  agendaDays = 30,
  monthEventRows: monthEventRowsProp,
  density = "comfortable",
  editable = true,
  selectable = true,
  showWeekends = true,
  renderEvent,
  render,
  ...otherProps
}: CalendarRootProps<TData>) {
  const monthEventRows = monthEventRowsProp ?? (density === "compact" ? 1 : 2);
  validateConfiguration({
    agendaDays,
    dayEndHour,
    dayStartHour,
    locale,
    monthEventRows,
    stepMinutes,
    timeZone,
    view: viewProp ?? defaultView,
  });
  const [uncontrolledDate, setUncontrolledDate] = useState(() =>
    toCalendarDateValue(defaultValue ?? new Date(), timeZone),
  );
  const [uncontrolledView, setUncontrolledView] =
    useState<CalendarView>(defaultView);
  const [uncontrolledSelectedEventId, setUncontrolledSelectedEventId] =
    useState<string | null>(defaultSelectedEventId);
  const [interaction, setInteraction] =
    useState<CalendarInteraction<TData>>(null);
  const [announcement, setAnnouncement] = useState("");

  const view = viewProp ?? uncontrolledView;
  const date = valueProp
    ? toCalendarDateValue(valueProp, timeZone)
    : uncontrolledDate;
  const selectedEventId =
    selectedEventIdProp === undefined
      ? uncontrolledSelectedEventId
      : selectedEventIdProp;

  const normalizedEvents = useMemo(
    () => normalizeEvents(events, timeZone),
    [events, timeZone],
  );

  const setDate = useCallback(
    (
      nextDate: typeof date,
      reason: CalendarChangeReason,
      event: Event | null = null,
    ) => {
      const details = createCalendarChangeDetails(reason, event);
      onValueChange?.(nextDate.toDate(timeZone), details);

      if (details.isCanceled) {
        return false;
      }

      if (valueProp === undefined) {
        setUncontrolledDate(nextDate);
      }

      return true;
    },
    [onValueChange, timeZone, valueProp],
  );

  const setView = useCallback(
    (
      nextView: CalendarView,
      reason: CalendarChangeReason,
      event: Event | null = null,
    ) => {
      const details = createCalendarChangeDetails(reason, event);
      onViewChange?.(nextView, details);

      if (details.isCanceled) {
        return false;
      }

      if (viewProp === undefined) {
        setUncontrolledView(nextView);
      }

      return true;
    },
    [onViewChange, viewProp],
  );

  const setSelectedEventId = useCallback(
    (
      nextEventId: string | null,
      reason: CalendarChangeReason,
      event: Event | null = null,
    ) => {
      const details = createCalendarChangeDetails(reason, event);
      onSelectedEventIdChange?.(nextEventId, details);

      if (details.isCanceled) {
        return false;
      }

      if (selectedEventIdProp === undefined) {
        setUncontrolledSelectedEventId(nextEventId);
      }

      return true;
    },
    [onSelectedEventIdChange, selectedEventIdProp],
  );

  const announce = useCallback((message: string) => {
    setAnnouncement("");
    window.requestAnimationFrame(() => setAnnouncement(message));
  }, []);

  const context = useMemo<CalendarContextValue<TData>>(
    () => ({
      agendaDays,
      announce,
      announcement,
      date,
      dayEndHour,
      dayStartHour,
      density,
      editable,
      events,
      firstDayOfWeek,
      interaction,
      locale,
      monthEventRows,
      normalizedEvents,
      onEventCreate,
      onEventMove,
      onEventPress,
      onEventResize,
      renderEvent,
      selectable,
      selectedEventId,
      setDate,
      setInteraction,
      setSelectedEventId,
      setView,
      showWeekends,
      stepMinutes,
      timeZone,
      view,
    }),
    [
      agendaDays,
      announce,
      announcement,
      date,
      dayEndHour,
      dayStartHour,
      density,
      editable,
      events,
      firstDayOfWeek,
      interaction,
      locale,
      monthEventRows,
      normalizedEvents,
      onEventCreate,
      onEventMove,
      onEventPress,
      onEventResize,
      renderEvent,
      selectable,
      selectedEventId,
      setDate,
      setSelectedEventId,
      setView,
      showWeekends,
      stepMinutes,
      timeZone,
      view,
    ],
  );

  const state: CalendarRootState = { density, editable, view };
  const element = useRender({
    defaultTagName: "div",
    render,
    state,
    props: mergeProps<"div">(
      {
        "aria-label": "Calendar",
        className: cn(
          "flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-grayscale-3 bg-grayscale-0 text-grayscale-12",
          "small-shadow dark:border-grayscale-4 dark:bg-grayscale-1",
          className,
        ),
        children: (
          <>
            {children}
            <div
              aria-atomic="true"
              aria-live="polite"
              className="sr-only"
              data-calendar-announcer=""
            >
              {announcement}
            </div>
          </>
        ),
      },
      otherProps,
    ),
  });

  return <CalendarProvider value={context}>{element}</CalendarProvider>;
}
