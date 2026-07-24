"use client";

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "@/helpers/classname-helper";

export default function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      className={cn(
        "inline-flex gap-0.5 rounded-lg border border-grayscale-3 bg-grayscale-1 p-0.5",
        "dark:border-grayscale-4 dark:bg-grayscale-2",
        className,
      )}
      {...props}
    />
  );
}
