import Card from "@/components/public/Card";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "card",
  title: "The Card",
  category: "Layout",
  file: "Card.tsx",
  usage: `import Card from "@/components/public/Card";

<Card className="max-w-xs">
  <Card layer={1} className="p-4">
    <p>Chord components</p>
  </Card>
</Card>

<Card layer={1} hoverable className="max-w-xs p-4">
  <p>Interactive card</p>
</Card>`,
  previewTabs: [
    {
      value: "base",
      label: "Base",
      content: (
        <Card className="max-w-xs">
          <Card layer={1} className="p-4">
            <p className="font-medium text-sm text-grayscale-12">
              Chord components
            </p>
            <p className="text-xs text-grayscale-10">
              A layered surface for grouped interface content.
            </p>
          </Card>
        </Card>
      ),
    },
    {
      value: "hoverable",
      label: "Hoverable",
      content: (
        <Card layer={1} hoverable className="max-w-xs p-4">
          <p className="font-medium text-sm text-grayscale-12">
            Interactive card
          </p>
          <p className="text-xs text-grayscale-10">
            Hover to preview the active surface state.
          </p>
        </Card>
      ),
    },
  ],
};

export default showcase;
