import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CodeIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import ComponentShowcase from "@/components/ComponentShowcase";
import Logo from "@/components/Logo";
import Button from "@/components/public/Button";
import Section from "@/components/Section";
import { showcases } from "@/components/showcases/registry";
import ThemeColorSelector from "@/components/ThemeColorSelector";
import {
  SHOWCASE_CATEGORY_ORDER,
  type ShowcaseCategory,
  type ShowcaseDef,
} from "@/helpers/showcase";
import { type CodeLine, tokenize } from "@/helpers/syntax";

type PreparedShowcase = {
  def: ShowcaseDef;
  usageCodeLines: CodeLine[];
  componentCodeLines: CodeLine[];
};

async function prepareShowcase(def: ShowcaseDef): Promise<PreparedShowcase> {
  const source = await readFile(
    join(process.cwd(), "components", "public", def.file),
    "utf8",
  );
  const [usageCodeLines, componentCodeLines] = await Promise.all([
    tokenize(def.usage),
    tokenize(source),
  ]);
  return { def, usageCodeLines, componentCodeLines };
}

export default async function Home() {
  const prepared = await Promise.all(showcases.map(prepareShowcase));

  const byCategory = new Map<ShowcaseCategory, PreparedShowcase[]>();
  for (const item of prepared) {
    const list = byCategory.get(item.def.category) ?? [];
    list.push(item);
    byCategory.set(item.def.category, list);
  }

  const orderedCategories = SHOWCASE_CATEGORY_ORDER.filter((category) =>
    byCategory.has(category),
  );

  return (
    <div className="flex flex-col w-full divide-y divide-grayscale-3 dark:divide-grayscale-2">
      <div className="relative flex flex-col max-w-4xl mx-auto w-full border-x border-grayscale-3 dark:border-grayscale-2 p-4 md:p-8 lg:p-16">
        <div className="flex flex-col gap-px p-2">
          <Logo className="w-10" iconSize={24} />
          <div className="flex flex-row items-center gap-1 mt-3">
            <h1 className="font-bold text-2xl text-grayscale-12 font-mono uppercase">
              Chord
            </h1>
          </div>
          <p className="text-grayscale-11 text-sm max-w-md text-balance">
            An opinionated design language and UI Library for building beautiful
            web applications.
          </p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <Button variant="primary" className="text-xs" href="#components">
              <CodeIcon size={16} weight="bold" />
              View Components
            </Button>
            <Button
              variant="secondary"
              className="text-xs"
              href="https://github.com/dqnamo/chord"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogoIcon size={16} weight="bold" />
              Github
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-4xl mx-auto w-full border-x border-grayscale-3 dark:border-grayscale-2 p-4 md:p-8 lg:p-16">
        <div className="flex flex-col p-2">
          <h2 className="font-medium text-grayscale-11">
            First, let&apos;s choose your colors.
          </h2>
          <p className="text-grayscale-10 text-sm max-w-md text-balance">
            Pick a grayscale and an accent color to get started.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-grayscale-9 text-tiny tracking-wide font-mono uppercase font-bold">
              Grayscale Color
            </p>
            <ThemeColorSelector axis="grayscale" />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-grayscale-9 text-tiny tracking-wide font-mono uppercase font-bold">
              Accent Color
            </p>
            <ThemeColorSelector axis="accent" />
          </div>
        </div>
      </div>
      <Section id="components">
        <div className="flex flex-col gap-px p-2">
          <h2 className="font-medium text-grayscale-11">The Components</h2>
          <p className="text-grayscale-10 text-sm max-w-md text-balance">
            {prepared.length} components. Ready to copy code for your project.
          </p>
        </div>
        <div className="flex flex-col gap-16 my-8">
          {orderedCategories.map((category) => (
            <div key={category} className="flex flex-col gap-8">
              <div
                id={category.toLowerCase().replace(/[^a-z]+/g, "-")}
                className="flex flex-row items-baseline gap-2 px-2"
              >
                <h3 className="font-mono text-tiny font-bold uppercase tracking-wide text-grayscale-9">
                  {category}
                </h3>
                <div className="h-px flex-1 bg-grayscale-3 dark:bg-grayscale-2" />
              </div>
              {byCategory.get(category)?.map((item) => (
                <ComponentShowcase
                  key={item.def.id}
                  id={item.def.id}
                  title={item.def.title}
                  previewTabs={item.def.previewTabs}
                  usageCodeLines={item.usageCodeLines}
                  componentCodeLines={item.componentCodeLines}
                />
              ))}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
