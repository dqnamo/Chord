import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Root>) => (
  <BaseAvatar.Root
    className={cn(
      "grid size-9 place-items-center overflow-hidden rounded-full bg-grayscale-3 text-xs font-medium text-grayscale-11 dark:bg-grayscale-4",
      className,
    )}
    {...props}
  />
);

const Image = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Image>) => (
  <BaseAvatar.Image
    className={cn("size-full object-cover", className)}
    {...props}
  />
);

const Fallback = BaseAvatar.Fallback;

export const Avatar = { Root, Image, Fallback };
