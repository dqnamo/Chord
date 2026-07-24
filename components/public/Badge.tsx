import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/helpers/classname-helper";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-1.5 py-0.5 text-xs font-medium leading-none",
  {
    variants: {
      variant: {
        secondary: "border-grayscale-4 bg-grayscale-2 text-grayscale-11",
        accent: "border-accent-6 bg-accent-3 text-accent-11",
        outline: "border-grayscale-5 bg-transparent text-grayscale-11",
        solid: "border-accent-9 bg-accent-9 text-white",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export type BadgeVariant = NonNullable<BadgeVariantProps["variant"]>;

export type BadgeProps = React.ComponentProps<"span"> & {
  variant?: BadgeVariant;
};

export default function Badge({
  variant = "secondary",
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
