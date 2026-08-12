import type { Article } from "@/lib/research";
import ResearchCard from "./ResearchCard";

export default function RelatedResearch({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <div className="container-content">
        <p className="eyebrow">Continue reading</p>
        <h2 className="mt-3 font-display text-[26px] font-medium text-ink dark:text-white md:text-[30px]">
          Related research
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ResearchCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
