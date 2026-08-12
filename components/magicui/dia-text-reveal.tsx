"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Dia Text Reveal — a horizontal color band sweeps across text with a
 * gradient shine, then settles permanently on the surrounding text
 * color.
 *
 * Adapted from Magic UI's open-source "Dia Text Reveal" component
 * (https://magicui.design/docs/components/dia-text-reveal) for this
 * project's conventions:
 *  - `textColor` defaults to `currentColor` instead of a shadcn/ui
 *    `var(--foreground)` CSS variable (this project doesn't use CSS
 *    variable theming — it inherits ink/white via Tailwind `dark:`
 *    classes on the parent element instead).
 *  - Default `colors` use the site's brand/brass palette instead of
 *    Magic UI's stock multi-color rainbow, to stay on-brand.
 *  - No `cn()`/clsx dependency, matching the rest of this codebase.
 *
 * Implementation note: the gradient/`background-clip: text` trick is
 * only active *during* the sweep. The moment it finishes, the
 * component switches to a plain `<span style={{ color: textColor }}>`
 * with none of the gradient machinery left in the DOM — so the
 * "settled" state can never depend on a background-position edge case
 * staying exactly right; it's just normal, static solid-colored text.
 * Two independent triggers (Framer Motion's `onAnimationComplete` and
 * a timeout fallback) make that switch, so it can't get stuck showing
 * the transparent/gradient style if one of them doesn't fire.
 */

interface DiaTextRevealProps {
  /** Text to display. Pass an array to rotate between strings when `repeat` is on. */
  text: string | string[];
  /** Colors in the sweeping gradient band. */
  colors?: string[];
  /** Solid text color once the sweep settles. Defaults to inherited text color. */
  textColor?: string;
  /** Sweep duration in seconds. */
  duration?: number;
  /** Delay before the sweep starts, in seconds. */
  delay?: number;
  /** When `text` is an array, advance to the next string after each cycle. */
  repeat?: boolean;
  /** Pause in seconds before replaying/advancing (when `repeat` is true). */
  repeatDelay?: number;
  /** Start the animation when the element enters the viewport. */
  startOnView?: boolean;
  /** Play only the first time (when `startOnView` is used). */
  once?: boolean;
  /** Additional classes on the root element. */
  className?: string;
  /** Lock width to the widest string when `text` is an array, to avoid layout shift. */
  fixedWidth?: boolean;
}

const DEFAULT_COLORS = ["#5B8CFF", "#C9A968"];

function buildGradient(colors: string[], textColor: string): string {
  const stops = colors.length > 0 ? colors : DEFAULT_COLORS;
  const n = stops.length;
  const band = stops
    .map((c, i) => {
      const pct = n === 1 ? 50 : 42 + (i / (n - 1)) * 16;
      return `${c} ${pct}%`;
    })
    .join(", ");
  return `linear-gradient(100deg, ${textColor} 0%, ${textColor} 33%, ${band}, ${textColor} 67%, ${textColor} 100%)`;
}

export default function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "currentColor",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className = "",
  fixedWidth = false,
}: DiaTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.6 });
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [settled, setSettled] = useState(false);

  const items = Array.isArray(text) ? text : [text];
  const current = items[index % items.length];
  const shouldAnimate = startOnView ? inView : true;
  const sweeping = shouldAnimate && !settled;

  // Reset to the un-settled (sweeping) state whenever a new sweep is
  // about to start — first trigger, or a new cycle when `repeat` is on.
  useEffect(() => {
    if (shouldAnimate) setSettled(false);
  }, [shouldAnimate, cycle]);

  // Safety-net: force-settle shortly after the sweep should have
  // finished, independent of whether onAnimationComplete fires.
  useEffect(() => {
    if (!sweeping) return;
    const id = setTimeout(
      () => setSettled(true),
      (delay + duration) * 1000 + 50
    );
    return () => clearTimeout(id);
  }, [sweeping, cycle, delay, duration]);

  useEffect(() => {
    if (!repeat || items.length < 2 || !shouldAnimate) return;
    const totalMs = (delay + duration + repeatDelay) * 1000;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
      setCycle((c) => c + 1);
    }, totalMs);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnimate, index, repeat, items.length, delay, duration, repeatDelay]);

  const style: CSSProperties = sweeping
    ? {
        backgroundImage: buildGradient(colors, textColor),
        backgroundSize: "300% 100%",
        backgroundRepeat: "no-repeat",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }
    : { color: textColor };

  const body =
    fixedWidth && items.length > 1 ? (
      <span
        className="inline-block"
        style={{ minWidth: `${Math.max(...items.map((t) => t.length))}ch` }}
      >
        {current}
      </span>
    ) : (
      current
    );

  if (!sweeping) {
    // Fully settled: plain span, nothing fancy left in the DOM.
    return (
      <span ref={ref} className={className} style={style}>
        {body}
      </span>
    );
  }

  return (
    <motion.span
      key={cycle}
      ref={ref}
      className={className}
      style={style}
      initial={{ backgroundPositionX: "0%" }}
      animate={{ backgroundPositionX: "100%" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => setSettled(true)}
    >
      {body}
    </motion.span>
  );
}
