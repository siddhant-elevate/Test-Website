import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { formatDate } from "@/lib/research";
import type { Article } from "@/lib/research";
import SignatureLine from "./SignatureLine";

export function CategoryTag({ category }: { category: string }) {
  return (
    <span className="eyebrow inline-flex items-center gap-1.5">
      <span className="h-1 w-1 rounded-full bg-brand dark:bg-brand-glow" />
      {category}
    </span>
  );
}

export default function ResearchCard({
  article,
  variant = "default",
}: {
  article: Article;
  variant?: "default" | "feature";
}) {
  if (variant === "feature") {
    return (
      <Link
        href={`/research/${article.slug}`}
        className="card-surface group relative block overflow-hidden transition-all duration-500 ease-elevate hover:-translate-y-1 hover:shadow-glow"
      >
        <div className="relative overflow-hidden bg-night px-8 pb-10 pt-7 md:px-12 md:pt-9">
          <div className="flex items-center justify-between">
            <span className="eyebrow inline-flex items-center gap-1.5 text-brand-glow/90">
              <span className="h-1 w-1 rounded-full bg-brand-glow" />
              {article.category}
            </span>
            <span className="font-mono text-[11px] text-paper-100/40">
              {formatDate(article.date)}
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-20 text-brand-glow/70 transition-transform duration-700 ease-elevate group-hover:-translate-y-1 md:inset-x-12">
            <SignatureLine className="h-full w-full" animate={false} />
          </div>
          <div className="h-16 md:h-20" />
        </div>

        <div className="p-8 md:p-12 md:pt-8">
          <h3 className="max-w-2xl text-balance font-display text-[28px] font-medium leading-[1.18] text-ink dark:text-white md:text-[38px]">
            {article.title}
          </h3>

          <p className="prose-editorial mt-4 max-w-xl text-[16px] md:text-[17px]">
            {article.dek}
          </p>

          <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6 dark:border-white/10">
            <div className="flex items-center gap-2 font-mono text-[12.5px] text-ink-400 dark:text-paper-100/40">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readingTime} min read
            </div>
            <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand transition-transform duration-300 group-hover:translate-x-0.5 dark:text-brand-glow">
              Read the note
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/research/${article.slug}`}
      className="card-surface group flex h-full flex-col p-7 transition-all duration-500 ease-elevate hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center justify-between">
        <CategoryTag category={article.category} />
      </div>

      <h3 className="mt-5 text-balance font-display text-[21px] font-medium leading-snug text-ink dark:text-white">
        {article.title}
      </h3>

      <p className="prose-editorial mt-3 line-clamp-3 text-[14.5px]">
        {article.summary}
      </p>

      <div className="mt-auto flex items-center justify-between pt-6 text-[12.5px] font-mono text-ink-400 dark:text-paper-100/40">
        <span>{formatDate(article.date)}</span>
        <span className="flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />
          {article.readingTime} min
        </span>
      </div>
    </Link>
  );
}
