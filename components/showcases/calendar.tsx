import CalendarCompositionDemo from "@/components/showcases/demos/CalendarCompositionDemo";
import CalendarDemo from "@/components/showcases/demos/CalendarDemo";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "calendar",
  title: "The Calendar",
  category: "Data Display",
  file: "Calendar/index.tsx",
  files: [
    "Calendar/index.tsx",
    "Calendar/types.ts",
    "Calendar/context.tsx",
    "Calendar/date.ts",
    "Calendar/layout.ts",
    "Calendar/Root.tsx",
    "Calendar/Toolbar.tsx",
    "Calendar/Event.tsx",
    "Calendar/Month.tsx",
    "Calendar/TimeGrid.tsx",
    "Calendar/Views.tsx",
  ],
  usage: `import {
  Calendar,
  type CalendarEvent,
} from "@/components/public/Calendar";

const events: CalendarEvent[] = [
  {
    id: "design-review",
    title: "Design review",
    start: "2026-07-30T08:00:00Z",
    end: "2026-07-30T09:00:00Z",
    color: "blue",
  },
];

<Calendar
  defaultValue="2026-07-30"
  defaultView="week"
  events={events}
  onEventCreate={(draft) => createEvent(draft)}
  onEventMove={(mutation) => saveEvent(mutation)}
  onEventResize={(mutation) => saveEvent(mutation)}
  timeZone="Europe/London"
/>`,
  previewTabs: [
    {
      value: "interactive",
      label: "Interactive",
      description: "Create, move, resize, navigate, and switch views.",
      content: <CalendarDemo testId="calendar-demo" />,
    },
    {
      value: "compact",
      label: "Compact",
      description: "A denser work-week calendar.",
      content: (
        <CalendarDemo
          defaultView="month"
          density="compact"
          showWeekends={false}
          testId="calendar-compact-demo"
        />
      ),
    },
  ],
  examples: [
    {
      id: "calendar-composition",
      title: "Compound composition",
      description:
        "Assemble the toolbar and active view from the same parts used by the default Calendar.",
      sourceFile: "components/showcases/demos/CalendarCompositionDemo.tsx",
      content: <CalendarCompositionDemo />,
    },
  ],
};

export default showcase;
