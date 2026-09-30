"use client";

import { Calendar } from "@/components/public/Calendar";

export default function CalendarCompositionDemo() {
  return (
    <Calendar.Root
      className="h-80 w-full max-w-3xl"
      defaultValue="2026-07-30"
      defaultView="agenda"
      events={[]}
      timeZone="Europe/London"
    >
      <Calendar.Toolbar>
        <Calendar.ToolbarGroup>
          <Calendar.Previous />
          <Calendar.Today />
          <Calendar.Next />
        </Calendar.ToolbarGroup>
        {/* biome-ignore lint/a11y/useHeadingContent: Calendar.Title supplies the current dynamic title through the render prop. */}
        <Calendar.Title render={<h3 />} />
        <Calendar.ViewSelect />
      </Calendar.Toolbar>
      <Calendar.Viewport>
        <Calendar.View />
      </Calendar.Viewport>
    </Calendar.Root>
  );
}
