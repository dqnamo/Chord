import Link from "next/link";
import { SHOWCASE_CATEGORY_ORDER } from "@/helpers/showcase";
import { componentPages } from "./component-pages";

export default function ComponentsPage() {
  const pagesByCategory = new Map(
    SHOWCASE_CATEGORY_ORDER.map((category) => [
      category,
      componentPages.filter((page) => page.category === category),
    ]),
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col border-grayscale-3 border-x p-4 md:p-8 lg:p-16 dark:border-grayscale-2">
      <div className="flex flex-col gap-1 p-2">
        <h1 className="font-medium text-grayscale-11">Components</h1>
        <p className="max-w-md text-grayscale-10 text-sm text-pretty">
          Browse {componentPages.length} Chord components as standalone pages.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-10">
        {SHOWCASE_CATEGORY_ORDER.map((category) => {
          const pages = pagesByCategory.get(category) ?? [];

          if (pages.length === 0) {
            return null;
          }

          return (
            <section className="flex flex-col gap-3" key={category}>
              <div className="flex items-center gap-3 px-2">
                <h2 className="font-bold font-mono text-grayscale-9 text-tiny uppercase tracking-wide">
                  {category}
                </h2>
                <div className="h-px flex-1 bg-grayscale-3 dark:bg-grayscale-2" />
              </div>
              <div className="grid grid-cols-1 gap-px bg-grayscale-3 p-px md:grid-cols-2 dark:bg-grayscale-2">
                {pages.map((page) => (
                  <Link
                    className="group flex min-h-32 flex-col justify-between bg-grayscale-1 p-4 transition-colors hover:bg-grayscale-2 dark:hover:bg-grayscale-3"
                    href={`/components/${page.slug}`}
                    key={page.slug}
                  >
                    <div>
                      <h3 className="font-medium text-grayscale-12 text-sm">
                        {page.displayTitle}
                      </h3>
                      <p className="mt-1 text-grayscale-10 text-sm">
                        {page.description}
                      </p>
                    </div>
                    <span className="mt-4 font-mono text-grayscale-9 text-tiny uppercase group-hover:text-grayscale-11">
                      View component
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
