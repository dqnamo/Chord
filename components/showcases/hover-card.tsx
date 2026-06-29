import { HoverCard } from "@/components/public/HoverCard";
import TextLink from "@/components/public/TextLink";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "hover-card",
  title: "The Hover Card",
  category: "Overlays",
  file: "HoverCard.tsx",
  usage: `import { HoverCard } from "@/components/public/HoverCard";
import TextLink from "@/components/public/TextLink";

<HoverCard.Root>
  <HoverCard.Trigger render={<TextLink href="#">@dqnamo</TextLink>} />
  <HoverCard.Portal>
    <HoverCard.Positioner sideOffset={6}>
      <HoverCard.Popup>
        <HoverCard.Arrow />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-9 text-sm font-medium text-white">
            DQ
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-grayscale-12">dqnamo</span>
            <span className="text-xs text-grayscale-10">Building chord</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-grayscale-11">
          Quiet, dense, bordered components on Base UI.
        </p>
      </HoverCard.Popup>
    </HoverCard.Positioner>
  </HoverCard.Portal>
</HoverCard.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <HoverCard.Root>
          <HoverCard.Trigger render={<TextLink href="#">@dqnamo</TextLink>} />
          <HoverCard.Portal>
            <HoverCard.Positioner sideOffset={6}>
              <HoverCard.Popup>
                <HoverCard.Arrow />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-9 text-sm font-medium text-white">
                    DQ
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-grayscale-12">
                      dqnamo
                    </span>
                    <span className="text-xs text-grayscale-10">
                      Building chord
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-grayscale-11">
                  Quiet, dense, bordered components on Base UI.
                </p>
              </HoverCard.Popup>
            </HoverCard.Positioner>
          </HoverCard.Portal>
        </HoverCard.Root>
      ),
    },
  ],
};

export default showcase;
