import { Meter } from "@/components/public/Meter";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "meter",
  title: "The Meter",
  category: "Data Display",
  file: "Meter.tsx",
  usage: `import { Meter } from "@/components/public/Meter";

<Meter.Root value={72}>
  <div className="flex items-center justify-between">
    <Meter.Label>Storage</Meter.Label>
    <Meter.Value />
  </div>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Meter.Root value={72} className="w-64">
          <div className="mb-1.5 flex items-center justify-between">
            <Meter.Label>Storage</Meter.Label>
            <Meter.Value />
          </div>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      ),
    },
  ],
};

export default showcase;
