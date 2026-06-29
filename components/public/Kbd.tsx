import { cn } from "@/helpers/classname-helper";

export default function Kbd({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center rounded-md border border-b-2 border-grayscale-4 bg-grayscale-1 px-1.5 font-mono text-tiny text-grayscale-11 dark:bg-grayscale-2 dark:border-grayscale-5",
        className,
      )}
      {...props}
    />
  );
}
