import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import {
  CaretUpDownIcon,
  CheckIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

const Root = BaseCombobox.Root;
const Portal = BaseCombobox.Portal;
const List = BaseCombobox.List;
const Group = BaseCombobox.Group;
const Value = BaseCombobox.Value;
const Status = BaseCombobox.Status;

const Input = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input>) => (
  <BaseCombobox.Input
    className={cn(
      "h-7 w-full rounded-lg border border-b-2 border-grayscale-4 bg-grayscale-1 px-2 pr-14 text-sm text-grayscale-12 transition-colors outline-none",
      "placeholder:text-grayscale-9",
      "hover:border-grayscale-5",
      "focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Trigger>) => (
  <BaseCombobox.Trigger
    className={cn(
      "flex size-5 cursor-pointer items-center justify-center rounded-md text-grayscale-10 transition-colors outline-none hover:text-grayscale-12",
      className,
    )}
    {...props}
  />
);

const Icon = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Icon>) => (
  <BaseCombobox.Icon className={cn("flex", className)} {...props}>
    <CaretUpDownIcon size={14} weight="bold" />
  </BaseCombobox.Icon>
);

const Clear = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Clear>) => (
  <BaseCombobox.Clear
    className={cn(
      "flex size-5 cursor-pointer items-center justify-center rounded-md text-grayscale-10 transition-colors outline-none hover:text-grayscale-12",
      className,
    )}
    {...props}
  >
    <XIcon size={13} weight="bold" />
  </BaseCombobox.Clear>
);

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Positioner>) => (
  <BaseCombobox.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup>) => (
  <BaseCombobox.Popup
    className={cn(
      "max-h-64 w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-grayscale-4 bg-grayscale-1 p-1 medium-shadow outline-none dark:bg-grayscale-2",
      "origin-[var(--transform-origin)] transition-all duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      className,
    )}
    {...props}
  />
);

const Item = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Item>) => (
  <BaseCombobox.Item
    className={cn(
      "flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 text-sm text-grayscale-11 select-none outline-none",
      "data-[highlighted]:bg-grayscale-3 data-[highlighted]:text-grayscale-12",
      "data-[selected]:text-grayscale-12",
      className,
    )}
    {...props}
  >
    <span className="truncate">{children}</span>
    <BaseCombobox.ItemIndicator className="flex text-accent-9">
      <CheckIcon size={13} weight="bold" />
    </BaseCombobox.ItemIndicator>
  </BaseCombobox.Item>
);

const Empty = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Empty>) => (
  <BaseCombobox.Empty
    className={cn(
      "px-2 py-2 text-sm text-grayscale-10 empty:hidden",
      className,
    )}
    {...props}
  />
);

const GroupLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCombobox.GroupLabel>) => (
  <BaseCombobox.GroupLabel
    className={cn(
      "px-2 py-1 text-tiny font-medium tracking-wide text-grayscale-10 uppercase",
      className,
    )}
    {...props}
  />
);

export const Combobox = {
  Root,
  Input,
  Trigger,
  Icon,
  Clear,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  Empty,
  Group,
  GroupLabel,
  Value,
  Status,
};
