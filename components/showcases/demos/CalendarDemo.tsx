"use client";

import { useState } from "react";

import {
  Calendar,
  type CalendarEvent,
  type CalendarEventDraft,
  type CalendarEventMutation,
  type CalendarViewValue,
} from "@/components/public/Calendar";
import { cn } from "@/helpers/classname-helper";

const initialEvents: CalendarEvent[] = [
  {
    id: "launch-week",
    title: "Launch week",
    start: "2026-07-27",
    end: "2026-08-01",
    allDay: true,
    color: "purple",
    description: "Final checks, launch, and the first customer follow-ups.",
  },
  {
    id: "design-review",
    title: "Design review",
    start: "2026-07-27T08:00:00Z",
    end: "2026-07-27T09:15:00Z",
    color: "blue",
    location: "Studio 2",
    description:
      "Review the production calendar interactions and responsive states.",
  },
  {
    id: "product-sync",
    title: "Product sync",
    start: "2026-07-27T08:30:00Z",
    end: "2026-07-27T10:00:00Z",
    color: "cyan",
  },
  {
    id: "research",
    title: "Research interviews",
    start: "2026-07-28T10:00:00Z",
    end: "2026-07-28T12:30:00Z",
    color: "orange",
  },
  {
    id: "lunch",
    title: "Team lunch",
    start: "2026-07-29T11:30:00Z",
    end: "2026-07-29T12:30:00Z",
    color: "green",
    location: "Borough Market",
  },
  {
    id: "customer-call",
    title: "Customer call",
    start: "2026-07-30T13:00:00Z",
    end: "2026-07-30T14:00:00Z",
    color: "pink",
  },
  {
    id: "ship",
    title: "Ship release",
    start: "2026-07-31T09:00:00Z",
    end: "2026-07-31T10:30:00Z",
    color: "accent",
  },
];

function applyMutation(
  events: CalendarEvent[],
  mutation: CalendarEventMutation,
) {
  return events.map((event) =>
    event.id === mutation.event.id
      ? {
          ...event,
          start: mutation.start,
          end: mutation.end,
          allDay: mutation.allDay,
        }
      : event,
  );
}

export default function CalendarDemo({
  className,
  defaultView = "week",
  density = "comfortable",
  showWeekends = true,
  testId,
}: {
  className?: string;
  defaultView?: CalendarViewValue;
  density?: "compact" | "comfortable";
  showWeekends?: boolean;
  testId?: string;
}) {
  const [events, setEvents] = useState(initialEvents);

  function createEvent(draft: CalendarEventDraft) {
    setEvents((current) => [
      ...current,
      {
        id: `event-${Date.now()}`,
        title: draft.title || "New event",
        start: draft.start,
        end: draft.end,
        allDay: draft.allDay,
        color: "accent",
      },
    ]);
  }

  function changeEvent(mutation: CalendarEventMutation) {
    setEvents((current) => applyMutation(current, mutation));
  }

  return (
    <Calendar
      className={cn("h-[22rem] min-h-0 w-full sm:h-[30rem]", className)}
      data-testid={testId}
      dayEndHour={19}
      dayStartHour={7}
      defaultValue="2026-07-30"
      defaultView={defaultView}
      density={density}
      events={events}
      firstDayOfWeek="mon"
      monthEventRows={1}
      onEventCreate={createEvent}
      onEventMove={changeEvent}
      onEventResize={changeEvent}
      showWeekends={showWeekends}
      stepMinutes={15}
      timeZone="Europe/London"
    />
  );
}
