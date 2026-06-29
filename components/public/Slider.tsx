import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) => (
  <BaseSlider.Root className={cn("w-full", className)} {...props} />
);

const Control = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Control>) => (
  <BaseSlider.Control
    className={cn("flex h-4 w-full items-center", className)}
    {...props}
  />
);

const Track = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Track>) => (
  <BaseSlider.Track
    className={cn(
      "h-1.5 w-full rounded-full bg-grayscale-4 dark:bg-grayscale-5",
      className,
    )}
    {...props}
  />
);

const Indicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Indicator>) => (
  <BaseSlider.Indicator
    className={cn("rounded-full bg-accent-9", className)}
    {...props}
  />
);

const Thumb = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Thumb>) => (
  <BaseSlider.Thumb
    className={cn(
      "small-shadow size-4 cursor-pointer rounded-full border border-grayscale-5 bg-grayscale-1 outline-none transition-colors",
      "focus-visible:ring-2 focus-visible:ring-accent-4",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "dark:bg-grayscale-3",
      className,
    )}
    {...props}
  />
);

const Value = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Value>) => (
  <BaseSlider.Value
    className={cn("text-sm tabular-nums text-grayscale-11", className)}
    {...props}
  />
);

export const Slider = {
  Root,
  Control,
  Track,
  Indicator,
  Thumb,
  Value,
};
