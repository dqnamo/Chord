import {
  GithubLogoIcon,
  MoonStarsIcon,
  MusicNoteIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ButtonLink } from "@/components/public/Button";
import ThemeColorSelector from "@/components/ThemeColorSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { componentPages } from "./components/component-pages";

export default function Home() {
  return (
    <div className="flex flex-col divide-y divide-grayscale-3">
      <div className="flex flex-col w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 p-4 md:p-8 lg:p-12">
          <div className="flex flex-row items-center justify-between gap-12">
            <div className="flex flex-col p-3">
              <Logo textMark={true} />
              <p className="mt-1 max-w-md text-balance font-medium text-base text-grayscale-11">
                Opinionated, open source composed component library built with
                Tailwind CSS and Base UI primitives.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <ButtonLink href="/setup">
                  <MusicNoteIcon aria-hidden="true" size={16} weight="fill" />
                  Get Started
                </ButtonLink>
                <ButtonLink
                  href="https://github.com/dqnamo/Chord"
                  rel="noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  <GithubLogoIcon aria-hidden="true" size={16} weight="bold" />
                  GitHub
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 md:px-8 lg:px-12">
          <div className="w-full dark:border-grayscale-2">
            <div className="flex flex-col border-x border-grayscale-3 gap-3 p-3 border-b border-grayscale-3 sticky top-0 bg-grayscale-1 z-30">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-xs uppercase font-mono text-grayscale-9">
                  Colors
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
              <div className="flex flex-row flex-wrap items-start gap-8">
                <div className="flex flex-col gap-1.5">
                  <p className="font-medium text-grayscale-9 text-xs">
                    Grayscale Color
                  </p>
                  <ThemeColorSelector axis="grayscale" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-medium text-grayscale-9 text-xs">
                    Accent Color
                  </p>
                  <ThemeColorSelector axis="accent" />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center border-x border-grayscale-3 dark:border-grayscale-3 justify-between gap-12 p-3">
              <p className="font-medium text-xs uppercase font-mono text-grayscale-9">
                Components
              </p>
              <Link
                className="font-mono text-grayscale-9 text-tiny uppercase hover:text-grayscale-12"
                href="/components"
              >
                View all
              </Link>
            </div>
            <div className="bg-grayscale-3 p-px gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {componentPages.map((component) => (
                <div
                  className="group relative flex aspect-square flex-col items-center justify-center bg-grayscale-1 p-4 transition-colors hover:bg-grayscale-2 dark:hover:bg-grayscale-3"
                  key={component.slug}
                >
                  <Link
                    aria-label={`View ${component.displayTitle}`}
                    className="absolute inset-0 z-10"
                    href={`/components/${component.slug}`}
                  />
                  <div className="pointer-events-none absolute top-3 right-3 left-3 z-20">
                    <p className="truncate font-medium text-grayscale-11 text-sm">
                      {component.displayTitle}
                    </p>
                  </div>
                  <div className="pointer-events-none relative z-20 flex min-h-0 w-full items-center justify-center overflow-hidden p-4 pt-8">
                    <div className="pointer-events-auto">
                      {component.previewTabs[0]?.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
