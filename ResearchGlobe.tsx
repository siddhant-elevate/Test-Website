"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Category } from "@/lib/data";

/**
 * The Research Globe — the hero's interactive centerpiece. A stylised
 * orbit (not a literal 3D sphere, and never a stock chart) representing
 * the universe of companies Elevate covers. Ring guides and ambient
 * points slowly rotate for a sense of motion; the labelled company
 * nodes stay at fixed positions — with a gentle independent float — so
 * they remain reliable click/hover targets.
 *
 * `NODES` is exported so Hero.tsx can source its "Companies covered"
 * stat from the same array rather than a separately hand-typed number.
 */

interface GlobeNode {
  id: string;
  name: string;
  sector: Category;
  slug: string;
  x: number; // percent, 0-100
  y: number; // percent, 0-100
  floatDuration: number;
  delay: number;
  /** One or two nodes get a subtle persistent accent + slightly larger radius. */
  emphasized?: boolean;
}

export const NODES: GlobeNode[] = [
  { id: "vantage-silicon", name: "Vantage Silicon", sector: "Technology", slug: "semiconductor-capex-supercycle-2026", x: 74, y: 20, floatDuration: 5, delay: 0, emphasized: true },
  { id: "corewave-systems", name: "Corewave Systems", sector: "Technology", slug: "semiconductor-capex-supercycle-2026", x: 57, y: 10, floatDuration: 6, delay: 0.4 },
  { id: "meridian-trust", name: "Meridian Trust Bank", sector: "Financials", slug: "private-credit-regional-bank-balance-sheets", x: 16, y: 30, floatDuration: 5.5, delay: 0.8 },
  { id: "harbor-point", name: "Harbor Point Financial", sector: "Financials", slug: "private-credit-regional-bank-balance-sheets", x: 10, y: 54, floatDuration: 4.5, delay: 1.2 },
  { id: "aurelia-therapeutics", name: "Aurelia Therapeutics", sector: "Healthcare", slug: "glp1-second-wave-consumer-health", x: 84, y: 48, floatDuration: 6.5, delay: 0.2, emphasized: true },
  { id: "praxis-industrial", name: "Praxis Industrial", sector: "Industrials", slug: "onshoring-industrial-real-estate", x: 26, y: 80, floatDuration: 5, delay: 0.6 },
  { id: "northfield-logistics", name: "Northfield Logistics", sector: "Industrials", slug: "onshoring-industrial-real-estate", x: 42, y: 90, floatDuration: 6, delay: 1 },
  { id: "litmus-consumer", name: "Litmus Consumer Group", sector: "Consumer", slug: "streaming-bundle-economics-reset", x: 68, y: 84, floatDuration: 5.5, delay: 1.4 },
  { id: "solvane-energy", name: "Solvane Energy", sector: "Energy", slug: "grid-electrification-power-demand", x: 88, y: 68, floatDuration: 4.5, delay: 0.3 },
  { id: "cascade-grid", name: "Cascade Grid Partners", sector: "Energy", slug: "grid-electrification-power-demand", x: 20, y: 12, floatDuration: 6, delay: 0.9 },
];

// Inner/middle/outer rings, each with deliberately different weight so
// the system reads as layered depth rather than three identical circles.
const RINGS = [
  { r: 18, className: "text-ink-500/35 dark:text-white/[0.16]", strokeWidth: 0.4, dash: "1 2" },
  { r: 30, className: "text-ink-400/20 dark:text-white/10", strokeWidth: 0.3, dash: "1 3" },
  { r: 42, className: "text-ink-400/12 dark:text-white/[0.06]", strokeWidth: 0.25, dash: "0.5 4.5" },
];

const AMBIENT_DOTS = [
  { x: 35, y: 20, r: 0.6, o: 0.5 },
  { x: 65, y: 15, r: 0.4, o: 0.4 },
  { x: 78, y: 35, r: 0.5, o: 0.35 },
  { x: 22, y: 45, r: 0.4, o: 0.4 },
  { x: 70, y: 60, r: 0.6, o: 0.3 },
  { x: 40, y: 75, r: 0.5, o: 0.4 },
  { x: 58, y: 80, r: 0.4, o: 0.35 },
  { x: 15, y: 65, r: 0.5, o: 0.3 },
  { x: 85, y: 55, r: 0.4, o: 0.4 },
  { x: 50, y: 8, r: 0.4, o: 0.3 },
];

