import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "@/helpers/classname-helper";

const Root = BaseMenu.Root;
const Trigger = BaseMenu.Trigger;
const Portal = BaseMenu.Portal;
const Group = BaseMenu.Group;
const RadioGroup = BaseMenu.RadioGroup;
const SubmenuRoot = BaseMenu.SubmenuRoot;

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseMenu.Positioner>) => (
  <BaseMenu.Positioner
    className={cn("z-50 outline-none", className)}
    sideOffset={sideOffset}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup>) => (
  <BaseMenu.Popup
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

const itemClasses =
  "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-grayscale-11 outline-none data-[highlighted]:bg-grayscale-3 data-[disabled]:text-grayscale-9 data-[disabled]:pointer-events-none dark:data-[highlighted]:bg-grayscale-3";

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Item>) => (
  <BaseMenu.Item className={cn(itemClasses, className)} {...props} />
);

const Separator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) => (
  <BaseMenu.Separator
    className={cn("my-1 h-px bg-grayscale-3 dark:bg-grayscale-4", className)}
    {...props}
  />
);

const GroupLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel>) => (
  <BaseMenu.GroupLabel
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
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) => (
  <BaseMenu.CheckboxItem
    className={cn(itemClasses, "justify-between", className)}
    {...props}
  />
);

const CheckboxItemIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItemIndicator>) => (
  <BaseMenu.CheckboxItemIndicator
    className={cn("text-accent-9", className)}
    {...props}
  />
);

const RadioItem = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) => (
  <BaseMenu.RadioItem
    className={cn(itemClasses, "justify-between", className)}
    {...props}
  />
);

const RadioItemIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItemIndicator>) => (
  <BaseMenu.RadioItemIndicator
    className={cn("text-accent-9", className)}
    {...props}
  />
);

const SubmenuTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) => (
  <BaseMenu.SubmenuTrigger
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
}: React.ComponentProps<typeof BaseMenu.Arrow>) => (
  <BaseMenu.Arrow className={cn("text-grayscale-1", className)} {...props} />
);

export const DropdownMenu = {
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
