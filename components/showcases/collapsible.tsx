import { Collapsible } from "@/components/public/Collapsible";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "collapsible",
  title: "The Collapsible",
  category: "Data Display",
  file: "Collapsible.tsx",
  usage: `import { Collapsible } from "@/components/public/Collapsible";

<Collapsible.Root>
  <Collapsible.Trigger>Show details</Collapsible.Trigger>
  <Collapsible.Panel>
    <p className="pt-2">Hidden content revealed on demand.</p>
  </Collapsible.Panel>
</Collapsible.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Collapsible.Root className="w-64">
          <Collapsible.Trigger>Show details</Collapsible.Trigger>
          <Collapsible.Panel>
            <p className="pt-2">
              Chord components are copy-paste primitives built on Base UI, so
              you own every line.
            </p>
          </Collapsible.Panel>
        </Collapsible.Root>
      ),
    },
  ],
};

export default showcase;
