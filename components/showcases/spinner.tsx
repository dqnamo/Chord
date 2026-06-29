import Spinner from "@/components/public/Spinner";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "spinner",
  title: "The Spinner",
  category: "Feedback",
  file: "Spinner.tsx",
  usage: `import Spinner from "@/components/public/Spinner";

<Spinner size={16} />
<Spinner size={28} />`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex items-center gap-6">
          <Spinner size={16} />
          <Spinner size={28} />
        </div>
      ),
    },
  ],
};

export default showcase;
