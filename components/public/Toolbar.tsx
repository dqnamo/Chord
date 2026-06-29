import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Root>) => (
  <BaseToolbar.Root
    className={cn(
      "flex items-center gap-1 rounded-lg border border-grayscale-3 bg-grayscale-1 p-1",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Group = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Group>) => (
  <BaseToolbar.Group
    className={cn("flex items-center gap-0.5", className)}
    {...props}
  />
);

const Button = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Button>) => (
  <BaseToolbar.Button
    className={cn(
      "flex h-7 min-w-7 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 text-sm text-grayscale-11 outline-none transition-colors",
      "hover:bg-grayscale-3 focus-visible:ring-2 focus-visible:ring-accent-4",
      "data-[pressed]:bg-grayscale-3 data-[pressed]:text-grayscale-12",
      "data-[disabled]:pointer-events-none data-[disabled]:text-grayscale-9",
      className,
    )}
    {...props}
  />
);

const Link = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Link>) => (
  <BaseToolbar.Link
    className={cn(
      "cursor-pointer rounded-md px-2 py-1 text-sm text-grayscale-10 outline-none transition-colors",
      "hover:text-grayscale-12 focus-visible:ring-2 focus-visible:ring-accent-4",
      className,
    )}
    {...props}
  />
);

const Input = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Input>) => (
  <BaseToolbar.Input
    className={cn(
      "h-7 rounded-md border border-grayscale-3 bg-grayscale-1 px-2 text-sm text-grayscale-12 outline-none transition-colors",
      "placeholder:text-grayscale-9 focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Separator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Separator>) => (
  <BaseToolbar.Separator
    className={cn(
      "mx-1 h-5 w-px bg-grayscale-3 dark:bg-grayscale-4",
      className,
    )}
    {...props}
  />
);

export const Toolbar = {
  Root,
  Button,
  Group,
  Input,
  Link,
  Separator,
};
