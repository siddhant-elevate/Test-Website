"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ResearchGlobe from "./ResearchGlobe";
import DiaTextReveal from "./magicui/dia-text-reveal";

const stats = [
  { label: "Research notes", value: "120+" },
  { label: "Sectors covered", value: "7" },
  { label: "Founded", value: "2024" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
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
            className="mt-6 max-w-xl text-balance font-display text-[42px] font-medium leading-[1.08] tracking-[-0.01em] text-ink dark:text-white sm:text-[54px] md:text-[62px]"
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
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14.5px] font-medium text-white transition-all duration-300 hover:bg-brand dark:bg-white dark:text-ink dark:hover:bg-brand-glow dark:hover:text-white"
            >
              Explore Research
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-[14.5px] font-medium text-ink-700 transition-colors duration-300 hover:border-brand/40 hover:text-brand dark:border-white/15 dark:text-paper-100/85 dark:hover:border-brand-glow/40 dark:hover:text-brand-glow"
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
          className="mt-4 lg:col-span-6 lg:mt-0"
        >
          <ResearchGlobe />
          <p className="mt-6 text-center">
            <Link
              href="/research"
              className="link-underline text-[13.5px] font-medium text-ink-700 dark:text-paper-100/70"
            >
              Explore our research universe →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
