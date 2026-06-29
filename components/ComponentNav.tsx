"use client";

import { useEffect, useMemo, useState } from "react";
import {
  COMPONENT_INDEX,
  type ComponentIndexEntry,
} from "@/helpers/component-index";
import { cn } from "@/helpers/classname-helper";
import { SHOWCASE_CATEGORY_ORDER } from "@/helpers/showcase";

function groupByCategory(entries: ComponentIndexEntry[]) {
  return SHOWCASE_CATEGORY_ORDER.map((category) => ({
    category,
    items: entries.filter((entry) => entry.category === category),
  })).filter((group) => group.items.length > 0);
}

export default function ComponentNav() {
  const groups = useMemo(() => groupByCategory(COMPONENT_INDEX), []);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = COMPONENT_INDEX.map((entry) =>
      document.getElementById(entry.id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Component navigation"
      className={cn(
        "small-shadow fixed bottom-4 left-4 z-90 hidden w-60 flex-col overflow-hidden rounded-lg border border-grayscale-3 bg-white xl:flex dark:border-grayscale-3 dark:bg-grayscale-2",
        "top-[17rem]",
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-grayscale-3 px-3 py-2 dark:border-grayscale-3">
        <p className="font-mono font-semibold text-grayscale-10 text-tiny uppercase tracking-wide">
          Components
        </p>
        <p className="font-mono font-semibold text-grayscale-8 text-tiny">
          {COMPONENT_INDEX.length}
        </p>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-2">
        {groups.map((group) => (
          <div key={group.category} className="flex flex-col gap-px">
            <p className="px-2 py-1 font-mono font-bold text-grayscale-8 text-tiny uppercase tracking-wide">
              {group.category}
            </p>
            {group.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={cn(
                    "cursor-pointer rounded-md px-2 py-1 text-sm transition-colors",
                    isActive
                      ? "bg-grayscale-3 text-grayscale-12 dark:bg-grayscale-4"
                      : "text-grayscale-10 hover:bg-grayscale-2 hover:text-grayscale-12 dark:hover:bg-grayscale-3",
                  )}
                >
                  {item.title.replace(/^The\s+/, "")}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
