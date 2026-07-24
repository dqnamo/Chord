"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

export default function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "group flex size-4 cursor-pointer items-center justify-center rounded-md border border-grayscale-5 bg-grayscale-1 text-grayscale-1 transition-colors outline-none",
        "hover:border-grayscale-7",
        "focus-visible:ring-2 focus-visible:ring-accent-4",
        "data-[checked]:border-accent-9 data-[checked]:bg-accent-9",
        "data-[indeterminate]:border-accent-9 data-[indeterminate]:bg-accent-9",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-grayscale-3",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex data-[unchecked]:hidden">
        <CheckIcon
          size={12}
          weight="bold"
          className="group-data-[indeterminate]:hidden"
        />
        <MinusIcon
          size={12}
          weight="bold"
          className="hidden group-data-[indeterminate]:block"
        />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
