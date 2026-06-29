import Toggle from "@/components/public/Toggle";
import type { ShowcaseDef } from "@/helpers/showcase";
import { TextBIcon } from "@phosphor-icons/react/dist/ssr";

const showcase: ShowcaseDef = {
  id: "toggle",
  title: "The Toggle",
  category: "Forms & Inputs",
  file: "Toggle.tsx",
  usage: `import Toggle from "@/components/public/Toggle";
import { TextBIcon } from "@phosphor-icons/react/dist/ssr";

<Toggle aria-label="Bold">
  <TextBIcon size={16} weight="bold" />
</Toggle>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Toggle aria-label="Bold">
          <TextBIcon size={16} weight="bold" />
        </Toggle>
      ),
    },
  ],
};

export default showcase;
