import Button, { ButtonLink } from "@/components/public/Button";
import ButtonContentDemo from "@/components/showcases/demos/ButtonContentDemo";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "button",
  title: "The Button",
  category: "Buttons & Actions",
  file: "Button.tsx",
  usage: `import Button, { ButtonLink } from "@/components/public/Button";

<Button variant="primary">
  Click me
</Button>

<Button variant="secondary">
  Secondary
</Button>

<ButtonLink href="/setup">
  Get started
</ButtonLink>`,
  previewTabs: [
    {
      value: "primary",
      label: "Primary",
      description:
        "The default treatment for the most important action in a view.",
      content: <Button variant="primary">Primary</Button>,
    },
    {
      value: "secondary",
      label: "Secondary",
      description:
        "A quieter treatment for supporting actions that should remain available.",
      content: <Button variant="secondary">Secondary</Button>,
    },
    {
      value: "link",
      label: "Link",
      description:
        "Button styling with link semantics for navigation between destinations.",
      content: <ButtonLink href="/setup">Get started</ButtonLink>,
    },
  ],
  examples: [
    {
      id: "button-content",
      title: "Button Content",
      description:
        "Button.Content creates an explicit state boundary for accessible label and icon transitions.",
      sourceFile: "components/showcases/demos/ButtonContentDemo.tsx",
      content: <ButtonContentDemo />,
    },
  ],
};

export default showcase;
