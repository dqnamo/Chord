import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { cn } from "@/helpers/classname-helper";

const Portal = BaseNavigationMenu.Portal;

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Root>) => (
  <BaseNavigationMenu.Root className={cn("relative", className)} {...props} />
);

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.List>) => (
  <BaseNavigationMenu.List
    className={cn(
      "flex items-center gap-0.5 rounded-lg border border-grayscale-3 bg-grayscale-1 p-1",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Item = BaseNavigationMenu.Item;

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Trigger>) => (
  <BaseNavigationMenu.Trigger
    className={cn(
      "flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm text-grayscale-11 outline-none transition-colors",
      "hover:bg-grayscale-3 data-[popup-open]:bg-grayscale-3",
      "focus-visible:ring-2 focus-visible:ring-accent-4",
      className,
    )}
    {...props}
  />
);

const Icon = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Icon>) => (
  <BaseNavigationMenu.Icon
    className={cn(
      "transition-transform duration-150 ease-out data-[popup-open]:rotate-180 motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
);

const Content = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Content>) => (
  <BaseNavigationMenu.Content
    className={cn(
      "w-52 p-1 transition-opacity duration-150 ease-out",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      className,
    )}
    {...props}
  />
);

const Link = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Link>) => (
  <BaseNavigationMenu.Link
    className={cn(
      "block cursor-pointer rounded-md px-2 py-1.5 text-sm text-grayscale-11 outline-none transition-colors",
      "hover:bg-grayscale-3 focus-visible:bg-grayscale-3",
      className,
    )}
    {...props}
  />
);

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Positioner>) => (
  <BaseNavigationMenu.Positioner
    className={cn("z-50 outline-none", className)}
    sideOffset={sideOffset}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Popup>) => (
  <BaseNavigationMenu.Popup
    className={cn(
      "medium-shadow rounded-lg border border-grayscale-3 bg-grayscale-1",
      "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out motion-reduce:transition-none",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Viewport = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Viewport>) => (
  <BaseNavigationMenu.Viewport
    className={cn("relative overflow-hidden", className)}
    {...props}
  />
);

const Arrow = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Arrow>) => (
  <BaseNavigationMenu.Arrow
    className={cn("text-grayscale-1", className)}
    {...props}
  />
);

export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Link,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Icon,
  Viewport,
};
