import {
  TextB,
  TextItalic,
  TextUnderline,
} from "@phosphor-icons/react/dist/ssr";
import { Toolbar } from "@/components/public/Toolbar";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "toolbar",
  title: "The Toolbar",
  category: "Navigation",
  file: "Toolbar.tsx",
  usage: `import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react/dist/ssr";
import { Toolbar } from "@/components/public/Toolbar";

<Toolbar.Root>
  <Toolbar.Group>
    <Toolbar.Button><TextB size={15} weight="bold" /></Toolbar.Button>
    <Toolbar.Button><TextItalic size={15} weight="bold" /></Toolbar.Button>
    <Toolbar.Button><TextUnderline size={15} weight="bold" /></Toolbar.Button>
  </Toolbar.Group>
  <Toolbar.Separator />
  <Toolbar.Button>Format</Toolbar.Button>
</Toolbar.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Toolbar.Root>
          <Toolbar.Group>
            <Toolbar.Button aria-label="Bold">
              <TextB size={15} weight="bold" />
            </Toolbar.Button>
            <Toolbar.Button aria-label="Italic">
              <TextItalic size={15} weight="bold" />
            </Toolbar.Button>
            <Toolbar.Button aria-label="Underline">
              <TextUnderline size={15} weight="bold" />
            </Toolbar.Button>
          </Toolbar.Group>
          <Toolbar.Separator />
          <Toolbar.Button>Format</Toolbar.Button>
          <Toolbar.Button>Insert</Toolbar.Button>
        </Toolbar.Root>
      ),
    },
  ],
};

export default showcase;
