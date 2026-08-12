import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedArticle, getLatestArticles } from "@/lib/data";
import ResearchCard from "./ResearchCard";

export default function LatestResearch() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(featured.slug, 6).slice(2);

  return (
    <section className="bg-paper-100/50 py-20 dark:bg-night-800/60 md:py-28">
      <div className="container-content">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Latest</p>
            <h2 className="mt-3 font-display text-[30px] font-medium text-ink dark:text-white md:text-[36px]">
              Recently published
            </h2>
          </div>
          <Link
            href="/research"
            className="link-underline hidden text-[14.5px] font-medium text-ink-700 dark:text-paper-100/80 sm:inline-flex sm:items-center sm:gap-1.5"
          >
            View archive
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ResearchCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
