import { FileTextIcon, ImageIcon } from "@phosphor-icons/react/dist/ssr";
import Badge from "@/components/public/Badge";
import { Item } from "@/components/public/Item";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "item",
  title: "The Item",
  category: "Layout",
  file: "Item.tsx",
  usage: `import { FileTextIcon } from "@phosphor-icons/react/dist/ssr";
import Badge from "@/components/public/Badge";
import { Item } from "@/components/public/Item";

<Item.Root>
  <Item.Media>
    <FileTextIcon size={18} weight="bold" />
  </Item.Media>
  <Item.Content>
    <Item.Title>Annual report.pdf</Item.Title>
    <Item.Description>2.4 MB · Updated 2 days ago</Item.Description>
  </Item.Content>
  <Item.Actions>
    <Badge variant="secondary">PDF</Badge>
  </Item.Actions>
</Item.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex w-full max-w-sm flex-col">
          <Item.Root>
            <Item.Media>
              <FileTextIcon size={18} weight="bold" />
            </Item.Media>
            <Item.Content>
              <Item.Title>Annual report.pdf</Item.Title>
              <Item.Description>2.4 MB · Updated 2 days ago</Item.Description>
            </Item.Content>
            <Item.Actions>
              <Badge variant="secondary">PDF</Badge>
            </Item.Actions>
          </Item.Root>
          <Item.Root>
            <Item.Media>
              <ImageIcon size={18} weight="bold" />
            </Item.Media>
            <Item.Content>
              <Item.Title>cover-photo.png</Item.Title>
              <Item.Description>860 KB · Updated 5 hours ago</Item.Description>
            </Item.Content>
            <Item.Actions>
              <Badge variant="accent">New</Badge>
            </Item.Actions>
          </Item.Root>
        </div>
      ),
    },
  ],
};

export default showcase;
