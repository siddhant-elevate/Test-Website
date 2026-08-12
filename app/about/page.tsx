import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Elevate Research is an independent equity research platform with no banking relationships and no sales desk to please.",
};

const method = [
  {
    step: "01",
    title: "Source",
    body: "Every note starts with primary work: filings, transcripts, channel checks, and — where it matters — original data collection, not consensus estimates re-packaged.",
  },
  {
    step: "02",
    title: "Model",
    body: "Analysts build and stress-test their own models. We publish the assumptions that drive the thesis, not just the output of it.",
  },
  {
    step: "03",
    title: "Disclose",
    body: "Named analysts, disclosed positions, and the strongest case against our own thesis — printed in the note itself, not buried in a footnote.",
  },
  {
    step: "04",
    title: "Publish",
    body: "No pre-briefing of clients, no early looks for anyone. Every subscriber sees a note at the same time, in full.",
  },
];

const team = [
  {
    name: "Daniel Okafor",
    role: "Senior Analyst, Technology",
    bio: "Covers semiconductors and AI infrastructure. Previously built and ran a supply-chain data practice before joining Elevate at founding.",
  },
  {
    name: "Mara Lindqvist",
    role: "Macro Strategist",
    bio: "Focuses on rates, power markets, and the intersection of fiscal policy and cross-asset positioning.",
  },
  {
    name: "Priya Raman",
    role: "Analyst, Financials",
    bio: "Covers banks and private credit, with a focus on balance-sheet forensics and off-balance-sheet exposure.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="container-content pt-16 pb-4 md:pt-24">
        <p className="eyebrow">About Elevate</p>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-[38px] font-medium leading-[1.12] text-ink dark:text-white sm:text-[48px] md:text-[58px]">
          Independent research, built the way it should have been all along.
        </h1>
        <p className="prose-editorial mt-7 max-w-xl text-[17px] md:text-[18px]">
          Elevate Research was founded on a simple observation: the research
          that moves markets is too often written by people with a deal to
          protect. We built a platform where the analyst&rsquo;s only client
          is the reader.
        </p>
      </div>

      <section className="container-content py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[26px] font-medium text-ink dark:text-white md:text-[30px]">
              Why we started
            </h2>
            <div className="prose-editorial mt-5 space-y-6">
              <p>
                Most equity research is still shaped by the economics of the
                institutions that publish it — banking relationships,
                distribution deals, and the quiet pressure to keep ratings
                palatable to the companies being covered. None of that is a
                secret, but it rarely shows up in the note itself.
              </p>
              <p>
                We started Elevate to see what research looks like without
                those incentives in the room: longer notes when the topic
                deserves it, shorter ones when it doesn&rsquo;t, and a
                standing invitation to argue with our own conclusions.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <blockquote className="border-l-2 border-brass pl-6 font-display text-[22px] italic leading-snug text-ink dark:border-brass-light dark:text-white/90">
              &ldquo;The reader is the only client we have to keep happy.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      <section id="method" className="scroll-mt-24 border-t border-black/5 py-16 dark:border-white/10 md:py-20">
        <div className="container-content">
          <p className="eyebrow">Our method</p>
          <h2 className="mt-3 max-w-lg text-balance font-display text-[28px] font-medium text-ink dark:text-white md:text-[34px]">
            The same four steps, on every note we publish
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((m) => (
              <div key={m.step} className="bg-paper p-7 dark:bg-night-800">
                <span className="font-mono text-[12px] text-brass dark:text-brass-light">
                  {m.step}
                </span>
                <h3 className="mt-3 font-display text-[18px] font-medium text-ink dark:text-white">
                  {m.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500 dark:text-paper-100/50">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-content">
          <p className="eyebrow">The desk</p>
          <h2 className="mt-3 max-w-lg text-balance font-display text-[28px] font-medium text-ink dark:text-white md:text-[34px]">
            A small team, on purpose
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {team.map((t) => (
              <div key={t.name} className="card-surface p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 font-mono text-[13px] font-medium text-brand dark:bg-brand-glow/10 dark:text-brand-glow">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 font-display text-[17px] font-medium text-ink dark:text-white">
                  {t.name}
                </h3>
                <p className="text-[13px] text-brand dark:text-brand-glow">
                  {t.role}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-500 dark:text-paper-100/50">
                  {t.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="disclosures"
        className="scroll-mt-24 border-t border-black/5 py-16 dark:border-white/10 md:py-20"
      >
        <div className="container-content grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Disclosures</p>
            <h2 className="mt-3 font-display text-[26px] font-medium text-ink dark:text-white md:text-[30px]">
              How we handle conflicts
            </h2>
          </div>
          <div className="prose-editorial lg:col-span-7 lg:col-start-6 text-[15px]">
            <p>
              Elevate Research is published for educational and
              informational purposes only. It is an independent publisher of
              equity research and is not a broker-dealer or registered
              investment adviser. Nothing published on this site constitutes
              investment, legal, or tax advice, or an offer or solicitation
              to buy or sell any security, and our notes do not include buy,
              sell, or hold ratings, price targets, or personalized
              investment recommendations.
            </p>
            <p>
              Analysts may hold positions in securities they cover; where
              that is the case, it is disclosed within the note itself.
              Elevate Research does not accept compensation from the
              companies covered in its research in exchange for coverage.
              Views expressed reflect the judgment of the named analyst as of
              the publication date and are subject to change without notice.
            </p>
            <p>
              Past performance discussed in any note is not indicative of
              future results. Readers are responsible for their own
              investment decisions and should consult a licensed financial
              professional before acting on anything published here.
            </p>
            <Link
              href="/research"
              className="group mt-2 inline-flex items-center gap-2 text-[14.5px] font-medium text-brand dark:text-brand-glow"
            >
              Read the research
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
