import { Menu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenubar>) => (
  <BaseMenubar
    className={cn(
      "flex items-center gap-0.5 rounded-lg border border-grayscale-3 bg-grayscale-1 p-1",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Portal = Menu.Portal;

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Trigger>) => (
  <Menu.Trigger
    className={cn(
      "flex cursor-pointer items-center rounded-md px-2 py-1 text-sm text-grayscale-11 outline-none transition-colors",
      "hover:bg-grayscale-3 data-[popup-open]:bg-grayscale-3",
      "focus-visible:ring-2 focus-visible:ring-accent-4",
      className,
    )}
    {...props}
  />
);

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof Menu.Positioner>) => (
  <Menu.Positioner
    className={cn("z-50 outline-none", className)}
    sideOffset={sideOffset}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Popup>) => (
  <Menu.Popup
    className={cn(
      "medium-shadow min-w-44 rounded-lg border border-grayscale-3 bg-grayscale-1 p-1",
      "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out motion-reduce:transition-none",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Item>) => (
  <Menu.Item
    className={cn(
      "flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 text-sm text-grayscale-11 outline-none",
      "data-[highlighted]:bg-grayscale-3 data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-9",
      className,
    )}
    {...props}
  />
);

const Separator = ({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Separator>) => (
  <Menu.Separator
    className={cn("my-1 h-px bg-grayscale-3 dark:bg-grayscale-4", className)}
    {...props}
  />
);

export const Menubar = {
  Root,
  Menu: Menu.Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  Separator,
};
