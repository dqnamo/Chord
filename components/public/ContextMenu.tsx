import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { cn } from "@/helpers/classname-helper";

const Root = BaseContextMenu.Root;
const Trigger = BaseContextMenu.Trigger;
const Portal = BaseContextMenu.Portal;
const Group = BaseContextMenu.Group;
const RadioGroup = BaseContextMenu.RadioGroup;
const SubmenuRoot = BaseContextMenu.SubmenuRoot;

const Positioner = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Positioner>) => (
  <BaseContextMenu.Positioner
    className={cn("z-50 outline-none", className)}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Popup>) => (
  <BaseContextMenu.Popup
    className={cn(
      "medium-shadow min-w-44 rounded-lg border border-grayscale-3 bg-grayscale-1 p-1",
      "origin-[var(--transform-origin)] transition-all duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const itemClasses =
  "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-grayscale-11 outline-none data-[highlighted]:bg-grayscale-3 data-[disabled]:text-grayscale-9 data-[disabled]:pointer-events-none dark:data-[highlighted]:bg-grayscale-3";

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Item>) => (
  <BaseContextMenu.Item className={cn(itemClasses, className)} {...props} />
);

const Separator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Separator>) => (
  <BaseContextMenu.Separator
    className={cn("my-1 h-px bg-grayscale-3 dark:bg-grayscale-4", className)}
    {...props}
  />
);

const GroupLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.GroupLabel>) => (
  <BaseContextMenu.GroupLabel
    className={cn(
      "px-2 py-1 font-mono text-tiny uppercase tracking-wide text-grayscale-10",
      className,
    )}
    {...props}
  />
);

const CheckboxItem = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.CheckboxItem>) => (
  <BaseContextMenu.CheckboxItem
    className={cn(itemClasses, "justify-between", className)}
    {...props}
  />
);

const CheckboxItemIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.CheckboxItemIndicator>) => (
  <BaseContextMenu.CheckboxItemIndicator
    className={cn("text-accent-9", className)}
    {...props}
  />
);

const RadioItem = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.RadioItem>) => (
  <BaseContextMenu.RadioItem
    className={cn(itemClasses, "justify-between", className)}
    {...props}
  />
);

const RadioItemIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.RadioItemIndicator>) => (
  <BaseContextMenu.RadioItemIndicator
    className={cn("text-accent-9", className)}
    {...props}
  />
);

const SubmenuTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.SubmenuTrigger>) => (
  <BaseContextMenu.SubmenuTrigger
    className={cn(
      itemClasses,
      "justify-between data-[popup-open]:bg-grayscale-3",
      className,
    )}
    {...props}
  />
);

const Arrow = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Arrow>) => (
  <BaseContextMenu.Arrow
    className={cn("text-grayscale-1", className)}
    {...props}
  />
);

export const ContextMenu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  Separator,
  Group,
  GroupLabel,
  CheckboxItem,
  CheckboxItemIndicator,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
  SubmenuRoot,
  SubmenuTrigger,
  Arrow,
};
