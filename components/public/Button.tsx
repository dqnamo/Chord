"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/helpers/classname-helper";

export const buttonVariants = cva(
  [
    "inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-2 text-sm font-medium outline-none",
    "transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100",
    "focus-visible:border-accent-8 focus-visible:ring-2 focus-visible:ring-accent-4",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:active:scale-100",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-black bg-grayscale-12 text-grayscale-2 hover:border-grayscale-11 hover:bg-grayscale-11 dark:border-grayscale-6 dark:bg-grayscale-5 dark:text-grayscale-11 dark:hover:border-grayscale-7 dark:hover:bg-grayscale-6",
        secondary:
          "border-grayscale-3 bg-white text-grayscale-11 hover:border-grayscale-4 hover:bg-grayscale-2 dark:border-grayscale-4 dark:bg-grayscale-3 dark:hover:border-grayscale-5 dark:hover:bg-grayscale-4",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonVariant = NonNullable<ButtonVariantProps["variant"]>;

type ButtonSharedProps = {
  variant?: ButtonVariant;
};

export type ButtonProps = React.ComponentProps<typeof BaseButton> &
  ButtonSharedProps;

export type ButtonLinkProps = React.ComponentProps<"a"> & ButtonSharedProps;

function getButtonClassName(
  variant: ButtonVariant,
  className: string | undefined,
) {
  return cn(buttonVariants({ variant }), className);
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes =
    typeof className === "function"
      ? (state: BaseButton.State) =>
          getButtonClassName(variant, className(state))
      : getButtonClassName(variant, className);

  return <BaseButton className={classes} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return <a className={getButtonClassName(variant, className)} {...props} />;
}
