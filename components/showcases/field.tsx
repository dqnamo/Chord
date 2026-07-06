import { Field } from "@/components/public/Field";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "field",
  title: "The Field",
  category: "Forms & Inputs",
  file: "Field.tsx",
  usage: `import { Field } from "@/components/public/Field";

<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required placeholder="you@example.com" />
  <Field.Description>We'll never share your email.</Field.Description>
  <Field.Error>Please enter a valid email address.</Field.Error>
</Field.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Field.Root className="w-64">
          <Field.Label>Email</Field.Label>
          <Field.Control type="email" required placeholder="you@example.com" />
          <Field.Description>We'll never share your email.</Field.Description>
          <Field.Error match="valueMissing">
            An email address is required.
          </Field.Error>
          <Field.Error match="typeMismatch">
            Please enter a valid email address.
          </Field.Error>
        </Field.Root>
      ),
    },
  ],
};

export default showcase;
