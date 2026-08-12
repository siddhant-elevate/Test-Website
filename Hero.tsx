"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ResearchGlobe, { NODES } from "./ResearchGlobe";
import DiaTextReveal from "./magicui/dia-text-reveal";

const stats = [
  { label: "Research notes", value: "120+" },
  { label: "Sectors covered", value: "7" },
  // Sourced from ResearchGlobe's own NODES array (not a separately
  // hand-typed figure), so it can't drift out of sync with what the
  // visualization actually shows.
  { label: "Companies covered", value: `${NODES.length}+` },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28 lg:pt-8">
      <div className="container-content relative grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            Independent equity research
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-6 max-w-2xl text-balance font-display text-[47px] font-medium leading-[1.06] tracking-[-0.01em] text-ink dark:text-white sm:text-[60px] md:text-[70px]"
          >
            <DiaTextReveal
              text="Research Beyond the Ordinary."
              startOnView={false}
              delay={0.55}
              duration={1.4}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="prose-editorial mt-7 max-w-lg text-[17px] md:text-[18.5px]"
          >
            Focussed analysis on unexplored mid and small caps with high
            potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14.5px] font-medium text-white shadow-soft transition-all duration-300 hover:bg-brand dark:bg-white dark:text-ink dark:hover:bg-brand-glow dark:hover:text-white"
            >
              Explore Research
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-[14px] text-ink-500 transition-colors duration-300 hover:border-black/20 hover:text-ink-700 dark:border-white/10 dark:text-paper-100/55 dark:hover:border-white/20 dark:hover:text-paper-100/85"
            >
              Join the Community
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-black/5 pt-8 dark:border-white/10"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2.5">
                <span className="font-mono text-[20px] text-ink dark:text-white">
                  {s.value}
                </span>
                <span className="text-[13px] text-ink-500 dark:text-paper-100/45">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="group mt-4 lg:col-span-6 lg:mt-0"
        >
          <ResearchGlobe />
          <p className="mt-6 text-center">
            <Link
              href="/research"
              className="font-mono text-[11.5px] uppercase tracking-widest2 text-ink-500 transition-colors duration-300 hover:text-brand dark:text-paper-100/45 dark:hover:text-brand-glow"
            >
              Explore the research universe →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
