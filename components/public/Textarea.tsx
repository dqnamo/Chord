import { cn } from "@/helpers/classname-helper";

export default function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-16 w-full rounded-lg border border-b-2 border-grayscale-4 bg-grayscale-1 px-2 py-1.5 text-sm text-grayscale-12 transition-colors outline-none",
        "placeholder:text-grayscale-9",
        "hover:border-grayscale-5",
        "focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-grayscale-4 dark:bg-grayscale-2",
        className,
      )}
      {...props}
    />
  );
}
