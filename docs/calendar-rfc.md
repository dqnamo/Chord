# Chord Calendar RFC

## Status

Accepted for the first stable release.

## Product boundary

Chord Calendar is a reusable calendar presentation and interaction system. It
owns visible-range calculation, event layout, calendar navigation, selection,
dragging, resizing, keyboard interaction, locale and time-zone presentation,
and accessible announcements.

Applications own persistence, authorization, invitations, notifications,
availability rules, recurrence-rule expansion, and third-party calendar sync.
Recurring occurrences can carry `seriesId` metadata so applications can decide
whether an action applies to one occurrence or a series.

## Stable feature set

- Month, week, day, and agenda views.
- Timed, all-day, multi-day, overlapping, and recurring event occurrences.
- Controlled and uncontrolled date, view, and event selection state.
- Mouse, touch, and keyboard selection, creation, movement, and resizing.
- Configurable locale, time zone, week start, visible hours, snap interval, and
  density.
- Base UI-style compound parts, render props, state data attributes, and
  cancellable change details.
- Responsive layouts, RTL support, dark mode, reduced motion, and high contrast.
- Pure date and layout modules with unit tests, component interaction tests,
  browser tests, accessibility scans, and visual snapshots.

## Deliberate non-goals

- Persistence or optimistic cache management.
- Google Calendar, Microsoft 365, CalDAV, or ICS synchronization.
- Recurrence-rule authoring or expansion.
- Resource timelines, room scheduling, availability search, or permissions.

## Event semantics

Timed events use absolute ISO 8601 values or JavaScript `Date` instances.
They are converted to the configured display time zone before layout.

All-day events use `YYYY-MM-DD` date-only strings. Their end is exclusive, so an
event occupying one day starts on `2026-07-30` and ends on `2026-07-31`.

Event identity is stable through `id`. `calendarId`, `seriesId`, `color`, and
application-defined `data` remain attached to all callback payloads.

## Change lifecycle

Pointer and keyboard interactions create an internal preview. A public mutation
callback fires only when the interaction commits. Every callback receives
details containing a reason, source event, and `cancel()` method. Canceling
keeps the calendar at its previous controlled or uncontrolled state.

## Accessibility contract

The month view follows the WAI-ARIA layout-grid keyboard model. Time grids use
one tab stop with roving focus between days and slots. Events are reachable
without traversing every empty slot. Every pointer action has a keyboard
equivalent, and committed moves and resizes are announced through a polite live
region.

## Performance contract

Event normalization is memoized by the event collection and time zone, while
each view filters and lays out only its active range. Applications should pass
the relevant event window instead of an unbounded event history. Pure layout
functions are deterministic. Drag feedback uses transforms and pointer capture,
and does not update inherited CSS custom properties on every pointer movement.
Agenda rendering may virtualize large ranges; fixed month and week ranges do
not virtualize without benchmark evidence.
