"use client";

import { CalendarMonth } from "./Month";
import { CalendarRoot } from "./Root";
import {
  CalendarNext,
  CalendarPrevious,
  CalendarTitle,
  CalendarToday,
  CalendarToolbar,
  CalendarToolbarGroup,
  CalendarViewSelect,
  DefaultCalendarToolbar,
} from "./Toolbar";
import type { CalendarRootProps } from "./types";
import {
  CalendarAgenda,
  CalendarDay,
  CalendarView,
  CalendarViewport,
  CalendarWeek,
} from "./Views";

function DefaultCalendarContents() {
  return (
    <>
      <DefaultCalendarToolbar />
      <CalendarViewport>
        <CalendarView />
      </CalendarViewport>
    </>
  );
}

function CalendarComponent<TData = unknown>(props: CalendarRootProps<TData>) {
  return (
    <CalendarRoot {...props}>
      <DefaultCalendarContents />
    </CalendarRoot>
  );
}

export const Calendar = Object.assign(CalendarComponent, {
  Root: CalendarRoot,
  Toolbar: CalendarToolbar,
  ToolbarGroup: CalendarToolbarGroup,
  Previous: CalendarPrevious,
  Next: CalendarNext,
  Today: CalendarToday,
  Title: CalendarTitle,
  ViewSelect: CalendarViewSelect,
  Viewport: CalendarViewport,
  View: CalendarView,
  Month: CalendarMonth,
  Week: CalendarWeek,
  Day: CalendarDay,
  Agenda: CalendarAgenda,
});

export { useCalendarContext as useCalendar } from "./context";
export type {
  CalendarChangeDetails,
  CalendarChangeReason,
  CalendarDateInput,
  CalendarDensity,
  CalendarEvent,
  CalendarEventColor,
  CalendarEventDraft,
  CalendarEventMutation,
  CalendarEventRenderState,
  CalendarRenderEvent,
  CalendarRootProps,
  CalendarRootState,
  CalendarView as CalendarViewValue,
} from "./types";
export {
  CalendarAgenda,
  CalendarDay,
  CalendarMonth,
  CalendarNext,
  CalendarPrevious,
  CalendarRoot,
  CalendarTitle,
  CalendarToday,
  CalendarToolbar,
  CalendarToolbarGroup,
  CalendarView,
  CalendarViewport,
  CalendarViewSelect,
  CalendarWeek,
};
