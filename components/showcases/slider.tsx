import { Slider } from "@/components/public/Slider";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "slider",
  title: "The Slider",
  category: "Forms & Inputs",
  file: "Slider.tsx",
  usage: `import { Slider } from "@/components/public/Slider";

<Slider.Root defaultValue={40} className="w-56">
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Slider.Root defaultValue={40} className="w-56">
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      ),
    },
  ],
};

export default showcase;
