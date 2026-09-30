"use client";

import type { CalendarDate } from "@internationalized/date";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

import type { NormalizedCalendarEvent } from "./date";
import type {
  CalendarChangeDetails,
  CalendarChangeReason,
  CalendarDensity,
  CalendarEvent,
  CalendarRenderEvent,
  CalendarView,
} from "./types";

export type CalendarInteraction<TData = unknown> =
  | {
      type: "move" | "resize";
      event: NormalizedCalendarEvent<TData>;
      pointerId?: number;
    }
  | {
      type: "create";
      pointerId?: number;
    }
  | null;

export type CalendarContextValue<TData = unknown> = {
  agendaDays: number;
  announce: (message: string) => void;
  announcement: string;
  date: CalendarDate;
  dayEndHour: number;
  dayStartHour: number;
  density: CalendarDensity;
  editable: boolean;
  events: CalendarEvent<TData>[];
  firstDayOfWeek:
    | "sun"
    | "mon"
    | "tue"
    | "wed"
    | "thu"
    | "fri"
    | "sat"
    | undefined;
  interaction: CalendarInteraction<TData>;
  locale: string;
  monthEventRows: number;
  normalizedEvents: NormalizedCalendarEvent<TData>[];
  onEventCreate: CalendarRootCallbacks<TData>["onEventCreate"];
  onEventMove: CalendarRootCallbacks<TData>["onEventMove"];
  onEventPress: CalendarRootCallbacks<TData>["onEventPress"];
  onEventResize: CalendarRootCallbacks<TData>["onEventResize"];
  renderEvent: CalendarRenderEvent<TData> | undefined;
  selectable: boolean;
  selectedEventId: string | null;
  setDate: (
    date: CalendarDate,
    reason: CalendarChangeReason,
    event?: Event | null,
  ) => boolean;
  setInteraction: Dispatch<SetStateAction<CalendarInteraction<TData>>>;
  setSelectedEventId: (
    eventId: string | null,
    reason: CalendarChangeReason,
    event?: Event | null,
  ) => boolean;
  setView: (
    view: CalendarView,
    reason: CalendarChangeReason,
    event?: Event | null,
  ) => boolean;
  showWeekends: boolean;
  stepMinutes: number;
  timeZone: string;
  view: CalendarView;
};

type CalendarRootCallbacks<TData> = {
  onEventCreate?: (
    draft: import("./types").CalendarEventDraft<TData>,
    details: CalendarChangeDetails,
  ) => void;
  onEventMove?: (
    mutation: import("./types").CalendarEventMutation<TData>,
    details: CalendarChangeDetails,
  ) => void;
  onEventPress?: (
    event: CalendarEvent<TData>,
    details: CalendarChangeDetails,
  ) => void;
  onEventResize?: (
    mutation: import("./types").CalendarEventMutation<TData>,
    details: CalendarChangeDetails,
  ) => void;
};

const CalendarContext = createContext<CalendarContextValue<unknown> | null>(
  null,
);

export function CalendarProvider<TData>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CalendarContextValue<TData>;
}) {
  return (
    <CalendarContext.Provider value={value as CalendarContextValue<unknown>}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext<TData = unknown>() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("Calendar parts must be rendered inside Calendar.Root.");
  }

  return context as CalendarContextValue<TData>;
}

export function createCalendarChangeDetails(
  reason: CalendarChangeReason,
  event: Event | null = null,
): CalendarChangeDetails {
  let canceled = false;

  return {
    reason,
    event,
    cancel() {
      canceled = true;
    },
    get isCanceled() {
      return canceled;
    },
  };
}
