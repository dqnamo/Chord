import { cn } from "@/helpers/classname-helper";

const Root = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Media = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex size-9 shrink-0 items-center justify-center rounded-md border border-grayscale-3 bg-grayscale-1 text-grayscale-11 dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Content = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
    {...props}
  />
);

const Title = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("truncate text-sm text-grayscale-12", className)}
    {...props}
  />
);

const Description = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("truncate text-xs text-grayscale-10", className)}
    {...props}
  />
);

const Actions = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex shrink-0 items-center gap-2", className)}
    {...props}
  />
);

export const Item = {
  Root,
  Media,
  Content,
  Title,
  Description,
  Actions,
};
