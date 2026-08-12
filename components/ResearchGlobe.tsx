"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "@/lib/data";

/**
 * The Research Globe — the hero's interactive centerpiece. A stylised
 * orbit (not a literal 3D sphere, and never a stock chart) representing
 * the universe of companies Elevate covers. Ring guides and ambient
 * points slowly rotate for a sense of motion; the labelled company
 * nodes stay at fixed positions — with a gentle independent float — so
 * they remain reliable click/hover targets.
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
}

const NODES: GlobeNode[] = [
  { id: "vantage-silicon", name: "Vantage Silicon", sector: "Technology", slug: "semiconductor-capex-supercycle-2026", x: 74, y: 20, floatDuration: 5, delay: 0 },
  { id: "corewave-systems", name: "Corewave Systems", sector: "Technology", slug: "semiconductor-capex-supercycle-2026", x: 57, y: 10, floatDuration: 6, delay: 0.4 },
  { id: "meridian-trust", name: "Meridian Trust Bank", sector: "Financials", slug: "private-credit-regional-bank-balance-sheets", x: 16, y: 30, floatDuration: 5.5, delay: 0.8 },
  { id: "harbor-point", name: "Harbor Point Financial", sector: "Financials", slug: "private-credit-regional-bank-balance-sheets", x: 10, y: 54, floatDuration: 4.5, delay: 1.2 },
  { id: "aurelia-therapeutics", name: "Aurelia Therapeutics", sector: "Healthcare", slug: "glp1-second-wave-consumer-health", x: 84, y: 48, floatDuration: 6.5, delay: 0.2 },
  { id: "praxis-industrial", name: "Praxis Industrial", sector: "Industrials", slug: "onshoring-industrial-real-estate", x: 26, y: 80, floatDuration: 5, delay: 0.6 },
  { id: "northfield-logistics", name: "Northfield Logistics", sector: "Industrials", slug: "onshoring-industrial-real-estate", x: 42, y: 90, floatDuration: 6, delay: 1 },
  { id: "litmus-consumer", name: "Litmus Consumer Group", sector: "Consumer", slug: "streaming-bundle-economics-reset", x: 68, y: 84, floatDuration: 5.5, delay: 1.4 },
  { id: "solvane-energy", name: "Solvane Energy", sector: "Energy", slug: "grid-electrification-power-demand", x: 88, y: 68, floatDuration: 4.5, delay: 0.3 },
  { id: "cascade-grid", name: "Cascade Grid Partners", sector: "Energy", slug: "grid-electrification-power-demand", x: 20, y: 12, floatDuration: 6, delay: 0.9 },
];

const RINGS = [18, 30, 42];

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

export default function ResearchGlobe() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hovered = NODES.find((n) => n.id === hoveredId) ?? null;
  const sectorMates = hovered ? NODES.filter((n) => n.sector === hovered.sector) : [];

  const linkPairs: [GlobeNode, GlobeNode][] = [];
  for (let i = 0; i < sectorMates.length; i++) {
    for (let j = i + 1; j < sectorMates.length; j++) {
      linkPairs.push([sectorMates[i], sectorMates[j]]);
    }
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(30,62,130,0.10),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.14),transparent_70%)]" />

      {/* Slowly rotating ring guides + ambient points */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-ink-400/25 dark:text-white/10"
        aria-hidden="true"
      >
        <motion.g
          style={{ transformOrigin: "50% 50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        >
          {RINGS.map((r) => (
            <circle
              key={r}
              cx={50}
              cy={50}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.3}
              strokeDasharray="1 3"
            />
          ))}
          {AMBIENT_DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="currentColor" opacity={d.o} />
          ))}
        </motion.g>
      </svg>

      {/* Sector connecting lines (fixed positions, not rotating) */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-brand dark:text-brand-glow"
        aria-hidden="true"
      >
        <AnimatePresence>
          {linkPairs.map(([a, b]) => (
            <motion.line
              key={`${a.id}-${b.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="currentColor"
              strokeWidth={0.35}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Center emblem */}
      <motion.div
        animate={{ scale: [1, 1.045, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 flex h-[15%] w-[15%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/20 bg-white/90 font-display text-[11px] font-medium text-ink shadow-card backdrop-blur dark:border-brand-glow/25 dark:bg-night-700/90 dark:text-white sm:text-[15px]"
      >
        ER
      </motion.div>

      {/* Company nodes */}
      {NODES.map((node) => {
        const isActive = hoveredId === node.id;
        const isMate = !!hovered && hovered.sector === node.sector && !isActive;
        const isDimmed = !!hovered && hovered.sector !== node.sector;

        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
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
                className="group relative flex flex-col items-center outline-none"
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.9 : isMate ? 1.35 : 1,
                    opacity: isDimmed ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive || isMate
                      ? "bg-brand dark:bg-brand-glow"
                      : "bg-ink-400 dark:bg-white/60"
                  }`}
                />
                <motion.span
                  animate={{ opacity: isDimmed ? 0.25 : 1 }}
                  className="mt-2 whitespace-nowrap text-[9px] font-medium text-ink-700 dark:text-paper-100/80 sm:text-[10.5px]"
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
          </div>
        );
      })}
    </div>
  );
}
