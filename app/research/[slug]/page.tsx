import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
  getLatestArticles,
  formatDate,
} from "@/lib/data";
import { CategoryTag } from "@/components/ResearchCard";
import ResearchSidebar from "@/components/ResearchSidebar";
import RelatedResearch from "@/components/RelatedResearch";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const moreResearch = getLatestArticles(article.slug, 6);
  const toc = article.sections.map((s) => ({ id: s.id, heading: s.heading }));
  const initials = article.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <article>
      <div className="container-content pt-14 md:pt-20">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-500 transition-colors hover:text-brand dark:text-paper-100/50 dark:hover:text-brand-glow"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All research
        </Link>

        <div className="mt-8 max-w-3xl">
          <CategoryTag category={article.category} />
          <h1 className="mt-4 text-balance font-display text-[34px] font-medium leading-[1.15] text-ink dark:text-white sm:text-[44px] md:text-[52px]">
            {article.title}
          </h1>
          <p className="prose-editorial mt-5 text-[17px] md:text-[18.5px]">
            {article.dek}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 border-y border-black/5 py-5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 font-mono text-[12px] font-medium text-brand dark:bg-brand-glow/10 dark:text-brand-glow">
                {initials}
              </span>
              <div className="leading-tight">
                <p className="text-[14px] font-medium text-ink dark:text-white">
                  {article.author}
                </p>
                {article.authorRole && (
                  <p className="text-[12.5px] text-ink-500 dark:text-paper-100/45">
                    {article.authorRole}
                  </p>
                )}
              </div>
            </div>
            <span className="hidden h-8 w-px bg-black/10 dark:bg-white/10 sm:block" />
            <span className="font-mono text-[13px] text-ink-500 dark:text-paper-100/45">
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[13px] text-ink-500 dark:text-paper-100/45">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readingTime} min read
            </span>
          </div>
        </div>
      </div>

      <div className="container-content mt-12 grid grid-cols-1 gap-12 pb-8 md:mt-16 lg:grid-cols-12 lg:gap-16">
        <aside className="order-2 hidden lg:order-1 lg:col-span-3 lg:block">
          <ResearchSidebar toc={toc} moreArticles={moreResearch} />
        </aside>

        <div className="order-1 lg:order-2 lg:col-span-8">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 pb-12 md:pb-14">
              <h2 className="font-display text-[24px] font-medium text-ink dark:text-white md:text-[27px]">
                {section.heading}
              </h2>
              <div
                className="prose-editorial mt-5"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            </section>
          ))}

          <div className="mt-4 flex flex-wrap gap-2 border-t border-black/5 pt-8 dark:border-white/10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 px-3 py-1 font-mono text-[11.5px] text-ink-500 dark:border-white/10 dark:text-paper-100/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-paper-100 p-6 text-[13px] leading-relaxed text-ink-500 dark:bg-night-700 dark:text-paper-100/50">
            <p className="mb-1.5 font-medium text-ink-700 dark:text-paper-100/70">
              Disclaimer
            </p>
            <p>
              This report is published for educational and informational
              purposes only. It is intended to help readers understand
              businesses, industries, and valuation frameworks, and does not
              constitute investment, legal, or tax advice, or a recommendation
              or solicitation to buy, sell, or hold any security. It does not
              include buy, sell, or hold ratings, price targets, expected
              returns, or personalized investment recommendations of any
              kind. Elevate Research is not a broker-dealer or registered
              investment adviser. The views expressed are those of the author
              as of the publication date and are subject to change without
              notice. Past performance is not indicative of future results.
              Readers should conduct their own due diligence and consult a
              licensed financial professional before making any investment
              decision.
            </p>
          </div>
        </div>
      </div>

      <RelatedResearch articles={related} />
    </article>
  );
}
