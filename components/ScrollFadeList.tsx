import type { ReactNode } from "react";
import { ScrollArea } from "@/components/public/ScrollArea";
import { cn } from "@/helpers/classname-helper";

type ScrollFadeListProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function ScrollFadeList({
  children,
  className,
  contentClassName,
}: ScrollFadeListProps) {
  return (
    <ScrollArea.Root
      className={cn("group/scroll-fade h-full min-h-0 w-full", className)}
    >
      <ScrollArea.Viewport
        className={cn(
          "h-full w-full",
          "[mask-image:linear-gradient(to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-y-end,40px))),transparent_100%)] [mask-repeat:no-repeat]",
        )}
      >
        <ScrollArea.Content className={contentClassName}>
          {children}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="z-20 flex w-2 justify-center bg-transparent px-0.5 py-1 opacity-0 transition-opacity duration-150 group-hover/scroll-fade:opacity-100 data-[hovering]:opacity-100 data-[scrolling]:opacity-100">
        <ScrollArea.Thumb className="w-1 rounded-full bg-grayscale-5 transition-colors hover:bg-grayscale-7 dark:bg-grayscale-6 dark:hover:bg-grayscale-8" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
