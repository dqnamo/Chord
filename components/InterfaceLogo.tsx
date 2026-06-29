import Link from "next/link";

export default function InterfaceLogo() {
  return (
    <Link href="https://interface.london" target="_blank" className="flex flex-col gap-px items-center opacity-50 hover:opacity-100 transition-opacity duration-200">
      <span className="font-arvo  text-xs text-grayscale-11 leading-none uppercase">The</span>
      <span className="font-arvo font-medium text-lg text-grayscale-12 leading-none uppercase">Interface</span>
      <span className="font-arvo font-medium text-lg text-grayscale-12 leading-none uppercase">Company</span>
      <span className="font-arvo text-xs text-grayscale-11 mt-0.5 leading-none uppercase">of London</span>
    </Link>
  );
}