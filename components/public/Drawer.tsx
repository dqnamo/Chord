import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { cn } from "@/helpers/classname-helper";

const Provider = BaseDrawer.Provider;
const Root = BaseDrawer.Root;
const Trigger = BaseDrawer.Trigger;
const Close = BaseDrawer.Close;
const Portal = BaseDrawer.Portal;
const Content = BaseDrawer.Content;
const SwipeArea = BaseDrawer.SwipeArea;

const Backdrop = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Backdrop>) => (
  <BaseDrawer.Backdrop
    className={cn(
      "fixed inset-0 z-50 bg-grayscale-1/70 backdrop-blur-[2px] transition-opacity duration-150",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "dark:bg-black/60",
      className,
    )}
    {...props}
  />
);

const Popup = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Popup>) => (
  <BaseDrawer.Popup
    className={cn(
      "medium-shadow fixed inset-y-0 right-0 z-50 w-80 max-w-full",
      "flex flex-col gap-1 border-l border-grayscale-3 bg-grayscale-1 p-4",
      "transition-transform duration-200 ease-out",
      "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  >
    {children}
  </BaseDrawer.Popup>
);

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) => (
  <BaseDrawer.Title
    className={cn("text-sm font-medium text-grayscale-12", className)}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Description>) => (
  <BaseDrawer.Description
    className={cn("text-sm text-grayscale-10 text-balance", className)}
    {...props}
  />
);

export const Drawer = {
  Provider,
  Root,
  Trigger,
  Close,
  Portal,
  Backdrop,
  Popup,
  Content,
  SwipeArea,
  Title,
  Description,
};
