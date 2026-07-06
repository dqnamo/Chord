import { cn } from "@/helpers/classname-helper";

type AlertVariant = "default" | "accent";

const variantClasses: Record<AlertVariant, string> = {
  default: "border-grayscale-3 bg-grayscale-2 text-grayscale-11",
  accent: "border-accent-6 bg-accent-2 text-accent-11",
};

const Root = ({
  variant = "default",
  className,
  ...props
}: {
  variant?: AlertVariant;
} & React.ComponentProps<"div">) => (
  <div
    role="alert"
    className={cn(
      "flex gap-2 rounded-lg border p-3",
      variantClasses[variant],
      className,
    )}
    {...props}
  />
);

const Title = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("text-sm font-medium text-grayscale-12", className)}
    {...props}
  />
);

const Description = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("text-xs text-grayscale-10", className)} {...props} />
);

const Content = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex min-w-0 flex-col gap-0.5", className)} {...props} />
);

export const Alert = {
  Root,
  Content,
  Title,
  Description,
};
