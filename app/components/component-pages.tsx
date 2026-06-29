import { showcases } from "@/components/showcases/registry";
import type { ShowcaseCategory } from "@/helpers/showcase";

export type ComponentPage = {
  slug: string;
  title: string;
  displayTitle: string;
  description: string;
  category: ShowcaseCategory;
  componentFile: string;
  usageCode: string;
  previewTabs: {
    value: string;
    label: string;
    content: React.ReactNode;
  }[];
};

const categoryLabels: Record<ShowcaseCategory, string> = {
  "Buttons & Actions": "action",
  "Forms & Inputs": "form",
  Overlays: "overlay",
  Navigation: "navigation",
  "Data Display": "data display",
  Feedback: "feedback",
  Layout: "layout",
};

function getDisplayTitle(title: string) {
  return title.replace(/^The\s+/, "");
}

export const componentPages = showcases.map((showcase) => {
  const displayTitle = getDisplayTitle(showcase.title);

  return {
    slug: showcase.id,
    title: showcase.title,
    displayTitle,
    category: showcase.category,
    description: `${displayTitle} is a Chord ${categoryLabels[showcase.category]} component built from Base UI primitives and project tokens.`,
    componentFile: showcase.file,
    usageCode: showcase.usage,
    previewTabs: showcase.previewTabs,
  };
}) satisfies ComponentPage[];

export function getComponentPage(slug: string) {
  return componentPages.find((page) => page.slug === slug);
}
