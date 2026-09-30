# Calendar

Chord Calendar is a complete event-calendar component built from Base UI
composition primitives, Chord tokens, Tailwind CSS, and a time-zone-aware date
engine. It supports month, week, day, and agenda views without coupling the UI
to a database or calendar provider.

## Install

Copy the complete `components/public/Calendar/` directory and install the two
runtime dependencies:

```sh
pnpm add @base-ui/react @internationalized/date
```

The component also imports Chord's `cn` helper and Button component. Copy those
existing Chord dependencies when installing Calendar outside this repository.

## Event model

Timed events use absolute ISO 8601 timestamps or JavaScript `Date` objects.
Always include an offset or `Z` when using a string:

```ts
const meeting = {
  id: "meeting",
  title: "Design review",
  start: "2026-07-30T08:00:00Z",
  end: "2026-07-30T09:00:00Z",
};
```

All-day events use date-only strings and an exclusive end date:

```ts
const launch = {
  id: "launch",
  title: "Launch day",
  start: "2026-07-30",
  end: "2026-07-31",
  allDay: true,
};
```

The exclusive end keeps multi-day arithmetic predictable. An event from July 30
through August 1 inclusive ends on `2026-08-02`.

## Complete component

```tsx
"use client";

import { useState } from "react";
import {
  Calendar,
  type CalendarEvent,
  type CalendarEventMutation,
} from "@/components/public/Calendar";

export default function Schedule() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  function updateEvent(mutation: CalendarEventMutation) {
    setEvents((current) =>
      current.map((event) =>
        event.id === mutation.event.id
          ? {
              ...event,
              start: mutation.start,
              end: mutation.end,
              allDay: mutation.allDay,
            }
          : event,
      ),
    );
  }

  return (
    <Calendar
      className="h-[44rem]"
      events={events}
      onEventMove={updateEvent}
      onEventResize={updateEvent}
      timeZone="Europe/London"
    />
  );
}
```

`timeZone` is required because event layout must use one explicit IANA time
zone on the server and in the browser. This prevents hydration differences and
keeps daylight-saving transitions deterministic.

`monthEventRows` controls how many event bars each week shows before the
overflow popover appears. Its density-aware default is two rows in comfortable
mode and one in compact mode; reduce it for short embedded calendars.

## Compound composition

`Calendar` follows Base UI's Root-and-parts convention:

```tsx
<Calendar.Root events={events} timeZone="Europe/London">
  <Calendar.Toolbar>
    <Calendar.ToolbarGroup>
      <Calendar.Previous />
      <Calendar.Today />
      <Calendar.Next />
    </Calendar.ToolbarGroup>
    <Calendar.Title render={<h2 />} />
    <Calendar.ViewSelect />
  </Calendar.Toolbar>

  <Calendar.Viewport>
    <Calendar.View />
  </Calendar.Viewport>
</Calendar.Root>
```

`Calendar.Root`, `Calendar.Title`, and `Calendar.Viewport` expose Base UI-style
`render` props. `renderEvent` replaces event presentation while receiving the
merged behavioral props and state:

```tsx
<Calendar
  events={events}
  timeZone="Europe/London"
  renderEvent={(props, state) => (
    <button {...props}>
      <span>{state.event.title}</span>
      {state.dragging ? <span>Moving</span> : null}
    </button>
  )}
/>
```

The state is also reflected through `data-*` attributes for Tailwind styling.

## Controlled state

Date, view, and event selection can each be controlled or uncontrolled:

```tsx
<Calendar
  events={events}
  timeZone="Europe/London"
  value={date}
  view={view}
  selectedEventId={selectedEventId}
  onValueChange={setDate}
  onViewChange={setView}
  onSelectedEventIdChange={setSelectedEventId}
/>
```

Change callbacks receive details with a reason, source event, and `cancel()`.
Canceling prevents Chord's uncontrolled state transition:

```tsx
<Calendar
  events={events}
  timeZone="Europe/London"
  onViewChange={(nextView, details) => {
    if (nextView === "agenda" && !canViewAgenda) {
      details.cancel();
    }
  }}
/>
```

## Application mutations

Chord previews pointer interactions and emits a mutation when they commit. The
application owns persistence and decides whether to update optimistically:

- `onEventCreate(draft, details)`
- `onEventMove(mutation, details)`
- `onEventResize(mutation, details)`
- `onEventPress(event, details)`

Recurring occurrences may include `seriesId`. Chord preserves that metadata but
does not decide whether a mutation applies to one occurrence or the full series.

## Keyboard interaction

- Arrow keys move between month cells or time slots.
- Home and End move to the start or end of a row or day.
- Page Up and Page Down move month focus by one month.
- Enter or Space creates an event at the focused empty cell or slot.
- Alt plus an arrow moves a focused event.
- Alt plus Shift plus an arrow resizes a focused event.
- Enter opens an event preview, and Escape closes it.

All committed keyboard and pointer mutations are announced through a polite
live region.

## Styling

Calendar uses Chord's grayscale and accent tokens and supports all event color
scales exposed by `CalendarEventColor`. The Root publishes `data-view`,
`data-density`, and `data-editable`; events publish selection, continuation,
dragging, resizing, and all-day state.

Use a fixed or constrained height for week and day views:

```tsx
<Calendar
  className="h-[42rem] min-h-[28rem]"
  events={events}
  timeZone="Europe/London"
/>
```

The week time grid scrolls horizontally on narrow viewports. Month and agenda
remain fluid.

## Testing

```sh
pnpm test
pnpm test:e2e
pnpm build
```

The unit suite covers date ranges, DST transitions, overlap geometry, and
controlled state. Browser tests cover view changes, keyboard creation, event
previews, accessibility scans, responsive rendering, and visual snapshots.
