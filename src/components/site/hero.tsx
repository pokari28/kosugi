"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/data/site";
import { asset } from "@/lib/paths";
import { BuildingIcon, ChevronIcon, HandsIcon, ShirtIcon, SlidePointIcon } from "./icons";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5000;

const MAIN_FEATURES = [
  { icon: BuildingIcon, lines: ["秋田・庄内エリア中心", "約1,000社の取引実績"] },
  { icon: ShirtIcon, lines: ["豊富な品揃えと", "最適なご提案力"] },
  { icon: HandsIcon, lines: ["外商部門の", "提案型営業"] },
] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((next: number) => {
    const len = HERO_SLIDES.length;
    setIndex(((next % len) + len) % len);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current) return;
    const id = window.setInterval(() => go(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const current = HERO_SLIDES[index] ?? HERO_SLIDES[0];
  const isMain = current.id === "main";
  const fade = reduceMotion.current ? "none" : "opacity 700ms ease";
  const light = current.tone === "light";

  return (
    <section
      className="snap-hero relative overflow-hidden bg-paper"
      aria-roledescription="carousel"
      aria-label="メインビジュアル"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
      }}
      onTouchEnd={(e) => {
        if (!touchStart.current) return;
        const t = e.changedTouches[0];
        const dx = (t?.clientX ?? touchStart.current.x) - touchStart.current.x;
        const dy = (t?.clientY ?? touchStart.current.y) - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx > 0) go(index - 1);
        else go(index + 1);
      }}
    >
      <div
        className={cn(
          "snap-hero-stage relative overflow-hidden",
          isMain
            ? "min-h-[420px] md:min-h-[560px] lg:min-h-[640px]"
            : "h-[min(78vw,680px)] min-h-[420px] md:min-h-[580px] lg:min-h-[640px]",
        )}
      >
        {HERO_SLIDES.map((item, i) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.alt}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              item.imageClass,
              i === index ? "opacity-100" : "opacity-0",
            )}
            style={{ transition: fade }}
            width={1536}
            height={1024}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        ))}

        <div className="site-wrap relative z-[2] flex h-full flex-col justify-end pb-10 pt-[5.75rem] md:justify-center md:pb-16 md:pt-32 lg:pb-20 lg:pt-36">
          <div className="max-w-[46rem]" key={current.id}>
            <h1
              className={cn(
                "hero-title",
                light ? "text-navy" : "text-paper [text-shadow:0_1px_10px_rgb(0_0_0_/_0.28)]",
              )}
            >
              {current.heading[0]}
              <br />
              {current.heading[1]}
            </h1>
            <p
              className={cn(
                "hero-lead",
                light ? "text-navy/85" : "text-paper/95",
              )}
            >
              {current.lead}
            </p>
          </div>

          {isMain ? (
            <>
              <ul className="mt-10 grid max-w-[34rem] grid-cols-3 gap-3 md:mt-14 md:gap-6">
                {MAIN_FEATURES.map((item) => (
                  <li key={item.lines[0]} className="text-navy">
                    <item.icon size={34} className="mb-3" />
                    {item.lines.map((line) => (
                      <p key={line} className="hero-feature">
                        {line}
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 hidden h-[150px] w-[min(100%,340px)] overflow-hidden lg:block">
                <img
                  src={asset("/images/building.jpg")}
                  alt="株式会社コスギ 社屋"
                  className="img-cover object-[center_52%]"
                  width={720}
                  height={316}
                />
              </div>
            </>
          ) : null}
        </div>

        {isMain ? (
          <div
            className="absolute right-0 bottom-0 z-[3] bg-navy py-5 pr-6 pl-10 text-paper md:py-7 md:pr-8 md:pl-14"
            style={{
              left: "42%",
              clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <p className="text-[13.5px] leading-7 font-medium tracking-[0.1em] md:text-[15px] md:leading-8">
              ワーキングウェアのプロが、
              <br />
              現場のパフォーマンスを支えます。
            </p>
          </div>
        ) : null}

        <button
          type="button"
          className="absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-navy hover:bg-paper md:left-5 md:size-11"
          aria-label="前のスライド"
          onClick={() => go(index - 1)}
        >
          <ChevronIcon size={18} className="rotate-180" />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-navy hover:bg-paper md:right-5 md:size-11"
          aria-label="次のスライド"
          onClick={() => go(index + 1)}
        >
          <ChevronIcon size={18} />
        </button>

        <div className="absolute bottom-4 left-0 z-20 flex w-full justify-center gap-2">
          {HERO_SLIDES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                i === index ? "w-6 bg-yellow" : light ? "w-2 bg-navy/25 hover:bg-navy/50" : "w-2 bg-paper/70 hover:bg-paper",
              )}
              aria-label={`${i + 1}枚目のスライド`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      {!isMain ? (
        <div className="snap-hero-bar bg-navy text-paper">
          <div className="site-wrap grid gap-8 py-8 md:grid-cols-[auto_1fr] md:items-start md:gap-10 md:py-9 lg:grid-cols-[7.5rem_1fr]">
            {current.barLabel.kind === "script" ? (
              <p className="point-script leading-none text-yellow">{current.barLabel.text}</p>
            ) : (
              <p className="pt-1 text-[15px] font-bold tracking-[0.12em]">
                <span className="border-b-2 border-yellow pb-1">{current.barLabel.text}</span>
              </p>
            )}
            <ul className="grid gap-6 sm:grid-cols-3 sm:gap-0">
              {current.points.map((point, pi) => (
                <li
                  key={point.title}
                  className={cn(
                    "flex gap-3 sm:px-5",
                    pi > 0 && "sm:border-l sm:border-paper/20",
                    pi === 0 && "sm:pl-0",
                  )}
                >
                  <SlidePointIcon name={point.icon} size={34} className="mt-0.5 shrink-0 text-paper" />
                  <div>
                    <p className="text-[14px] font-bold tracking-[0.06em]">{point.title}</p>
                    <p className="mt-1.5 whitespace-pre-line text-[12.5px] leading-6 text-paper/75">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
