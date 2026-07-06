import { Avatar } from "@/components/public/Avatar";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "avatar",
  title: "The Avatar",
  category: "Data Display",
  file: "Avatar.tsx",
  usage: `import { Avatar } from "@/components/public/Avatar";

<Avatar.Root>
  <Avatar.Image src="https://i.pravatar.cc/80" alt="User" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex items-center gap-3">
          <Avatar.Root>
            <Avatar.Image src="https://i.pravatar.cc/80" alt="User" />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar.Root>
        </div>
      ),
    },
  ],
};

export default showcase;
