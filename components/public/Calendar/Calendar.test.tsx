import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Calendar } from ".";

const events = [
  {
    id: "planning",
    title: "Planning",
    start: "2026-07-30T08:00:00Z",
    end: "2026-07-30T09:00:00Z",
    color: "blue" as const,
  },
  {
    id: "launch",
    title: "Launch",
    start: "2026-07-31",
    end: "2026-08-01",
    allDay: true,
  },
];

describe("Calendar", () => {
  it("renders a complete default calendar and switches views", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        defaultValue="2026-07-30"
        events={events}
        timeZone="Europe/London"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "July 2026" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "July 2026" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Planning/ }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Week view" }));

    expect(
      screen.getByRole("grid", { name: "Calendar time grid" }),
    ).toBeInTheDocument();
  });

  it("supports controlled navigation callbacks", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultValue="2026-07-30"
        events={events}
        onValueChange={onValueChange}
        timeZone="Europe/London"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next period" }));

    expect(onValueChange).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { name: "August 2026" }),
    ).toBeInTheDocument();
  });

  it("creates an all-day event from the keyboard", async () => {
    const user = userEvent.setup();
    const onEventCreate = vi.fn();
    render(
      <Calendar
        defaultValue="2026-07-30"
        events={events}
        onEventCreate={onEventCreate}
        timeZone="Europe/London"
      />,
    );

    const day = screen.getByRole("button", {
      name: "Thursday, 30 July 2026",
    });
    day.focus();
    await user.keyboard("{Enter}");

    expect(onEventCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        start: "2026-07-30",
        end: "2026-07-31",
        allDay: true,
      }),
      expect.objectContaining({ reason: "keyboard-create" }),
    );
  });

  it("moves an event from the keyboard", async () => {
    const user = userEvent.setup();
    const onEventMove = vi.fn();
    render(
      <Calendar
        defaultValue="2026-07-30"
        events={events}
        onEventMove={onEventMove}
        timeZone="Europe/London"
      />,
    );

    const planning = screen.getByRole("button", { name: /Planning/ });
    planning.focus();
    await user.keyboard("{Alt>}{ArrowRight}{/Alt}");

    expect(onEventMove).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ id: "planning" }),
      }),
      expect.objectContaining({ reason: "keyboard-move" }),
    );
  });

  it("allows consumers to cancel navigation", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        defaultValue="2026-07-30"
        events={events}
        onValueChange={(_value, details) => details.cancel()}
        timeZone="Europe/London"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next period" }));

    expect(
      screen.getByRole("heading", { name: "July 2026" }),
    ).toBeInTheDocument();
  });

  it("keeps controlled view state with the application", async () => {
    const user = userEvent.setup();
    const onViewChange = vi.fn();
    render(
      <Calendar
        defaultValue="2026-07-30"
        events={events}
        onViewChange={onViewChange}
        timeZone="Europe/London"
        view="month"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Week view" }));

    expect(onViewChange).toHaveBeenCalledWith(
      "week",
      expect.objectContaining({ reason: "view-change" }),
    );
    expect(screen.getByRole("grid", { name: "July 2026" })).toBeInTheDocument();
  });

  it("exposes hidden all-day events through an overflow popover", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        defaultValue="2026-07-30"
        defaultView="week"
        events={[
          {
            id: "first",
            title: "First",
            start: "2026-07-30",
            end: "2026-07-31",
            allDay: true,
          },
          {
            id: "second",
            title: "Second",
            start: "2026-07-30",
            end: "2026-07-31",
            allDay: true,
          },
          {
            id: "third",
            title: "Third",
            start: "2026-07-30",
            end: "2026-07-31",
            allDay: true,
          },
        ]}
        timeZone="Europe/London"
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "1 more event on Thursday, 30 July 2026",
      }),
    );

    expect(
      screen.getByRole("dialog", { name: "Thursday, 30 July 2026" }),
    ).toHaveTextContent("Third");
  });

  it("supports Base UI-style compound composition", () => {
    render(
      <Calendar.Root
        defaultValue="2026-07-30"
        events={events}
        timeZone="Europe/London"
      >
        <Calendar.Toolbar>
          <Calendar.Today />
          {/* biome-ignore lint/a11y/useHeadingContent: Calendar.Title supplies its dynamic accessible content. */}
          <Calendar.Title render={<h3 />} />
        </Calendar.Toolbar>
        <Calendar.Viewport>
          <Calendar.Month />
        </Calendar.Viewport>
      </Calendar.Root>,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "July 2026" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "July 2026" })).toBeInTheDocument();
  });

  it("rejects invalid runtime configuration", () => {
    expect(() =>
      render(
        <Calendar agendaDays={0} events={events} timeZone="Europe/London" />,
      ),
    ).toThrow(/agendaDays/);
  });
});
