"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Sectors", href: "/research#categories" },
  { label: "Community", href: "/#newsletter" },
  { label: "Insights", href: "/research" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/research?q=${encodeURIComponent(q)}` : "/research");
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 dark:bg-night/85 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-content flex h-[72px] items-center justify-between gap-4">
        <Logo height={26} priority />

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline text-[14.5px] font-medium text-ink-700 dark:text-paper-100/85 hover:text-ink dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center">
            <AnimatePresence initial={false} mode="wait">
              {searchOpen ? (
                <motion.form
                  key="search-input"
                  onSubmit={submitSearch}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    type="text"
                    placeholder="Search research…"
                    className="w-full rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-sm text-ink placeholder:text-ink-400 outline-none focus:border-brand/50 dark:border-white/10 dark:bg-night-700/70 dark:text-paper dark:placeholder:text-paper-100/40"
                  />
                </motion.form>
              ) : (
                <motion.button
                  key="search-icon"
                  type="button"
                  aria-label="Search research"
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-500 transition-colors duration-300 hover:border-brand/40 hover:text-brand dark:border-white/10 dark:text-paper-100/70 dark:hover:border-brand-glow/40 dark:hover:text-brand-glow"
                >
                  <Search className="h-[16px] w-[16px]" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-500 dark:border-white/10 dark:text-paper-100/70 md:hidden"
          >
            {mobileOpen ? <X className="h-[17px] w-[17px]" /> : <Menu className="h-[17px] w-[17px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-black/5 bg-paper dark:border-white/5 dark:bg-night"
          >
            <div className="container-content flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-black/[0.03] dark:text-paper-100/85 dark:hover:bg-white/[0.04]"
                >
                  {link.label}
                </Link>
              ))}
              <form onSubmit={submitSearch} className="mt-2 px-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search research…"
                  className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink placeholder:text-ink-400 outline-none focus:border-brand/50 dark:border-white/10 dark:bg-night-700 dark:text-paper dark:placeholder:text-paper-100/40"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
