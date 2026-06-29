import { cn } from "@/helpers/classname-helper";

export default function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-grayscale-3 dark:bg-grayscale-4",
        className,
      )}
      {...props}
    />
  );
}
