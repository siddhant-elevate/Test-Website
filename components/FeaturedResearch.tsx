import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedArticle, getLatestArticles } from "@/lib/data";
import { formatDate } from "@/lib/research";
import ResearchCard, { CategoryTag } from "./ResearchCard";

export default function FeaturedResearch() {
  const featured = getFeaturedArticle();
  const secondary = getLatestArticles(featured.slug, 2);

  return (
    <section className="py-20 md:py-28">
      <div className="container-content">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="mt-3 font-display text-[30px] font-medium text-ink dark:text-white md:text-[36px]">
              This week&rsquo;s lead note
            </h2>
          </div>
          <Link
            href="/research"
            className="link-underline hidden text-[14.5px] font-medium text-ink-700 dark:text-paper-100/80 sm:inline-flex sm:items-center sm:gap-1.5"
          >
            All research
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ResearchCard article={featured} variant="feature" />
          </div>

          <div className="flex flex-col gap-6">
            {secondary.map((article) => (
              <Link
                key={article.slug}
                href={`/research/${article.slug}`}
                className="card-surface group flex flex-1 flex-col justify-between p-6 transition-all duration-500 ease-elevate hover:-translate-y-1 hover:shadow-glow"
              >
                <div>
                  <CategoryTag category={article.category} />
                  <h3 className="mt-3 text-balance font-display text-[18px] font-medium leading-snug text-ink dark:text-white">
                    {article.title}
                  </h3>
                </div>
                <div className="mt-5 flex items-center justify-between font-mono text-[11.5px] text-ink-400 dark:text-paper-100/40">
                  <span>{formatDate(article.date)}</span>
                  <span>{article.readingTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
