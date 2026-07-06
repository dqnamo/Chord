import { cn } from "@/helpers/classname-helper";

type ButtonSharedProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

type ButtonProps =
  | (ButtonSharedProps & React.ComponentPropsWithoutRef<"button">)
  | (ButtonSharedProps &
      React.ComponentPropsWithoutRef<"a"> & {
        href: string;
      });

export default function Button(props: ButtonProps) {
  const { variant = "primary", className } = props;
  const baseClasses =
    "flex cursor-pointer gap-1.5 rounded-lg border border-b-2 px-2 py-1 text-sm font-medium transition-colors";

  const variantClasses = {
    primary:
      "border-black bg-grayscale-12 text-grayscale-2 dark:border-grayscale-6 dark:bg-grayscale-5 dark:text-grayscale-11 dark:hover:border-grayscale-7 dark:hover:bg-grayscale-6",
    secondary:
      "border-grayscale-3 bg-white text-grayscale-11 hover:border-grayscale-4 hover:bg-grayscale-2 dark:border-grayscale-4 dark:bg-grayscale-3 dark:hover:border-grayscale-5 dark:hover:bg-grayscale-4",
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  if ("href" in props) {
    const {
      variant: _variant,
      className: _className,
      children,
      ...anchorProps
    } = props;

    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    variant: _variant,
    className: _className,
    children,
    ...buttonProps
  } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
