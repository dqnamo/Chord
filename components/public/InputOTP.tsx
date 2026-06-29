import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseOTPField.Root>) => (
  <BaseOTPField.Root
    className={cn("flex items-center gap-1.5", className)}
    {...props}
  />
);

const Input = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseOTPField.Input>) => (
  <BaseOTPField.Input
    className={cn(
      "size-9 rounded-lg border border-b-2 border-grayscale-4 bg-grayscale-1 text-center text-sm text-grayscale-12 transition-colors outline-none",
      "hover:border-grayscale-5",
      "focus-within:border-accent-8 focus-within:ring-2 focus-within:ring-accent-4",
      "focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Separator = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseOTPField.Separator>) => (
  <BaseOTPField.Separator
    className={cn("text-grayscale-9 select-none", className)}
    {...props}
  />
);

export const InputOTP = {
  Root,
  Input,
  Separator,
};
