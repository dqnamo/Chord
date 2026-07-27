import type { ReactNode } from "react";

export type ShowcaseCategory =
  | "Buttons & Actions"
  | "Forms & Inputs"
  | "Overlays"
  | "Navigation"
  | "Data Display"
  | "Feedback"
  | "Layout";

export const SHOWCASE_CATEGORY_ORDER: ShowcaseCategory[] = [
  "Buttons & Actions",
  "Forms & Inputs",
  "Overlays",
  "Navigation",
  "Data Display",
  "Feedback",
  "Layout",
];

export type ShowcasePreviewTab = {
  value: string;
  label: string;
  description?: string;
  content: ReactNode;
};

export type ShowcaseExample = {
  /** Stable kebab-case id, also used as the section anchor. */
  id: string;
  title: string;
  description: string;
  /** Workspace-relative source file rendered in the example's code card. */
  sourceFile: string;
  content: ReactNode;
};

export type ShowcaseDef = {
  /** Stable kebab-case id, also used as the anchor. */
  id: string;
  /** Display title, e.g. "The Dialog". */
  title: string;
  category: ShowcaseCategory;
  /** File name inside `components/public`, e.g. "Dialog.tsx". Its source is shown in the Component tab. */
  file: string;
  /** Raw usage snippet shown in the Usage tab. */
  usage: string;
  previewTabs: ShowcasePreviewTab[];
  /** Standalone behaviors that are not component variants. */
  examples?: ShowcaseExample[];
};
