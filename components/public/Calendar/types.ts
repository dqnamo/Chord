import type { useRender } from "@base-ui/react/use-render";
import type { ReactElement, ReactNode } from "react";

export type CalendarView = "month" | "week" | "day" | "agenda";
export type CalendarDensity = "compact" | "comfortable";
export type CalendarEventColor =
  | "accent"
  | "blue"
  | "cyan"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "yellow";

export type CalendarDateInput = Date | string;

export type CalendarEvent<TData = unknown> = {
  id: string;
  title: string;
  start: CalendarDateInput;
  end: CalendarDateInput;
  allDay?: boolean;
  calendarId?: string;
  seriesId?: string;
  description?: string;
  location?: string;
  color?: CalendarEventColor;
  editable?: boolean;
  data?: TData;
};

export type CalendarEventDraft<TData = unknown> = Omit<
  CalendarEvent<TData>,
  "id" | "title"
> & {
  title?: string;
};

export type CalendarEventMutation<TData = unknown> = {
  event: CalendarEvent<TData>;
  start: CalendarDateInput;
  end: CalendarDateInput;
  allDay: boolean;
};

export type CalendarChangeReason =
  | "date-press"
  | "event-press"
  | "keyboard-create"
  | "keyboard-move"
  | "keyboard-resize"
  | "next-press"
  | "pointer-create"
  | "pointer-move"
  | "pointer-resize"
  | "previous-press"
  | "today-press"
  | "view-change";

export type CalendarChangeDetails = {
  reason: CalendarChangeReason;
  event: Event | null;
  cancel: () => void;
  isCanceled: boolean;
};

export type CalendarEventRenderState<TData = unknown> = {
  event: CalendarEvent<TData>;
  allDay: boolean;
  compact: boolean;
  continuesAfter: boolean;
  continuesBefore: boolean;
  dragging: boolean;
  focused: boolean;
  resizing: boolean;
  selected: boolean;
};

export type CalendarRenderEvent<TData = unknown> = (
  props: React.HTMLAttributes<HTMLButtonElement> & {
    ref?: React.Ref<HTMLButtonElement>;
  },
  state: CalendarEventRenderState<TData>,
) => ReactElement;

export type CalendarRootState = {
  density: CalendarDensity;
  editable: boolean;
  view: CalendarView;
};

export type CalendarRootProps<TData = unknown> = Omit<
  useRender.ComponentProps<"div", CalendarRootState>,
  | "children"
  | "defaultValue"
  | "onChange"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
  | "value"
> & {
  children?: ReactNode;
  events: CalendarEvent<TData>[];
  value?: CalendarDateInput;
  defaultValue?: CalendarDateInput;
  onValueChange?: (value: Date, details: CalendarChangeDetails) => void;
  view?: CalendarView;
  defaultView?: CalendarView;
  onViewChange?: (view: CalendarView, details: CalendarChangeDetails) => void;
  selectedEventId?: string | null;
  defaultSelectedEventId?: string | null;
  onSelectedEventIdChange?: (
    eventId: string | null,
    details: CalendarChangeDetails,
  ) => void;
  onEventPress?: (
    event: CalendarEvent<TData>,
    details: CalendarChangeDetails,
  ) => void;
  onEventCreate?: (
    event: CalendarEventDraft<TData>,
    details: CalendarChangeDetails,
  ) => void;
  onEventMove?: (
    mutation: CalendarEventMutation<TData>,
    details: CalendarChangeDetails,
  ) => void;
  onEventResize?: (
    mutation: CalendarEventMutation<TData>,
    details: CalendarChangeDetails,
  ) => void;
  locale?: string;
  timeZone: string;
  firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  dayStartHour?: number;
  dayEndHour?: number;
  stepMinutes?: 5 | 10 | 15 | 20 | 30 | 60;
  agendaDays?: number;
  monthEventRows?: number;
  density?: CalendarDensity;
  editable?: boolean;
  selectable?: boolean;
  showWeekends?: boolean;
  renderEvent?: CalendarRenderEvent<TData>;
};
