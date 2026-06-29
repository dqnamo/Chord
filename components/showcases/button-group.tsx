import Button from "@/components/public/Button";
import ButtonGroup from "@/components/public/ButtonGroup";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "button-group",
  title: "The Button Group",
  category: "Layout",
  file: "ButtonGroup.tsx",
  usage: `import Button from "@/components/public/Button";
import ButtonGroup from "@/components/public/ButtonGroup";

<ButtonGroup>
  <Button variant="secondary">Day</Button>
  <Button variant="secondary">Week</Button>
  <Button variant="secondary">Month</Button>
</ButtonGroup>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <ButtonGroup>
          <Button variant="secondary">Day</Button>
          <Button variant="secondary">Week</Button>
          <Button variant="secondary">Month</Button>
        </ButtonGroup>
      ),
    },
  ],
};

export default showcase;
