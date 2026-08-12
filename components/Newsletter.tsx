"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import SignatureLine from "./SignatureLine";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section id="newsletter" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-content">
        <div className="card-surface relative overflow-hidden px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 text-brand/[0.06] dark:text-brand-glow/[0.08]">
            <SignatureLine
              className="h-full w-full"
              animate={false}
              markerEnd={false}
            />
          </div>

          <div className="relative">
            <p className="eyebrow justify-center">The Sunday Note</p>
            <h2 className="mx-auto mt-4 max-w-lg text-balance font-display text-[30px] font-medium leading-tight text-ink dark:text-white md:text-[38px]">
              One email, every Sunday. Nothing in between.
            </h2>
            <p className="prose-editorial mx-auto mt-4 max-w-md text-[15.5px]">
              A short digest of what we published this week and what we&rsquo;re
              watching next — no daily noise, no sponsored placements.
            </p>

            {submitted ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-brand/10 px-6 py-3 text-[14.5px] font-medium text-brand dark:bg-brand-glow/10 dark:text-brand-glow">
                <Check className="h-4 w-4" />
                You&rsquo;re on the list.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full flex-1 rounded-full border border-black/10 bg-white px-5 py-3 text-[14.5px] text-ink placeholder:text-ink-400 outline-none focus:border-brand/50 dark:border-white/10 dark:bg-night-700 dark:text-paper dark:placeholder:text-paper-100/40"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[14.5px] font-medium text-white transition-all duration-300 hover:bg-brand dark:bg-white dark:text-ink dark:hover:bg-brand-glow dark:hover:text-white"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}

            <p className="mt-5 text-[12px] text-ink-400 dark:text-paper-100/35">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
