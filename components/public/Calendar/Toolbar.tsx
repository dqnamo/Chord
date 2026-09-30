"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { useRender } from "@base-ui/react/use-render";
import { CalendarBlankIcon } from "@phosphor-icons/react/dist/csr/CalendarBlank";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import { ClockIcon } from "@phosphor-icons/react/dist/csr/Clock";
import { ListBulletsIcon } from "@phosphor-icons/react/dist/csr/ListBullets";
import { RowsIcon } from "@phosphor-icons/react/dist/csr/Rows";

import { cn } from "@/helpers/classname-helper";

import { useCalendarContext } from "./context";
import { formatDateTitle, navigateDate, toCalendarDateValue } from "./date";
import type { CalendarView } from "./types";

const controlClasses =
  "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium text-grayscale-11 outline-none transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] enabled:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-accent-8 focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none";

export function CalendarToolbar({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Root>) {
  return (
    <BaseToolbar.Root
      aria-label="Calendar navigation"
      className={cn(
        "flex min-h-13 flex-wrap items-center justify-between gap-2 border-grayscale-3 border-b bg-grayscale-1/70 px-2.5 py-2 backdrop-blur-md dark:border-grayscale-4 dark:bg-grayscale-2/70",
        className,
      )}
      {...props}
    />
  );
}

export function CalendarToolbarGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

type NavigationButtonProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Button>,
  "onClick"
>;

export function CalendarPrevious({
  className,
  children,
  ...props
}: NavigationButtonProps) {
  const context = useCalendarContext();

  return (
    <BaseToolbar.Button
      aria-label="Previous period"
      className={cn(controlClasses, "w-8 px-0", className)}
      onClick={(event) =>
        context.setDate(
          navigateDate(context.date, context.view, -1, context.agendaDays),
          "previous-press",
          event.nativeEvent,
        )
      }
      {...props}
    >
      {children ?? <CaretLeftIcon aria-hidden="true" size={15} weight="bold" />}
    </BaseToolbar.Button>
  );
}

export function CalendarNext({
  className,
  children,
  ...props
}: NavigationButtonProps) {
  const context = useCalendarContext();

  return (
    <BaseToolbar.Button
      aria-label="Next period"
      className={cn(controlClasses, "w-8 px-0", className)}
      onClick={(event) =>
        context.setDate(
          navigateDate(context.date, context.view, 1, context.agendaDays),
          "next-press",
          event.nativeEvent,
        )
      }
      {...props}
    >
      {children ?? (
        <CaretRightIcon aria-hidden="true" size={15} weight="bold" />
      )}
    </BaseToolbar.Button>
  );
}

export function CalendarToday({
  className,
  children = "Today",
  ...props
}: NavigationButtonProps) {
  const context = useCalendarContext();

  return (
    <BaseToolbar.Button
      className={cn(controlClasses, "hover:bg-grayscale-3", className)}
      onClick={(event) =>
        context.setDate(
          toCalendarDateValue(new Date(), context.timeZone),
          "today-press",
          event.nativeEvent,
        )
      }
      {...props}
    >
      {children}
    </BaseToolbar.Button>
  );
}

type CalendarTitleState = {
  view: CalendarView;
};

export function CalendarTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h2", CalendarTitleState>) {
  const context = useCalendarContext();

  return useRender({
    defaultTagName: "h2",
    render,
    state: { view: context.view },
    props: {
      className: cn(
        "min-w-0 truncate px-1 text-sm font-semibold tracking-[-0.01em] text-grayscale-12 sm:text-base",
        className,
      ),
      children: formatDateTitle(
        context.date,
        context.view,
        context.locale,
        context.timeZone,
      ),
      ...props,
    },
  });
}

const views: Array<{
  value: CalendarView;
  label: string;
  icon: typeof CalendarBlankIcon;
}> = [
  { value: "month", label: "Month", icon: CalendarBlankIcon },
  { value: "week", label: "Week", icon: RowsIcon },
  { value: "day", label: "Day", icon: ClockIcon },
  { value: "agenda", label: "Agenda", icon: ListBulletsIcon },
];

export function CalendarViewSelect({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof ToggleGroup<CalendarView>>,
  "onValueChange" | "value"
>) {
  const context = useCalendarContext();

  return (
    <ToggleGroup
      aria-label="Calendar view"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-xl border border-grayscale-3 bg-grayscale-0 p-0.5 dark:border-grayscale-4 dark:bg-grayscale-3",
        className,
      )}
      onValueChange={(nextValue, details) => {
        const nextView = nextValue[0];
        if (nextView) {
          context.setView(nextView, "view-change", details.event);
        }
      }}
      value={[context.view]}
      {...props}
    >
      {views.map(({ value, label, icon: Icon }) => (
        <Toggle
          aria-label={`${label} view`}
          className={cn(
            controlClasses,
            "h-7 rounded-[0.55rem] px-2 text-grayscale-11 data-[pressed]:bg-grayscale-3 data-[pressed]:text-grayscale-12 dark:data-[pressed]:bg-grayscale-5",
          )}
          key={value}
          title={`${label} view`}
          value={value}
        >
          <Icon aria-hidden="true" size={14} weight="bold" />
          <span className="hidden lg:inline">{label}</span>
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

export function DefaultCalendarToolbar() {
  return (
    <CalendarToolbar>
      <CalendarToolbarGroup>
        <CalendarPrevious />
        <CalendarToday />
        <CalendarNext />
      </CalendarToolbarGroup>
      <CalendarTitle />
      <CalendarViewSelect />
    </CalendarToolbar>
  );
}
