"use client";

import { useState } from "react";
import Button from "@/components/public/Button";
import { Field } from "@/components/public/Field";
import Form from "@/components/public/Form";

export default function FormDemo() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <Form
      className="w-64"
      onFormSubmit={(values) => setSubmitted(String(values.email))}
    >
      <Field.Root name="email">
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" required placeholder="you@example.com" />
        <Field.Error match="valueMissing">
          An email address is required.
        </Field.Error>
        <Field.Error match="typeMismatch">
          Please enter a valid email address.
        </Field.Error>
      </Field.Root>
      <div className="flex items-center gap-2">
        <Button type="submit" variant="secondary">
          Subscribe
        </Button>
        {submitted ? (
          <p className="text-xs text-grayscale-10">Subscribed {submitted}</p>
        ) : null}
      </div>
    </Form>
  );
}
