import { cn } from "@/helpers/classname-helper";

const Root = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex items-center gap-1.5 rounded-lg border border-grayscale-4 bg-grayscale-1 px-2 transition-colors",
      "focus-within:border-accent-8 focus-within:ring-2 focus-within:ring-accent-4",
      "dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Addon = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    className={cn(
      "flex shrink-0 items-center text-sm text-grayscale-9",
      className,
    )}
    {...props}
  />
);

const Field = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    className={cn(
      "h-7 w-full min-w-0 border-none bg-transparent text-sm text-grayscale-12 outline-none",
      "placeholder:text-grayscale-9",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

export const InputGroup = {
  Root,
  Addon,
  Field,
};
