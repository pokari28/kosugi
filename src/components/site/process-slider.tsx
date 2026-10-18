"use client";

import { useRef, useState } from "react";
import { asset } from "@/lib/paths";
import { cn } from "@/lib/utils";

type Point = {
  id: string;
  title: string;
  body: string;
  left: string;
  top: string;
};

type View = {
  id: string;
  label: string;
  image: string;
  width: number;
  height: number;
  points: Point[];
};

const VIEWS: View[] = [
  {
    id: "front",
    label: "正面",
    image: "/images/jacket-front.jpg",
    width: 335,
    height: 538,
    points: [
      {
        id: "2",
        title: "右胸：個人名刺繍",
        body: "スタッフ名や個人名の刺繍が可能です。",
        left: "8%",
        top: "30%",
      },
      {
        id: "1",
        title: "左胸：社名刺繍",
        body: "会社名やロゴの刺繍が可能です。",
        left: "52%",
        top: "33%",
      },
    ],
  },
  {
    id: "back",
    label: "背面",
    image: "/images/jacket-back.jpg",
    width: 382,
    height: 538,
    points: [
      {
        id: "3",
        title: "背中上部：社名・ロゴプリント",
        body: "会社名やロゴのプリントが可能です。",
        left: "8%",
        top: "20%",
      },
      {
        id: "4",
        title: "背中中央：大型プリント",
        body: "企業スローガンやデザインのプリントが可能です。",
        left: "8%",
        top: "42%",
      },
    ],
  },
  {
    id: "left",
    label: "左側面",
    image: "/images/jacket-left.jpg",
    width: 319,
    height: 538,
    points: [
      {
        id: "5",
        title: "左袖：社名・ロゴ刺繍",
        body: "袖にロゴや社名の刺繍が可能です。",
        left: "46%",
        top: "34%",
      },
    ],
  },
  {
    id: "right",
    label: "右側面",
    image: "/images/jacket-right.jpg",
    width: 246,
    height: 538,
    points: [
      {
        id: "6",
        title: "右袖：ネーム・ロゴ刺繍",
        body: "袖にネームやロゴの刺繍が可能です。",
        left: "14%",
        top: "32%",
      },
    ],
  },
];

const POINTS = VIEWS.flatMap((view) => view.points.map((point) => ({ ...point, viewId: view.id })));

export function ProcessSlider() {
  const [viewIndex, setViewIndex] = useState(0);
  const [activeId, setActiveId] = useState("1");
  const startX = useRef<number | null>(null);
  const view = VIEWS[viewIndex];
  const active = POINTS.find((point) => point.id === activeId) ?? view.points[0];

  const show = (index: number) => {
    const next = (index + VIEWS.length) % VIEWS.length;
    setViewIndex(next);
    setActiveId(VIEWS[next].points[0].id);
  };

  return (
    <section id="positions" className="scroll-mt-20 bg-page py-16 md:py-24">
      <div className="site-wrap">
        <p className="en-label">POSITION</p>
        <h2 className="section-title mt-3">加工可能な位置の例</h2>
        <p className="section-lead">社名刺繍やロゴ、個人名など、さまざまな加工に対応しています。</p>

        <div className="position-layout mt-8 grid items-center gap-8 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] lg:gap-12">
          <div>
            <div
              className="position-stage relative mx-auto h-[min(52vh,520px)]"
              onTouchStart={(event) => {
                startX.current = event.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                if (startX.current == null) return;
                const delta = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current;
                if (delta > 48) show(viewIndex - 1);
                if (delta < -48) show(viewIndex + 1);
                startX.current = null;
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {VIEWS.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
                      index === viewIndex ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  >
                    <img
                      src={asset(item.image)}
                      alt={`作業服の${item.label}`}
                      width={item.width}
                      height={item.height}
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                    {item.points.map((point) => (
                      <button
                        key={point.id}
                        type="button"
                        className="absolute h-[18%] w-[28%] -translate-x-0 -translate-y-0"
                        style={{ left: point.left, top: point.top }}
                        aria-label={`${point.id} ${point.title}`}
                        aria-pressed={activeId === point.id}
                        onClick={() => {
                          setViewIndex(index);
                          setActiveId(point.id);
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="absolute top-1/2 left-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-navy shadow-[0_1px_6px_rgb(0_37_89/0.16)]"
                aria-label="前の向き"
                onClick={() => show(viewIndex - 1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-navy shadow-[0_1px_6px_rgb(0_37_89/0.16)]"
                aria-label="次の向き"
                onClick={() => show(viewIndex + 1)}
              >
                ›
              </button>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {VIEWS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "min-h-10 min-w-16 px-4 text-[13px] tracking-[0.08em]",
                    index === viewIndex ? "bg-navy text-paper" : "border border-line bg-paper text-navy",
                  )}
                  onClick={() => show(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="position-active text-[15px] font-bold tracking-[0.06em] text-navy">{active.title}</p>
            <p className="mt-2 text-[13.5px] leading-7 text-soft">{active.body}</p>
            <ul className="position-cards mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {POINTS.map((point) => (
                <li key={point.id}>
                  <button
                    type="button"
                    className={cn(
                      "h-full w-full border px-4 py-3 text-left",
                      activeId === point.id ? "border-navy bg-paper" : "border-line bg-paper",
                    )}
                    onClick={() => {
                      setViewIndex(VIEWS.findIndex((item) => item.id === point.viewId));
                      setActiveId(point.id);
                    }}
                  >
                    <span className="text-[13px] font-bold tracking-[0.04em] text-navy">
                      {point.id}　{point.title}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-6 text-soft">{point.body}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl bg-paper px-4 py-3 text-center text-[12.5px] leading-7 text-navy">
          加工位置・サイズ・方法は商品によって異なります。詳しくはお問い合わせください。
        </p>
      </div>
    </section>
  );
}
