export default function Section({
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"div">) {
  return (
    <div className="flex flex-col" {...props}>
      <div className="flex flex-col max-w-4xl mx-auto w-full border-x border-grayscale-3 dark:border-grayscale-2 p-4 md:p-8 lg:p-16">
        {props.children}
      </div>
    </div>
  );
}
