"use client";

import { Autocomplete } from "@/components/public/Autocomplete";
import Label from "@/components/public/Label";

const tags = [
  "bug",
  "documentation",
  "duplicate",
  "enhancement",
  "good first issue",
  "help wanted",
  "invalid",
  "question",
  "wontfix",
];

export default function AutocompleteDemo() {
  return (
    <div className="flex w-64 flex-col gap-1.5">
      <Label htmlFor="tag">Label</Label>
      <Autocomplete.Root items={tags}>
        <div className="relative">
          <Autocomplete.Input id="tag" placeholder="e.g. bug" />
          <div className="absolute inset-y-0 right-1.5 flex items-center">
            <Autocomplete.Clear />
          </div>
        </div>
        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={6}>
            <Autocomplete.Popup>
              <Autocomplete.Empty>No tags found.</Autocomplete.Empty>
              <Autocomplete.List>
                {(tag: string) => (
                  <Autocomplete.Item key={tag} value={tag}>
                    {tag}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  );
}
