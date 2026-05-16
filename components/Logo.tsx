export default function Logo() {
  return (
    <div className="flex flex-col w-8 overflow-hidden shrink-0 border-b-2 aspect-square border border-grayscale-4 dark:border-grayscale-5 rounded-md">
      <div className="grid grid-cols-5 h-3/5 shrink-0">
        <div className="h-full w-full bg-white" />
        <div className="h-full w-full bg-grayscale-12/95 dark:bg-grayscale-1/95 border-b-2 border-b-grayscale-12 dark:border-b-grayscale-1 small-shadow" />
        <div className="h-full w-full bg-white" />
        <div className="h-full w-full bg-grayscale-12/95 dark:bg-grayscale-1/95 border-b-2 border-b-grayscale-12 dark:border-b-grayscale-1 small-shadow" />
        <div className="h-full w-full bg-white" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-grayscale-3 dark:divide-grayscale-11 h-full">
        <div className="h-full w-full bg-white" />
        <div className="h-full w-full bg-white" />
        <div className="h-full w-full bg-white" />
      </div>
    </div>
  );
}
