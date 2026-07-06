import { InputOTP } from "@/components/public/InputOTP";
import Label from "@/components/public/Label";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "input-otp",
  title: "The InputOTP",
  category: "Forms & Inputs",
  file: "InputOTP.tsx",
  usage: `import { InputOTP } from "@/components/public/InputOTP";

<InputOTP.Root length={6}>
  {Array.from({ length: 6 }).map((_, i) => (
    <InputOTP.Input key={i} />
  ))}
</InputOTP.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex flex-col gap-1.5">
          <Label>Verification code</Label>
          <InputOTP.Root length={6}>
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static OTP slots
              <InputOTP.Input key={i} />
            ))}
          </InputOTP.Root>
        </div>
      ),
    },
  ],
};

export default showcase;
