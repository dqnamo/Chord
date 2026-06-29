import { cn } from "@/helpers/classname-helper";

export default function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: consumers associate via htmlFor / nesting
    <label
      className={cn(
        "text-sm font-medium text-grayscale-11 select-none",
        className,
      )}
      {...props}
    />
  );
}
