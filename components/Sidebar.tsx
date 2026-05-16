"use client";

import Link from "next/link";
import { cn } from "@/helpers/classname-helper";
import { usePathname } from "next/navigation";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { Switch } from "@/components/public/Switch";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import TextLink from "./public/TextLink";

const emptySubscribe = () => () => {};

export default function Sidebar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <div className="fixed h-full top-0 left-0 w-64 shrink-0 flex flex-col gap-px py-4 px-4  z-100">
      <Link
        href="/"
        className={cn(
          "uppercase font-semibold text-xs font-mono text-grayscale-12 px-2 py-1",
          pathname === "/" ? "text-grayscale-11" : "text-grayscale-9",
        )}
      >
        Home
      </Link>
      <Link
        href="/setup"
        className={cn(
          "uppercase hover:text-grayscale-11 transition-colors duration-200 font-semibold text-xs font-mono text-grayscale-9 px-2 py-1",
          pathname === "/setup" ? "text-grayscale-11" : "text-grayscale-9",
        )}
      >
        Setup
      </Link>
      <Link
        href="/#components"
        className={cn(
          "uppercase hover:text-grayscale-10 flex flex-row items-center gap-2 transition-colors duration-200 font-semibold text-xs font-mono text-grayscale-9 px-2 py-1",
          pathname.includes("#components")
            ? "text-grayscale-11"
            : "text-grayscale-9",
        )}
      >
        Components
        <div className="flex flex-row items-center gap-1 text-grayscale-9 ">
          <SparkleIcon size={12} weight="fill" className="text-green-9" />
          <span className="text-tiny font-mono tracking-normal">New</span>
        </div>
      </Link>
      <Link
        href="/"
        className={cn(
          "uppercase hover:text-grayscale-10 flex flex-col transition-colors duration-200 font-semibold text-xs font-mono text-grayscale-9 px-2 py-1",
          pathname.includes("#components")
            ? "text-grayscale-11"
            : "text-grayscale-8",
        )}
      >
        Skills
        <div className="flex flex-row items-center gap-1 text-grayscale-8 ">
          {/* <HourglassIcon size={12} weight="bold" className="text-orange-9" /> */}
          <span className="text-tiny font-mono tracking-normal">
            Coming Soon
          </span>
        </div>
      </Link>

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
    </div>
  );
}
