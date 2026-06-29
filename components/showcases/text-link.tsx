import TextLink from "@/components/public/TextLink";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "text-link",
  title: "The Text Link",
  category: "Navigation",
  file: "TextLink.tsx",
  usage: `import TextLink from "@/components/public/TextLink";

<TextLink href="/about">
  Learn more
</TextLink>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: <TextLink href="https://www.google.com">Text Link</TextLink>,
    },
  ],
};

export default showcase;
