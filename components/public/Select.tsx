import { Select as BaseSelect } from "@base-ui/react/select";
import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

const Root = BaseSelect.Root;
const Value = BaseSelect.Value;
const Portal = BaseSelect.Portal;
const Group = BaseSelect.Group;

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) => (
  <BaseSelect.Trigger
    className={cn(
      "flex h-7 min-w-40 cursor-pointer items-center justify-between gap-2 rounded-lg border border-grayscale-4 bg-grayscale-1 px-2 text-sm text-grayscale-12 transition-colors outline-none",
      "hover:border-grayscale-5",
      "focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Icon = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Icon>) => (
  <BaseSelect.Icon className={cn("text-grayscale-10", className)} {...props}>
    <CaretUpDownIcon size={14} weight="bold" />
  </BaseSelect.Icon>
);

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseSelect.Positioner>) => (
  <BaseSelect.Positioner
    className={cn("z-50 outline-none", className)}
    sideOffset={sideOffset}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Popup>) => (
  <BaseSelect.Popup
    className={cn(
      "medium-shadow max-h-[var(--available-height)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-lg border border-grayscale-3 bg-grayscale-1 p-1 transition-[transform,opacity] duration-150 ease-out motion-reduce:transition-none",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const List = BaseSelect.List;

const Item = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) => (
  <BaseSelect.Item
    className={cn(
      "flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 text-sm text-grayscale-12 outline-none transition-colors",
      "data-[highlighted]:bg-grayscale-3",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    <BaseSelect.ItemIndicator className="text-accent-9">
      <CheckIcon size={14} weight="bold" />
    </BaseSelect.ItemIndicator>
  </BaseSelect.Item>
);

const ItemText = BaseSelect.ItemText;
const ItemIndicator = BaseSelect.ItemIndicator;

const GroupLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.GroupLabel>) => (
  <BaseSelect.GroupLabel
    className={cn(
      "px-2 py-1 text-tiny font-medium uppercase tracking-wide text-grayscale-10",
      className,
    )}
    {...props}
  />
);

const Separator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Separator>) => (
  <BaseSelect.Separator
    className={cn("my-1 h-px bg-grayscale-3 dark:bg-grayscale-4", className)}
    {...props}
  />
);

const Arrow = BaseSelect.Arrow;

const ScrollUpArrow = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollUpArrow>) => (
  <BaseSelect.ScrollUpArrow
    className={cn(
      "top-0 z-10 flex h-5 w-full items-center justify-center bg-grayscale-1 text-grayscale-10 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const ScrollDownArrow = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) => (
  <BaseSelect.ScrollDownArrow
    className={cn(
      "bottom-0 z-10 flex h-5 w-full items-center justify-center bg-grayscale-1 text-grayscale-10 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

export const Select = {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  ItemText,
  ItemIndicator,
  Group,
  GroupLabel,
  Separator,
  Arrow,
  ScrollUpArrow,
  ScrollDownArrow,
};
