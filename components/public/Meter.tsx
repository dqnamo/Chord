import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) => (
  <BaseMeter.Root className={cn("w-full", className)} {...props} />
);

const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Label>) => (
  <BaseMeter.Label
    className={cn("text-xs font-medium text-grayscale-11", className)}
    {...props}
  />
);

const Value = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Value>) => (
  <BaseMeter.Value
    className={cn("text-xs text-grayscale-10", className)}
    {...props}
  />
);

const Track = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Track>) => (
  <BaseMeter.Track
    className={cn(
      "h-1.5 w-full overflow-hidden rounded-full bg-grayscale-4",
      className,
    )}
    {...props}
  />
);

const Indicator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Indicator>) => (
  <BaseMeter.Indicator
    className={cn(
      "h-full bg-accent-9 transition-[width] duration-150 ease-out motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
);

export const Meter = { Root, Label, Value, Track, Indicator };
