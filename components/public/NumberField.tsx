import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) => (
  <BaseNumberField.Root className={cn(className)} {...props} />
);

const Group = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Group>) => (
  <BaseNumberField.Group
    className={cn(
      "inline-flex h-7 items-stretch overflow-hidden rounded-lg border border-b-2 border-grayscale-4 bg-grayscale-1 transition-colors",
      "focus-within:border-accent-8 focus-within:ring-2 focus-within:ring-accent-4",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Decrement = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement>) => (
  <BaseNumberField.Decrement
    className={cn(
      "grid w-7 cursor-pointer place-items-center border-r border-grayscale-4 text-grayscale-11 transition-colors outline-none",
      "hover:bg-grayscale-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:hover:bg-grayscale-3",
      className,
    )}
    {...props}
  >
    <MinusIcon size={14} weight="bold" />
  </BaseNumberField.Decrement>
);

const Increment = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment>) => (
  <BaseNumberField.Increment
    className={cn(
      "grid w-7 cursor-pointer place-items-center border-l border-grayscale-4 text-grayscale-11 transition-colors outline-none",
      "hover:bg-grayscale-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:hover:bg-grayscale-3",
      className,
    )}
    {...props}
  >
    <PlusIcon size={14} weight="bold" />
  </BaseNumberField.Increment>
);

const Input = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Input>) => (
  <BaseNumberField.Input
    className={cn(
      "w-14 bg-transparent px-2 text-center text-sm tabular-nums text-grayscale-12 outline-none",
      className,
    )}
    {...props}
  />
);

const ScrubArea = BaseNumberField.ScrubArea;
const ScrubAreaCursor = BaseNumberField.ScrubAreaCursor;

export const NumberField = {
  Root,
  Group,
  Decrement,
  Increment,
  Input,
  ScrubArea,
  ScrubAreaCursor,
};
