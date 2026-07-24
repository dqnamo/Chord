import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) => (
  <BaseProgress.Root className={cn("w-full", className)} {...props} />
);

const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Label>) => (
  <BaseProgress.Label
    className={cn("text-xs font-medium text-grayscale-11", className)}
    {...props}
  />
);

const Value = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Value>) => (
  <BaseProgress.Value
    className={cn("text-xs text-grayscale-10", className)}
    {...props}
  />
);

const Track = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Track>) => (
  <BaseProgress.Track
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
}: React.ComponentProps<typeof BaseProgress.Indicator>) => (
  <BaseProgress.Indicator
    className={cn(
      "h-full bg-accent-9 transition-[width] duration-150 ease-out motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
);

export const Progress = { Root, Label, Value, Track, Indicator };
