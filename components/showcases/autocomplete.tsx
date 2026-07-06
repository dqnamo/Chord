import AutocompleteDemo from "@/components/showcases/demos/AutocompleteDemo";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "autocomplete",
  title: "The Autocomplete",
  category: "Forms & Inputs",
  file: "Autocomplete.tsx",
  usage: `import { Autocomplete } from "@/components/public/Autocomplete";

const tags = ["bug", "documentation", "enhancement", "question"];

<Autocomplete.Root items={tags}>
  <Autocomplete.Input placeholder="e.g. bug" />
  <Autocomplete.Portal>
    <Autocomplete.Positioner sideOffset={6}>
      <Autocomplete.Popup>
        <Autocomplete.Empty>No tags found.</Autocomplete.Empty>
        <Autocomplete.List>
          {(tag: string) => (
            <Autocomplete.Item key={tag} value={tag}>
              {tag}
            </Autocomplete.Item>
          )}
        </Autocomplete.List>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: <AutocompleteDemo />,
    },
  ],
};

export default showcase;
