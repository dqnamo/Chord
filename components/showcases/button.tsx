import Button from "@/components/public/Button";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "button",
  title: "The Button",
  category: "Buttons & Actions",
  file: "Button.tsx",
  usage: `import Button from "@/components/public/Button";

<Button variant="primary">
  Click me
</Button>

<Button variant="secondary">
  Secondary
</Button>`,
  previewTabs: [
    {
      value: "primary",
      label: "Primary",
      content: <Button variant="primary">Primary</Button>,
    },
    {
      value: "secondary",
      label: "Secondary",
      content: <Button variant="secondary">Secondary</Button>,
    },
  ],
};

export default showcase;
