"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cn } from "@/helpers/classname-helper";

export default function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof BaseToggle>) {
  return (
    <BaseToggle
      className={cn(
        "inline-flex h-7 cursor-pointer items-center justify-center rounded-md border border-grayscale-3 bg-grayscale-1 px-2 text-sm text-grayscale-11 transition-colors outline-none",
        "hover:bg-grayscale-2",
        "focus-visible:ring-2 focus-visible:ring-accent-4",
        "data-[pressed]:bg-grayscale-3 data-[pressed]:text-grayscale-12",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-grayscale-4 dark:bg-grayscale-2 dark:hover:bg-grayscale-3 dark:data-[pressed]:bg-grayscale-4",
        className,
      )}
      {...props}
    />
  );
}
