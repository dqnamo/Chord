"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { FloatingPanel } from "@/components/dqnamo/FloatingPanel";
import { Switch } from "@/components/public/Switch";
import { cn } from "@/helpers/classname-helper";

const emptySubscribe = () => () => {};

function SidebarNavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        onClick={onNavigate}
        className={cn(
          "px-2 py-1 font-mono font-semibold text-xs uppercase",
          pathname === "/" ? "text-grayscale-11" : "text-grayscale-9",
        )}
      >
        Home
      </Link>
      <Link
        href="/setup"
        onClick={onNavigate}
        className={cn(
          "px-2 py-1 font-mono font-semibold text-grayscale-9 text-xs uppercase transition-colors duration-200 hover:text-grayscale-11",
          pathname === "/setup" ? "text-grayscale-11" : "text-grayscale-9",
        )}
      >
        Setup
      </Link>
      <Link
        href="/#components"
        onClick={onNavigate}
        className={cn(
          "flex flex-row items-center justify-between gap-2 px-2 py-1 font-mono font-semibold text-grayscale-9 text-xs uppercase transition-colors duration-200 hover:text-grayscale-10",
          pathname.includes("#components")
            ? "text-grayscale-11"
            : "text-grayscale-9",
        )}
      >
        Components
      </Link>
    </>
  );
}

function SidebarNavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <>
      <SidebarNavItems onNavigate={onNavigate} />

      <div className="flex flex-col mt-8 px-2">
        <div className="flex flex-row items-center gap-2">
          <span className="text-xs font-mono text-grayscale-9 font-medium uppercase">
            Dark Mode
          </span>
          {mounted && (
            <Switch.Composed
              size={16}
              checked={resolvedTheme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          )}
        </div>
      </div>

      <div className="flex flex-col mt-auto px-2">
        <p className="text-xs text-grayscale-9">
          Made with 💛 in{" "}
          <span className="font-medium text-grayscale-9">London</span> by{" "}
        </p>
        <a
          href="https://dqnamo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-max font-medium text-lg text-grayscale-9 hover:text-grayscale-11 transition-colors duration-200 font-pirata"
        >
          dqnamo
        </a>
      </div>
    </>
  );
}

export default function Sidebar() {
  return (
    <FloatingPanel>
      <SidebarNavItems />
    </FloatingPanel>
  );
}

export { SidebarNavContent, SidebarNavItems };
