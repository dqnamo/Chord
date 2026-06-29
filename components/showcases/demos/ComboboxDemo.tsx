"use client";

import { Combobox } from "@/components/public/Combobox";
import Label from "@/components/public/Label";

const frameworks = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt"];

export default function ComboboxDemo() {
  return (
    <div className="flex w-64 flex-col gap-1.5">
      <Label htmlFor="framework">Framework</Label>
      <Combobox.Root items={frameworks}>
        <div className="relative">
          <Combobox.Input id="framework" placeholder="Pick a framework..." />
          <div className="absolute inset-y-0 right-1.5 flex items-center gap-0.5">
            <Combobox.Clear />
            <Combobox.Trigger>
              <Combobox.Icon />
            </Combobox.Trigger>
          </div>
        </div>
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={6}>
            <Combobox.Popup>
              <Combobox.Empty>No results.</Combobox.Empty>
              <Combobox.List>
                {(item: string) => (
                  <Combobox.Item key={item} value={item}>
                    {item}
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}
