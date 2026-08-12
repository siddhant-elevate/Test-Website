import Link from "next/link";
import Logo from "./Logo";
import { categories } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-paper-100/60 dark:border-white/5 dark:bg-night-800">
      <div className="container-content py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo height={26} />
            <p className="mt-5 max-w-[30ch] text-[14.5px] leading-relaxed text-ink-500 dark:text-paper-100/50">
              Independent equity research for investors who read past the
              headline.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 md:col-start-6">
            <p className="eyebrow mb-4">Research</p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/research"
                  className="link-underline text-[14.5px] text-ink-700 dark:text-paper-100/75"
                >
                  All research
                </Link>
              </li>
              {categories.slice(0, 4).map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/research?category=${encodeURIComponent(c.name)}`}
                    className="link-underline text-[14.5px] text-ink-700 dark:text-paper-100/75"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <p className="eyebrow mb-4">Elevate Research</p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="link-underline text-[14.5px] text-ink-700 dark:text-paper-100/75"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/about#method"
                  className="link-underline text-[14.5px] text-ink-700 dark:text-paper-100/75"
                >
                  Our method
                </Link>
              </li>
              <li>
                <Link
                  href="/about#disclosures"
                  className="link-underline text-[14.5px] text-ink-700 dark:text-paper-100/75"
                >
                  Disclosures
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2.5 text-[14.5px] text-ink-700 dark:text-paper-100/75">
              <li>
                <a href="mailto:desk@elevateresearch.com" className="link-underline">
                  desk@elevateresearch.com
                </a>
              </li>
              <li className="text-ink-500 dark:text-paper-100/50">
                New York · London
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-black/5 pt-8 dark:border-white/5 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-ink-500 dark:text-paper-100/40">
            © {year} Elevate Research. All rights reserved.
          </p>
          <p className="max-w-2xl text-[12.5px] leading-relaxed text-ink-500 dark:text-paper-100/40">
            For educational and informational purposes only. Nothing on this
            site constitutes investment, legal, or tax advice, or an offer to
            buy or sell any security. See our{" "}
            <Link href="/about#disclosures" className="link-underline">
              full disclosures
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
