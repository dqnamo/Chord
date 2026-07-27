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

  const [usageCodeLines, componentCodeLines, ...exampleCodeLines] =
    await Promise.all([
      tokenize(page.usageCode, "tsx"),
      tokenize(componentSource, "tsx"),
      ...page.examples.map(async (example) => {
        const source = await readFile(
          path.join(process.cwd(), example.sourceFile),
          "utf8",
        );

        return tokenize(source, "tsx");
      }),
    ]);

  const examples = page.examples.map((example, index) => ({
    id: example.id,
    title: example.title,
    description: example.description,
    content: example.content,
    codeLines: exampleCodeLines[index] ?? [],
  }));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col p-4 md:p-8 lg:p-12">
      <div className="flex flex-col gap-1 p-2">
        <h1 className="font-medium text-grayscale-11">{page.displayTitle}</h1>
        <p className="max-w-md text-grayscale-10 text-sm text-pretty">
          {page.description}
        </p>
      </div>

      <div className="mt-6">
        <ComponentShowcase
          componentCodeLines={componentCodeLines}
          examples={examples}
          id={page.slug}
          previewTabs={page.previewTabs}
          usageCodeLines={usageCodeLines}
        />
      </div>
    </div>
  );
}
