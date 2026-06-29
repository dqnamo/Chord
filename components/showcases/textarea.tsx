import Label from "@/components/public/Label";
import Textarea from "@/components/public/Textarea";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "textarea",
  title: "The Textarea",
  category: "Forms & Inputs",
  file: "Textarea.tsx",
  usage: `import Label from "@/components/public/Label";
import Textarea from "@/components/public/Textarea";

<div className="flex flex-col gap-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" rows={4} placeholder="Tell us what's on your mind..." />
</div>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex w-64 flex-col gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={4}
            placeholder="Tell us what's on your mind..."
          />
        </div>
      ),
    },
  ],
};

export default showcase;
