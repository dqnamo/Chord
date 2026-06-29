import { Field } from "@/components/public/Field";
import { Fieldset } from "@/components/public/Fieldset";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "fieldset",
  title: "The Fieldset",
  category: "Forms & Inputs",
  file: "Fieldset.tsx",
  usage: `import { Field } from "@/components/public/Field";
import { Fieldset } from "@/components/public/Fieldset";

<Fieldset.Root>
  <Fieldset.Legend>Profile</Fieldset.Legend>
  <Field.Root>
    <Field.Label>Full name</Field.Label>
    <Field.Control placeholder="Ada Lovelace" />
  </Field.Root>
  <Field.Root>
    <Field.Label>Username</Field.Label>
    <Field.Control placeholder="ada" />
  </Field.Root>
</Fieldset.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Fieldset.Root className="w-64">
          <Fieldset.Legend>Profile</Fieldset.Legend>
          <Field.Root>
            <Field.Label>Full name</Field.Label>
            <Field.Control placeholder="Ada Lovelace" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Field.Control placeholder="ada" />
          </Field.Root>
        </Fieldset.Root>
      ),
    },
  ],
};

export default showcase;
