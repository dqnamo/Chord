import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/helpers/classname-helper";

export const cardVariants = cva("", {
  variants: {
    layer: {
      0: "w-full rounded-xl border border-grayscale-3 bg-grayscale-2 p-1.5",
      1: "small-shadow flex min-w-0 cursor-pointer flex-col gap-1 rounded-lg border border-grayscale-3 bg-grayscale-1 transition-colors dark:border-grayscale-5 dark:bg-grayscale-3",
    },
    hoverable: {
      true: null,
      false: null,
    },
  },
  compoundVariants: [
    {
      layer: 1,
      hoverable: true,
      class:
        "hover:border-grayscale-4 hover:bg-grayscale-2 dark:hover:border-grayscale-6 dark:hover:bg-grayscale-4",
    },
  ],
  defaultVariants: {
    layer: 0,
    hoverable: false,
  },
});

type CardVariantProps = VariantProps<typeof cardVariants>;

export type CardLayer = NonNullable<CardVariantProps["layer"]>;

export type CardProps = React.ComponentProps<"div"> & {
  layer?: CardLayer;
  hoverable?: boolean;
};

export default function Card({
  layer = 0,
  hoverable = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ layer, hoverable }), className)}
      {...props}
    />
  );
}
