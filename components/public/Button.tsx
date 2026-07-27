"use client";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type Key,
  type ReactNode,
} from "react";

import { cn } from "@/helpers/classname-helper";

const layoutTransition = {
  duration: 0.18,
  ease: [0.23, 1, 0.32, 1],
} as const;

export const buttonVariants = cva(
  "h-8 w-max px-3 text-sm rounded-lg inline-flex cursor-pointer items-center gap-1.5 justify-center border border-b-2 font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-accent-8 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-grayscale-12 bg-grayscale-12 dark:bg-grayscale-7 dark:border-grayscale-8 dark:text-grayscale-12 text-grayscale-0 dark:hover:bg-grayscale-8 dark:hover:border-grayscale-10 hover:border-grayscale-11 hover:bg-grayscale-11",
        secondary:
          "border-grayscale-5 dark:border-grayscale-5 bg-grayscale-0 dark:bg-grayscale-4 dark:hover:bg-grayscale-6 text-grayscale-12 hover:bg-grayscale-3 dark:hover:border-grayscale-7",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends Omit<BaseButtonProps, "className" | "render">,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export interface ButtonLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export interface ButtonContentProps {
  children: ReactNode;
  state: Key;
}

export function ButtonContent({ children, state }: ButtonContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1] as const;

  return (
    <span
      className="grid overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={state}
          className="col-start-1 row-start-1 inline-flex items-center justify-center gap-1.5"
          initial={{
            opacity: 0,
            transform: shouldReduceMotion ? "translateY(0)" : "translateY(2px)",
          }}
          animate={{
            opacity: 1,
            transform: "translateY(0)",
          }}
          exit={{
            opacity: 0,
            transform: shouldReduceMotion
              ? "translateY(0)"
              : "translateY(-2px)",
            transition: {
              duration: 0.08,
              ease: easeOut,
            },
          }}
          transition={{
            duration: 0.1,
            ease: easeOut,
          }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const ButtonRoot = forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <BaseButton
      ref={ref}
      render={
        <motion.button
          layout
          transition={{
            layout: layoutTransition,
          }}
        />
      }
      className={cn(
        buttonVariants({ variant }),
        "enabled:active:scale-[0.97]",
        className,
      )}
      {...props}
    />
  ),
);

ButtonRoot.displayName = "Button";

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn(
        buttonVariants({ variant }),
        "active:scale-[0.97]",
        className,
      )}
      {...props}
    />
  ),
);

ButtonLink.displayName = "Button.Link";

const Button = Object.assign(ButtonRoot, {
  Content: ButtonContent,
});

export default Button;
