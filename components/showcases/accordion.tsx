import { Accordion } from "@/components/public/Accordion";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "accordion",
  title: "The Accordion",
  category: "Data Display",
  file: "Accordion.tsx",
  usage: `import { Accordion } from "@/components/public/Accordion";

<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Yes, it follows WAI-ARIA patterns.</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Accordion.Root className="w-72">
          <Accordion.Item>
            <Accordion.Header>
              <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
              Yes. It follows the WAI-ARIA disclosure pattern out of the box.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>
              <Accordion.Trigger>Can I customize it?</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
              Every part is a thin wrapper, so styling is fully in your control.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>
              <Accordion.Trigger>Does it animate?</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
              The panel height transitions smoothly when opening and closing.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      ),
    },
  ],
};

export default showcase;
