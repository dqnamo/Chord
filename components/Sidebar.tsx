import { MoonStarsIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Logo from "@/components/Logo";
import ScrollFadeList from "@/components/ScrollFadeList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { COMPONENT_INDEX } from "@/helpers/component-index";
import packageJson from "@/package.json";

const navGroups = [
  {
    title: "Getting Started",
    items: [
      { href: "/", label: "Home" },
      { href: "/setup", label: "Setup" },
    ],
  },
  {
    title: "Components",
    items: COMPONENT_INDEX.map((item) => ({
      href: `/components/${item.id}`,
      label: item.title.replace(/^The\s+/, ""),
    })),
  },
];

export function SidebarNavContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ScrollFadeList contentClassName="px-3 pb-3">
      <nav className="flex flex-col gap-5">
        {navGroups.map((group) => (
          <div className="flex flex-col gap-1" key={group.title}>
            <h2 className="px-2 font-mono font-medium text-grayscale-9 text-xs uppercase">
              {group.title}
            </h2>
            <div className="flex flex-col gap-px">
              {group.items.map((item) => (
                <Link
                  className="rounded-md px-2 py-1.5 text-grayscale-11 text-sm transition-colors hover:bg-grayscale-2 hover:text-grayscale-12 dark:hover:bg-grayscale-3"
                  href={item.href}
                  key={item.href}
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </ScrollFadeList>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden h-full min-h-0 w-64 shrink-0 flex-col border-grayscale-3 border-r md:flex">
      <div className="p-5">
        <Link href="/" aria-label="Chord home" className="w-max">
          <Logo />
        </Link>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <SidebarNavContent />
      </div>
      <div className="flex items-center justify-between border-grayscale-3 border-t p-3 dark:border-grayscale-2">
        <p className="font-mono font-medium text-grayscale-9 text-xs">
          V{packageJson.version}
        </p>
        <div className="flex items-center gap-2">
          <MoonStarsIcon
            aria-hidden="true"
            className="text-grayscale-10"
            size={17}
            weight="fill"
          />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
