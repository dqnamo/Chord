import Toggle from "@/components/public/Toggle";
import ToggleGroup from "@/components/public/ToggleGroup";
import type { ShowcaseDef } from "@/helpers/showcase";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react/dist/ssr";

const showcase: ShowcaseDef = {
  id: "toggle-group",
  title: "The Toggle Group",
  category: "Forms & Inputs",
  file: "ToggleGroup.tsx",
  usage: `import ToggleGroup from "@/components/public/ToggleGroup";
import Toggle from "@/components/public/Toggle";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react/dist/ssr";

<ToggleGroup defaultValue={["left"]}>
  <Toggle value="left" className="border-0">
    <TextAlignLeftIcon size={16} weight="bold" />
  </Toggle>
  <Toggle value="center" className="border-0">
    <TextAlignCenterIcon size={16} weight="bold" />
  </Toggle>
  <Toggle value="right" className="border-0">
    <TextAlignRightIcon size={16} weight="bold" />
  </Toggle>
</ToggleGroup>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <ToggleGroup defaultValue={["left"]}>
          <Toggle value="left" aria-label="Align left" className="border-0">
            <TextAlignLeftIcon size={16} weight="bold" />
          </Toggle>
          <Toggle value="center" aria-label="Align center" className="border-0">
            <TextAlignCenterIcon size={16} weight="bold" />
          </Toggle>
          <Toggle value="right" aria-label="Align right" className="border-0">
            <TextAlignRightIcon size={16} weight="bold" />
          </Toggle>
        </ToggleGroup>
      ),
    },
  ],
};

export default showcase;
