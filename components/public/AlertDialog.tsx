import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "@/helpers/classname-helper";

const Root = BaseAlertDialog.Root;
const Trigger = BaseAlertDialog.Trigger;
const Close = BaseAlertDialog.Close;
const Portal = BaseAlertDialog.Portal;

const Backdrop = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) => (
  <BaseAlertDialog.Backdrop
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
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) => (
  <BaseAlertDialog.Popup
    className={cn(
      "medium-shadow fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
      "flex flex-col gap-1 rounded-xl border border-grayscale-3 bg-grayscale-1 p-4",
      "transition-[transform,opacity] duration-150 ease-out motion-reduce:transition-none",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  >
    {children}
  </BaseAlertDialog.Popup>
);

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) => (
  <BaseAlertDialog.Title
    className={cn("text-sm font-medium text-grayscale-12", className)}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) => (
  <BaseAlertDialog.Description
    className={cn("text-sm text-grayscale-10 text-balance", className)}
    {...props}
  />
);

export const AlertDialog = {
  Root,
  Trigger,
  Close,
  Portal,
  Backdrop,
  Popup,
  Title,
  Description,
};
