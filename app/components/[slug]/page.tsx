import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComponentShowcase from "@/components/ComponentShowcase";
import { tokenize } from "@/helpers/syntax";
import { componentPages, getComponentPage } from "../component-pages";

export function generateStaticParams() {
  return componentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getComponentPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.displayTitle} - Chord`,
    description: page.description,
  };
}

export default async function ComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const page = getComponentPage(slug);

  if (!page) {
    notFound();
  }

  const componentSource = await readFile(
    path.join(process.cwd(), "components", "public", page.componentFile),
    "utf8",
  );

  const [usageCodeLines, componentCodeLines] = await Promise.all([
    tokenize(page.usageCode, "tsx"),
    tokenize(componentSource, "tsx"),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col border-grayscale-3 border-x p-4 md:p-8 lg:p-16 dark:border-grayscale-2">
      <div className="flex flex-col gap-1 p-2">
        <h1 className="font-medium text-grayscale-11">{page.displayTitle}</h1>
        <p className="max-w-md text-grayscale-10 text-sm text-pretty">
          {page.description}
        </p>
      </div>

      <div className="mt-6">
        <ComponentShowcase
          componentCodeLines={componentCodeLines}
          id={page.slug}
          previewTabs={page.previewTabs}
          title={page.displayTitle}
          usageCodeLines={usageCodeLines}
        />
      </div>
    </div>
  );
}
