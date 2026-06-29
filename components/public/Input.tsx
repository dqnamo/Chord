import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@/helpers/classname-helper";

export default function Input({
  className,
  ...props
}: React.ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      className={cn(
        "h-7 w-full rounded-lg border border-b-2 border-grayscale-4 bg-grayscale-1 px-2 text-sm text-grayscale-12 transition-colors outline-none",
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
