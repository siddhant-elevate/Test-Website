import Link from "next/link";
import type { Article } from "@/lib/data";
import TableOfContents from "./TableOfContents";

export default function ResearchSidebar({
  toc,
  moreArticles,
}: {
  toc: { id: string; heading: string }[];
  moreArticles: Article[];
}) {
  return (
    <div className="sticky top-28 space-y-10">
      <TableOfContents items={toc} />

      {moreArticles.length > 0 && (
        <div>
          <p className="eyebrow">More research</p>
          <ul className="mt-4 space-y-3 border-l border-black/10 dark:border-white/10">
            {moreArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/research/${article.slug}`}
                  className="-ml-px block border-l border-transparent pl-4 text-[13px] leading-snug text-ink-500 transition-colors duration-300 hover:border-black/20 hover:text-ink dark:text-paper-100/45 dark:hover:border-white/20 dark:hover:text-paper-100/80"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
