import { Progress } from "@/components/public/Progress";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "progress",
  title: "The Progress",
  category: "Feedback",
  file: "Progress.tsx",
  usage: `import { Progress } from "@/components/public/Progress";

<Progress.Root value={60}>
  <div className="flex items-center justify-between">
    <Progress.Label>Uploading</Progress.Label>
    <Progress.Value />
  </div>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Progress.Root value={60} className="w-64">
          <div className="mb-1.5 flex items-center justify-between">
            <Progress.Label>Uploading</Progress.Label>
            <Progress.Value />
          </div>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      ),
    },
  ],
};

export default showcase;
