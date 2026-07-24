import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadioGroup>) => (
  <BaseRadioGroup className={cn("flex flex-col gap-2", className)} {...props} />
);

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof Radio.Root>) => (
  <Radio.Root
    className={cn(
      "grid size-4 cursor-pointer place-items-center rounded-full border border-grayscale-5 bg-grayscale-1 transition-colors outline-none",
      "hover:border-grayscale-7",
      "focus-visible:ring-2 focus-visible:ring-accent-4",
      "data-[checked]:border-accent-9",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "dark:bg-grayscale-3",
      className,
    )}
    {...props}
  >
    <Radio.Indicator className="size-2 rounded-full bg-accent-9 transition-[transform,opacity] duration-150 ease-out data-[unchecked]:scale-90 data-[unchecked]:opacity-0 motion-reduce:transition-none" />
  </Radio.Root>
);

export const RadioGroup = {
  Root,
  Item,
};
