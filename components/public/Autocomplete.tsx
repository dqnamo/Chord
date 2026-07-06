import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

const Root = BaseAutocomplete.Root;
const Portal = BaseAutocomplete.Portal;
const List = BaseAutocomplete.List;
const Row = BaseAutocomplete.Row;
const Collection = BaseAutocomplete.Collection;
const Group = BaseAutocomplete.Group;
const Value = BaseAutocomplete.Value;
const Backdrop = BaseAutocomplete.Backdrop;
const Arrow = BaseAutocomplete.Arrow;

const Input = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Input>) => (
  <BaseAutocomplete.Input
    className={cn(
      "h-7 w-full rounded-lg border border-grayscale-4 bg-grayscale-1 px-2 pr-8 text-sm text-grayscale-12 transition-colors outline-none",
      "placeholder:text-grayscale-9",
      "hover:border-grayscale-5",
      "focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
      "dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Clear = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Clear>) => (
  <BaseAutocomplete.Clear
    className={cn(
      "flex size-5 cursor-pointer items-center justify-center rounded-md text-grayscale-10 transition-colors outline-none hover:text-grayscale-12",
      className,
    )}
    {...props}
  >
    <XIcon size={13} weight="bold" />
  </BaseAutocomplete.Clear>
);

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Positioner>) => (
  <BaseAutocomplete.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
);

const Popup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup>) => (
  <BaseAutocomplete.Popup
    className={cn(
      "max-h-64 w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-grayscale-4 bg-grayscale-1 p-1 medium-shadow outline-none dark:bg-grayscale-2",
      "origin-[var(--transform-origin)] transition-all duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "data-[empty]:hidden",
      className,
    )}
    {...props}
  />
);

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Item>) => (
  <BaseAutocomplete.Item
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-grayscale-11 select-none outline-none",
      "data-[highlighted]:bg-grayscale-3 data-[highlighted]:text-grayscale-12",
      className,
    )}
    {...props}
  />
);

const Empty = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Empty>) => (
  <BaseAutocomplete.Empty
    className={cn(
      "px-2 py-2 text-sm text-grayscale-10 empty:hidden",
      className,
    )}
    {...props}
  />
);

const Status = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Status>) => (
  <BaseAutocomplete.Status
    className={cn(
      "px-2 py-1 text-xs text-grayscale-10 empty:hidden",
      className,
    )}
    {...props}
  />
);

const GroupLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.GroupLabel>) => (
  <BaseAutocomplete.GroupLabel
    className={cn(
      "px-2 py-1 text-tiny font-medium tracking-wide text-grayscale-10 uppercase",
      className,
    )}
    {...props}
  />
);

const Separator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Separator>) => (
  <BaseAutocomplete.Separator
    className={cn("my-1 h-px bg-grayscale-3 dark:bg-grayscale-4", className)}
    {...props}
  />
);

export const Autocomplete = {
  Root,
  Input,
  Clear,
  Portal,
  Backdrop,
  Positioner,
  Popup,
  Arrow,
  List,
  Row,
  Collection,
  Item,
  Empty,
  Status,
  Group,
  GroupLabel,
  Separator,
  Value,
  useFilter: BaseAutocomplete.useFilter,
};
