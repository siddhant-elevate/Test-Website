import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/research";

export default function CategoryRail() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-content">
        <p className="eyebrow">Coverage</p>
        <h2 className="mt-3 max-w-lg text-balance font-display text-[30px] font-medium text-ink dark:text-white md:text-[36px]">
          Seven sectors, one standard of rigor
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Link
              key={c.name}
              href={`/research?category=${encodeURIComponent(c.name)}`}
              className="group relative flex flex-col justify-between bg-paper p-8 transition-colors duration-300 hover:bg-white dark:bg-night-800 dark:hover:bg-night-700 min-h-[168px]"
            >
              <span className="font-mono text-[12px] text-ink-400 dark:text-paper-100/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[19px] font-medium text-ink dark:text-white">
                  {c.name}
                </h3>
                <p className="mt-1.5 max-w-[26ch] text-[13.5px] leading-relaxed text-ink-500 dark:text-paper-100/45">
                  {c.description}
                </p>
              </div>
              <ArrowUpRight className="absolute right-7 top-7 h-4 w-4 text-ink-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-paper-100/40" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
