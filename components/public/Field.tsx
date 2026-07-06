import { Field as BaseField } from "@base-ui/react/field";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) => (
  <BaseField.Root
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
);

const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) => (
  <BaseField.Label
    className={cn(
      "text-sm font-medium text-grayscale-11 select-none",
      className,
    )}
    {...props}
  />
);

const Control = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Control>) => (
  <BaseField.Control
    className={cn(
      "h-7 w-full rounded-lg border border-grayscale-4 bg-grayscale-1 px-2 text-sm text-grayscale-12 transition-colors outline-none",
      "placeholder:text-grayscale-9",
      "hover:border-grayscale-5",
      "focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[invalid]:border-red-8 data-[invalid]:focus-visible:ring-red-4",
      "dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Description>) => (
  <BaseField.Description
    className={cn("text-xs text-grayscale-10", className)}
    {...props}
  />
);

const FieldError = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Error>) => (
  <BaseField.Error
    className={cn("text-xs text-red-10", className)}
    {...props}
  />
);

export const Field = {
  Root,
  Label,
  Control,
  Description,
  Error: FieldError,
  Validity: BaseField.Validity,
};
