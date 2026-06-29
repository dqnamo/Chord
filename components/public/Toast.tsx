import { Toast as BaseToast } from "@base-ui/react/toast";
import { cn } from "@/helpers/classname-helper";

const Provider = BaseToast.Provider;
const Portal = BaseToast.Portal;

const Viewport = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Viewport>) => (
  <BaseToast.Viewport
    className={cn(
      "fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2 outline-none",
      className,
    )}
    {...props}
  />
);

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Root>) => (
  <BaseToast.Root
    className={cn(
      "medium-shadow flex flex-col gap-1 rounded-lg border border-grayscale-3 bg-grayscale-1 p-3",
      "transition-all duration-150 ease-out",
      "data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0",
      "data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0",
      "data-[swiping]:transition-none",
      "data-[swipe-direction=right]:data-[ending-style]:translate-x-full",
      "data-[swipe-direction=left]:data-[ending-style]:-translate-x-full",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Title>) => (
  <BaseToast.Title
    className={cn("text-sm font-medium text-grayscale-12", className)}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Description>) => (
  <BaseToast.Description
    className={cn("text-xs text-grayscale-10", className)}
    {...props}
  />
);

const Action = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Action>) => (
  <BaseToast.Action
    className={cn(
      "mt-1 cursor-pointer self-start rounded-md border border-b-2 border-grayscale-3 bg-grayscale-1 px-2 py-0.5 text-xs font-medium text-grayscale-11 transition-colors hover:bg-grayscale-2 dark:border-grayscale-4 dark:bg-grayscale-3",
      className,
    )}
    {...props}
  />
);

const Close = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Close>) => (
  <BaseToast.Close
    className={cn(
      "absolute top-2 right-2 flex size-5 cursor-pointer items-center justify-center rounded-md text-grayscale-9 transition-colors hover:bg-grayscale-3 hover:text-grayscale-11",
      className,
    )}
    {...props}
  />
);

export const Toast = {
  Provider,
  Portal,
  Viewport,
  Root,
  Title,
  Description,
  Action,
  Close,
  useToastManager: BaseToast.useToastManager,
};
