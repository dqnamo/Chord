import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { InputGroup } from "@/components/public/InputGroup";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "input-group",
  title: "The Input Group",
  category: "Forms & Inputs",
  file: "InputGroup.tsx",
  usage: `import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { InputGroup } from "@/components/public/InputGroup";

<InputGroup.Root>
  <InputGroup.Addon>
    <MagnifyingGlassIcon size={14} weight="bold" />
  </InputGroup.Addon>
  <InputGroup.Field placeholder="Search…" />
</InputGroup.Root>

<InputGroup.Root>
  <InputGroup.Addon>$</InputGroup.Addon>
  <InputGroup.Field placeholder="0.00" inputMode="decimal" />
</InputGroup.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex w-full max-w-xs flex-col gap-2">
          <InputGroup.Root>
            <InputGroup.Addon>
              <MagnifyingGlassIcon size={14} weight="bold" />
            </InputGroup.Addon>
            <InputGroup.Field placeholder="Search…" />
          </InputGroup.Root>
          <InputGroup.Root>
            <InputGroup.Addon>$</InputGroup.Addon>
            <InputGroup.Field placeholder="0.00" inputMode="decimal" />
          </InputGroup.Root>
        </div>
      ),
    },
  ],
};

export default showcase;