// Every same-sector pair, computed once. Rendered permanently at a
// near-invisible baseline opacity, and brightened only for the group
// that matches whichever node is currently hovered/focused.
const SECTOR_GROUPS = NODES.reduce<Record<string, GlobeNode[]>>((acc, n) => {
  (acc[n.sector] ??= []).push(n);
  return acc;
}, {});

const AMBIENT_PAIRS: [GlobeNode, GlobeNode][] = Object.values(SECTOR_GROUPS).flatMap(
  (group) => {
    const pairs: [GlobeNode, GlobeNode][] = [];
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        pairs.push([group[i], group[j]]);
      }
    }
    return pairs;
  }
);

const EMPHASIZED = NODES.filter((n) => n.emphasized);

export default function ResearchGlobe() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const hovered = NODES.find((n) => n.id === hoveredId) ?? null;
  const spotlight = hovered ?? EMPHASIZED[0] ?? NODES[0];

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
        {/* Ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(30,62,130,0.10),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.14),transparent_70%)]"
        />
        {/* Hover/focus boost — activates when the "Explore the research
            universe" link (a sibling inside the shared .group in Hero.tsx)
            is hovered, tying the link visually to the visualization. */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(30,62,130,0.10),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.16),transparent_65%)]" />
        {/* Tighter, slightly brighter glow directly behind the center emblem */}
        <div className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(30,62,130,0.16),transparent_72%)] dark:bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.22),transparent_72%)]" />

        {/* Rotating ring guides + ambient points */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <motion.g
            style={{ transformOrigin: "50% 50%" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              reducedMotion
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 1, scale: 1, rotate: 360 }
            }
            transition={
              reducedMotion
                ? { opacity: { duration: 0.8, delay: 0.1 }, scale: { duration: 0.8, delay: 0.1 } }
                : {
                    opacity: { duration: 0.8, delay: 0.1 },
                    scale: { duration: 0.8, delay: 0.1 },
                    rotate: { duration: 110, repeat: Infinity, ease: "linear" },
                  }
            }
          >
            {RINGS.map((ring) => (
              <circle
                key={ring.r}
                cx={50}
                cy={50}
                r={ring.r}
                fill="none"
                stroke="currentColor"
                strokeWidth={ring.strokeWidth}
                strokeDasharray={ring.dash}
                className={ring.className}
              />
            ))}
            {AMBIENT_DOTS.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill="currentColor"
                opacity={d.o}
                className="text-ink-400/60 dark:text-white/30"
              />
            ))}
          </motion.g>
        </svg>

        {/* Sector connections — a faint permanent lattice, brightened for
            whichever sector is currently hovered/focused. */}
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-brand dark:text-brand-glow"
          aria-hidden="true"
        >
          {AMBIENT_PAIRS.map(([a, b]) => {
            const isHighlighted = hovered?.sector === a.sector;
            return (
              <motion.line
                key={`${a.id}-${b.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="currentColor"
                strokeWidth={isHighlighted ? 0.35 : 0.2}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHighlighted ? 0.55 : 0.08 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            );
          })}
        </svg>

        {/* Center emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={
            reducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: [0.7, 1, 1.045, 1] }
          }
          transition={
            reducedMotion
              ? { duration: 0.5, delay: 0.3 }
              : {
                  opacity: { duration: 0.5, delay: 0.3 },
                  scale: {
                    duration: 5,
                    delay: 0.3,
                    times: [0, 0.16, 0.5, 1],
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: "easeInOut",
                  },
                }
          }
          className="absolute left-1/2 top-1/2 flex h-[15%] w-[15%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/25 bg-white/90 font-display text-[11px] font-medium text-ink shadow-card backdrop-blur dark:border-brand-glow/30 dark:bg-night-700/90 dark:text-white sm:text-[15px]"
        >
          ER
        </motion.div>

        {/* Company nodes */}
        {NODES.map((node) => {
          const isActive = hoveredId === node.id;
          const isMate = !!hovered && hovered.sector === node.sector && !isActive;
          const isDimmed = !!hovered && hovered.sector !== node.sector;
          const isPulseTarget = !reducedMotion && node.id === EMPHASIZED[0]?.id;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* One-time entrance; separate from the continuous float below
                  so the two animations never fight over the same values. */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + node.delay * 0.25, ease: "easeOut" }}
              >
                <motion.div
                  animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{
                    duration: node.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: node.delay,
                  }}
                >
                  <Link
                    href={`/research/${node.slug}`}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId((curr) => (curr === node.id ? null : curr))}
                    onFocus={() => setHoveredId(node.id)}
                    onBlur={() => setHoveredId((curr) => (curr === node.id ? null : curr))}
                    className="group/node relative flex flex-col items-center outline-none"
                  >
                    {/* Subtle ring on hover/focus */}
                    <motion.span
                      aria-hidden="true"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 2.6 : 1,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute h-1.5 w-1.5 rounded-full border border-brand/60 dark:border-brand-glow/70"
                    />

                    {/* One-time pulse ring for the emphasized node, once on load */}
                    {isPulseTarget && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0.9, scale: 1 }}
                        animate={{ opacity: 0, scale: 3.2 }}
                        transition={{ duration: 1.1, delay: 1.7, ease: "easeOut" }}
                        className="absolute h-1.5 w-1.5 rounded-full bg-brand/50 dark:bg-brand-glow/50"
                      />
                    )}

                    <motion.span
                      animate={{
                        scale: isActive ? 1.9 : isMate ? 1.35 : node.emphasized ? 1.25 : 1,
                        opacity: isDimmed ? 0.3 : 1,
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive || isMate || node.emphasized
                          ? "bg-brand dark:bg-brand-glow"
                          : "bg-ink-400 dark:bg-white/60"
                      }`}
                    />
                    <motion.span
                      animate={{ opacity: isDimmed ? 0.25 : 1 }}
                      className={`mt-2 whitespace-nowrap text-[9px] sm:text-[10.5px] ${
                        isActive
                          ? "font-medium text-ink dark:text-white"
                          : "font-medium text-ink-700 dark:text-paper-100/80"
                      }`}
                    >
                      {node.name}
                    </motion.span>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[150px] -translate-x-1/2 rounded-xl border border-black/10 bg-white/95 px-3 py-2 text-left shadow-card backdrop-blur dark:border-white/10 dark:bg-night-700/95 dark:shadow-card-dark sm:max-w-[180px] sm:px-3.5 sm:py-2.5"
                        >
                          <p className="text-[12.5px] font-medium text-ink dark:text-white">
                            {node.name}
                          </p>
                          <p className="mt-0.5 font-mono text-[10.5px] text-ink-500 dark:text-paper-100/50">
                            {node.sector}
                          </p>
                          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-brand dark:text-brand-glow">
                            Read Research →
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Research spotlight card — reflects the hovered/focused node, or
          an emphasized node by default. Non-financial: only fields that
          actually exist on a node (name, sector, slug) are shown. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-6 w-full max-w-[220px] sm:absolute sm:bottom-2 sm:left-0 sm:mt-0 sm:max-w-[190px] sm:translate-y-1/3"
      >
        <Link
          href={`/research/${spotlight.slug}`}
          className="group block rounded-xl border border-black/10 bg-white/90 p-3.5 shadow-card backdrop-blur transition-colors duration-300 hover:border-brand/30 dark:border-white/10 dark:bg-night-700/90 dark:shadow-card-dark dark:hover:border-brand-glow/30"
        >
          <p className="font-mono text-[9.5px] uppercase tracking-widest2 text-brand dark:text-brand-glow">
            Research Spotlight
          </p>
          <p className="mt-2 font-display text-[14px] font-medium leading-snug text-ink dark:text-white">
            {spotlight.name}
          </p>
          <p className="mt-1 text-[11px] text-ink-500 dark:text-paper-100/50">
            {spotlight.sector} · Recently covered
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-ink-700 transition-colors duration-300 group-hover:text-brand dark:text-paper-100/70 dark:group-hover:text-brand-glow">
            View research →
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
