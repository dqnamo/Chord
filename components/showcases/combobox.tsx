import ComboboxDemo from "@/components/showcases/demos/ComboboxDemo";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "combobox",
  title: "The Combobox",
  category: "Forms & Inputs",
  file: "Combobox.tsx",
  usage: `import { Combobox } from "@/components/public/Combobox";

const frameworks = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt"];

<Combobox.Root items={frameworks}>
  <Combobox.Input placeholder="Pick a framework..." />
  <Combobox.Portal>
    <Combobox.Positioner sideOffset={6}>
      <Combobox.Popup>
        <Combobox.Empty>No results.</Combobox.Empty>
        <Combobox.List>
          {(item: string) => (
            <Combobox.Item key={item} value={item}>
              {item}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox.Positioner>
  </Combobox.Portal>
</Combobox.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: <ComboboxDemo />,
    },
  ],
};

export default showcase;
