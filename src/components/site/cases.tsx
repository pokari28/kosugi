"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { INDUSTRY_PROPOSALS } from "@/data/site";
import { ChevronIcon } from "./icons";
import { Chevron } from "./layout";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5000;

export function Cases() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageHidden, setPageHidden] = useState(false);
  const held = useRef(false);
  const reduceMotion = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const root = useRef<HTMLElement>(null);
  const current = INDUSTRY_PROPOSALS[index] ?? INDUSTRY_PROPOSALS[0];

  const go = useCallback((next: number, manual = false) => {
    const len = INDUSTRY_PROPOSALS.length;
    if (manual) held.current = true;
    setIndex(((next % len) + len) % len);
  }, []);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? true), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (held.current || hover || !inView || pageHidden || reduceMotion.current) return;
    const id = window.setInterval(() => go(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [go, hover, inView, index, pageHidden]);

  useEffect(() => {
    const onChange = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const fade = reduceMotion.current ? "none" : "opacity 600ms ease";

  return (
    <section
      id="cases"
      ref={root}
      className="scroll-mt-20 bg-paper py-16 md:py-24"
      aria-roledescription="carousel"
      aria-label="業種別ユニフォームのご提案例"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
      }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const touch = event.changedTouches[0];
        const dx = (touch?.clientX ?? touchStart.current.x) - touchStart.current.x;
        const dy = (touch?.clientY ?? touchStart.current.y) - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
        go(dx > 0 ? index - 1 : index + 1, true);
      }}
    >
      <div className="site-wrap">
        <div>
          <p className="en-label">PROPOSAL</p>
          <h2 className="section-title mt-3">業種別ユニフォームのご提案例</h2>
        </div>

        <div id="industry-slider" className="relative mt-8 md:mt-10">
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.72fr)] md:gap-10">
            <div id="industry-photo" className="relative aspect-[3/2] overflow-hidden bg-line">
              {INDUSTRY_PROPOSALS.map((item, i) => (
                <Link
                  key={item.id}
                  to="/cases"
                  search={{ industry: item.industry }}
                  className={cn("absolute inset-0", i === index ? "opacity-100" : "pointer-events-none opacity-0")}
                  style={{ transition: fade }}
                  tabIndex={i === index ? 0 : -1}
                  aria-hidden={i !== index}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className={cn("h-full w-full object-cover", item.imageClass)}
                    width={1536}
                    height={1024}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </Link>
              ))}
              <button
                type="button"
                className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-navy"
                aria-label="前の業種"
                onClick={() => go(index - 1, true)}
              >
                <ChevronIcon size={18} className="rotate-180" />
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-navy"
                aria-label="次の業種"
                onClick={() => go(index + 1, true)}
              >
                <ChevronIcon size={18} />
              </button>
            </div>

            <div className="min-h-[11.5rem]">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-navy/70">
                {String(index + 1).padStart(2, "0")} / {String(INDUSTRY_PROPOSALS.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[1.25rem] font-black tracking-[0.08em] text-navy">{current.title}</h3>
              <p className="mt-3 text-[15px] font-medium leading-7 tracking-[0.04em] text-navy">{current.catch}</p>
              <p className="mt-3 text-[13.5px] leading-7 text-soft">{current.body}</p>
              <Link to="/cases" search={{ industry: current.industry }} className="outline-btn mt-6">
                この業種の事例を見る
                <Chevron />
              </Link>
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {INDUSTRY_PROPOSALS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={cn("h-2 rounded-full", i === index ? "w-6 bg-yellow" : "w-2 bg-navy/25")}
                aria-label={`${item.title}を表示`}
                aria-current={i === index}
                onClick={() => go(i, true)}
              />
            ))}
          </div>
          <p className="mt-4 text-center text-[12px] leading-6 text-muted">掲載写真は着用イメージです。</p>
        </div>
      </div>
    </section>
  );
}