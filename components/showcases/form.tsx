import FormDemo from "@/components/showcases/demos/FormDemo";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "form",
  title: "The Form",
  category: "Forms & Inputs",
  file: "Form.tsx",
  usage: `import Button from "@/components/public/Button";
import { Field } from "@/components/public/Field";
import Form from "@/components/public/Form";

<Form onFormSubmit={(values) => console.log(values)}>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" required placeholder="you@example.com" />
    <Field.Error match="valueMissing">
      An email address is required.
    </Field.Error>
  </Field.Root>
  <Button type="submit" variant="secondary">
    Subscribe
  </Button>
</Form>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: <FormDemo />,
    },
  ],
};

export default showcase;
