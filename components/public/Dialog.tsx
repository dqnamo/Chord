import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/helpers/classname-helper";

const Root = BaseDialog.Root;
const Trigger = BaseDialog.Trigger;
const Close = BaseDialog.Close;
const Portal = BaseDialog.Portal;

const Backdrop = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Backdrop>) => (
  <BaseDialog.Backdrop
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
}: React.ComponentProps<typeof BaseDialog.Popup>) => (
  <BaseDialog.Popup
    className={cn(
      "medium-shadow fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
      "flex flex-col gap-1 rounded-xl border border-grayscale-3 bg-grayscale-1 p-4",
      "transition-all duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  >
    {children}
  </BaseDialog.Popup>
);

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Title>) => (
  <BaseDialog.Title
    className={cn("text-sm font-medium text-grayscale-12", className)}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description>) => (
  <BaseDialog.Description
    className={cn("text-sm text-grayscale-10 text-balance", className)}
    {...props}
  />
);

export const Dialog = {
  Root,
  Trigger,
  Close,
  Portal,
  Backdrop,
  Popup,
  Title,
  Description,
};
