type LogoProps = {
  textMark?: boolean;
};

export default function Logo({ textMark = false }: LogoProps) {
  return (
    <div className="flex flex-row items-center gap-1.5">
      <div className="flex flex-row gap-0.5">
        <div className="h-5 w-1.5 bg-orange-9"></div>
        <div className="h-5 w-1.5 bg-cyan-9"></div>
        <div className="h-5 w-1.5 bg-sky-9"></div>
      </div>
      {textMark ? <span className="font-mono uppercase font-bold text-2xl text-grayscale-12 leading-none">Chord</span> : null}
    </div>
  )
}