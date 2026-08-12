import Image from "next/image";
import Link from "next/link";

const ASPECT = 1495 / 211;

export default function Logo({
  height = 30,
  withLink = true,
  priority = false,
}: {
  height?: number;
  withLink?: boolean;
  priority?: boolean;
}) {
  const width = Math.round(height * ASPECT);

  const img = (
    <span className="relative inline-flex items-center" style={{ height, width }}>
      <Image
        src="/logo.png"
        alt="Elevate Research"
        width={width}
        height={height}
        priority={priority}
        className="block dark:hidden object-contain object-left"
      />
      <Image
        src="/logo-dark.png"
        alt="Elevate Research"
        width={width}
        height={height}
        priority={priority}
        className="hidden dark:block object-contain object-left"
      />
    </span>
  );

  if (!withLink) return img;

  return (
    <Link
      href="/"
      aria-label="Elevate Research — home"
      className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
    >
      {img}
    </Link>
  );
}
