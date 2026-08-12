import Link from "next/link";
import { ArrowRight } from "lucide-react";

const principles = [
  {
    title: "No banking relationships",
    body: "We don't underwrite securities or advise the companies we cover, so there's no deal pipeline to protect.",
  },
  {
    title: "Analysts, not salespeople",
    body: "Every note carries a named analyst who stands behind the thesis — not a committee-smoothed house view.",
  },
  {
    title: "Read the disagreement",
    body: "We publish the case against our own thesis in every note, not just the case for it.",
  },
];

export default function AboutTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-content grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">About Elevate</p>
          <h2 className="mt-3 text-balance font-display text-[30px] font-medium leading-tight text-ink dark:text-white md:text-[36px]">
            Independent by design, not by accident.
          </h2>
          <p className="prose-editorial mt-6 max-w-md text-[16px]">
            Elevate Research was built on a simple premise: the best research
            is written by people with nothing to sell. We publish rigorous,
            long-form equity analysis for investors who want the reasoning,
            not just the rating.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-[14.5px] font-medium text-brand dark:text-brand-glow"
          >
            Our full story
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="card-surface p-7 transition-transform duration-500 ease-elevate hover:-translate-y-1"
            >
              <span className="font-mono text-[12px] text-brand dark:text-brand-glow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[17px] font-medium text-ink dark:text-white">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-500 dark:text-paper-100/50">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
