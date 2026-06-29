import { cn } from "@/helpers/classname-helper";

type BadgeProps = {
  variant?: "secondary" | "accent" | "outline" | "solid";
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<"span">;

export default function Badge({
  variant = "secondary",
  className,
  children,
  ...props
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-tiny font-medium leading-none";

  const variantClasses = {
    secondary: "border-grayscale-4 bg-grayscale-2 text-grayscale-11",
    accent: "border-accent-6 bg-accent-3 text-accent-11",
    outline: "border-grayscale-5 bg-transparent text-grayscale-11",
    solid: "border-accent-9 bg-accent-9 text-white",
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
