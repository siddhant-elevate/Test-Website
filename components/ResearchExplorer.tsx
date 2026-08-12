"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { Article, Category } from "@/lib/data";
import ResearchCard from "./ResearchCard";

export default function ResearchExplorer({
  articles,
  categories,
}: {
  articles: Article[];
  categories: { name: Category; description: string }[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<Category | null>(
    initialCategory && categories.some((c) => c.name === initialCategory)
      ? initialCategory
      : null
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => (activeCategory ? a.category === activeCategory : true))
      .filter((a) =>
        q
          ? a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
          : true
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [articles, query, activeCategory]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400 dark:text-paper-100/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search titles, tags, themes…"
            className="w-full rounded-full border border-black/10 bg-white py-2.5 pl-10 pr-9 text-[14.5px] text-ink placeholder:text-ink-400 outline-none focus:border-brand/50 dark:border-white/10 dark:bg-night-700 dark:text-paper dark:placeholder:text-paper-100/40"
          />
          {query && (
            <button
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink dark:text-paper-100/40 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="font-mono text-[12.5px] text-ink-400 dark:text-paper-100/40">
          {filtered.length} {filtered.length === 1 ? "note" : "notes"}
        </p>
      </div>

      <div
        id="categories"
        className="mt-6 flex flex-wrap gap-2.5 scroll-mt-28"
      >
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full border px-4 py-1.5 text-[13.5px] font-medium transition-colors duration-300 ${
            activeCategory === null
              ? "border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink"
              : "border-black/10 text-ink-600 hover:border-black/25 dark:border-white/15 dark:text-paper-100/70 dark:hover:border-white/30"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() =>
              setActiveCategory((curr) => (curr === c.name ? null : c.name))
            }
            className={`rounded-full border px-4 py-1.5 text-[13.5px] font-medium transition-colors duration-300 ${
              activeCategory === c.name
                ? "border-brand bg-brand text-white dark:border-brand-glow dark:bg-brand-glow dark:text-night"
                : "border-black/10 text-ink-600 hover:border-black/25 dark:border-white/15 dark:text-paper-100/70 dark:hover:border-white/30"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ResearchCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border border-dashed border-black/10 py-16 text-center dark:border-white/15">
          <p className="font-display text-[20px] text-ink dark:text-white">
            No notes match that search.
          </p>
          <p className="mt-2 text-[14.5px] text-ink-500 dark:text-paper-100/50">
            Try a different term, or clear the category filter.
          </p>
        </div>
      )}
    </div>
  );
}
