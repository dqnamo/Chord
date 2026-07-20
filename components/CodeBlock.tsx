"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/public/ScrollArea";
import type { CodeLine } from "@/helpers/syntax";

export default function CodeBlock({ lines }: { lines: CodeLine[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ScrollArea.Root className="group/code-scroll h-full min-h-0 w-full flex-1">
      <ScrollArea.Viewport className="h-full w-full">
        <ScrollArea.Content>
          <pre className="p-4 font-mono text-xs leading-relaxed">
            <code>
              {lines.map((line) => (
                <span className="block" key={line.id}>
                  {line.tokens.map((token) => (
                    <span
                      key={token.id}
                      style={{
                        color: isDark ? token.darkColor : token.lightColor,
                      }}
                    >
                      {token.content}
                    </span>
                  ))}
                </span>
              ))}
            </code>
          </pre>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="z-20 flex w-2 justify-center bg-transparent px-0.5 py-1 opacity-0 transition-opacity duration-150 group-hover/code-scroll:opacity-100 data-[hovering]:opacity-100 data-[scrolling]:opacity-100">
        <ScrollArea.Thumb className="w-1 rounded-full bg-grayscale-5 transition-colors hover:bg-grayscale-7 dark:bg-grayscale-6 dark:hover:bg-grayscale-8" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="z-20 flex h-2 justify-center bg-transparent px-1 py-0.5 opacity-0 transition-opacity duration-150 group-hover/code-scroll:opacity-100 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="h-1 rounded-full bg-grayscale-5 transition-colors hover:bg-grayscale-7 dark:bg-grayscale-6 dark:hover:bg-grayscale-8" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-transparent" />
    </ScrollArea.Root>
  );
}
