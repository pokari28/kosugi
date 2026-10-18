"use client";

import { useState } from "react";
import { asset } from "@/lib/paths";

const CHART = asset("/images/emb-sample.jpg");
const WORN = asset("/images/emb-sample-wear.jpg");

const CARDS = [
  {
    id: "jp",
    title: "和文書体",
    body: "社名やお名前の刺繍に使用する日本語の書体をご紹介します。",
    image: asset("/images/embroidery/05_japanese_fonts.jpg"),
    width: 575,
    height: 101,
    alt: "和文書体の刺繍イメージ",
  },
  {
    id: "en",
    title: "英文書体",
    body: "英字やアルファベットを使用した社名・ロゴなどの刺繍見本です。",
    image: asset("/images/embroidery/06_english_fonts.jpg"),
    width: 428,
    height: 101,
    alt: "英文書体の刺繍イメージ",
  },
  {
    id: "size",
    title: "文字サイズ",
    body: "文字の大きさによって刺繍の印象が変わります。サイズの違いを比較できます。",
    image: asset("/images/embroidery/07_font_sizes.jpg"),
    width: 431,
    height: 130,
    alt: "文字サイズの比較イメージ",
  },
  {
    id: "color",
    title: "刺繍糸の色",
    body: "ユニフォームの色に合わせて、刺繍糸の色をお選びいただけます。",
    image: asset("/images/embroidery/08_thread_colors.jpg"),
    width: 563,
    height: 130,
    alt: "刺繍糸の色のイメージ",
  },
] as const;

type RealView = "all" | "jp" | "en" | "size" | "worn";

const REAL_VIEWS: { id: Exclude<RealView, "worn">; label: string }[] = [
  { id: "all", label: "全体" },
  { id: "jp", label: "和文書体" },
  { id: "en", label: "英文書体" },
  { id: "size", label: "文字サイズ" },
];

const FRAME: Record<Exclude<RealView, "worn">, string> = {
  all: "object-contain object-center scale-100",
  jp: "object-cover object-[28%_46%] scale-150",
  en: "object-cover object-[70%_68%] scale-150",
  size: "object-cover object-[18%_36%] scale-150",
};

export function StitchSample() {
  const [card, setCard] = useState<(typeof CARDS)[number] | null>(null);
  const [real, setReal] = useState<RealView | null>(null);

  return (
    <section className="bg-paper py-12 md:py-16">
      <div className="site-wrap">
        <div className="text-center">
          <h2 className="section-title">刺繍の書体・サイズを選ぶ</h2>
          <span className="mx-auto mt-3 block h-[2px] w-8 bg-yellow" />
        </div>
        <p className="section-lead mx-auto mt-6 max-w-2xl text-center">
          書体、文字サイズ、糸の色のイメージです。
          <br className="hidden sm:block" />
          写真を押すと大きく表示します。
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {CARDS.map((item) => (
            <article key={item.id} className="border border-line bg-paper">
              <button type="button" className="block w-full text-left" onClick={() => setCard(item)}>
                <div className="flex min-h-36 items-center justify-center bg-page px-4 py-6">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="h-auto w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-line px-5 py-5">
                  <h3 className="text-[15px] font-bold tracking-[0.08em] text-navy">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-7 text-soft">{item.body}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-[12.5px] leading-7 text-muted">
          上記は刺繍デザインのイメージです。文字の形や糸色は、実物の見本と完全には一致しない場合があります。選択できる書体や糸色は、下の実物見本でご確認ください。
        </p>

        <div className="mt-14">
          <h3 className="text-center text-[1.15rem] font-black tracking-[0.08em] text-navy">実物の書体見本</h3>
          <p className="section-lead mx-auto mt-4 max-w-2xl text-center">
            正式な書体・文字サイズ・糸色は、実物の見本写真で確認できます。
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <button type="button" className="block bg-page text-left" onClick={() => setReal("all")}>
              <img src={CHART} alt="実物の刺繍書体・サイズ見本" className="aspect-[4/3] w-full object-contain" width={1500} height={1125} />
              <span className="block px-1 py-3 text-[13px] tracking-[0.06em] text-navy">実物の書体見本を拡大</span>
            </button>
            <button type="button" className="block bg-page text-left" onClick={() => setReal("worn")}>
              <img
                src={WORN}
                alt="実物の書体見本を入れたジャンパー"
                className="aspect-[4/3] w-full object-cover object-center"
                width={1500}
                height={1125}
              />
              <span className="block px-1 py-3 text-[13px] tracking-[0.06em] text-navy">見本を入れたジャンパー</span>
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {REAL_VIEWS.filter((item) => item.id !== "all").map((item) => (
              <button
                key={item.id}
                type="button"
                className="min-h-11 border border-line bg-paper px-4 text-[13px] tracking-[0.06em] text-navy"
                onClick={() => setReal(item.id)}
              >
                {item.label}を拡大
              </button>
            ))}
          </div>
        </div>
      </div>

      {card ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-8" onClick={() => setCard(null)}>
          <figure className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <img src={card.image} alt={card.alt} className="max-h-[78dvh] w-full bg-paper object-contain" />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-paper">
              <span className="text-[14px] tracking-[0.06em]">{card.title}</span>
              <button type="button" className="min-h-11 px-3 text-[13px]" onClick={() => setCard(null)}>
                閉じる
              </button>
            </figcaption>
          </figure>
        </div>
      ) : null}

      {real ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-8" onClick={() => setReal(null)}>
          <figure className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex max-h-[72dvh] items-center justify-center overflow-hidden bg-navy-2">
              <img
                src={real === "worn" ? WORN : CHART}
                alt={real === "worn" ? "実物の書体見本を入れたジャンパー" : "実物の刺繍書体・サイズ見本"}
                className={`max-h-[72dvh] w-full ${real === "worn" ? "object-contain" : FRAME[real]}`}
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-paper">
              <span className="flex flex-wrap gap-2">
                {real === "worn"
                  ? null
                  : REAL_VIEWS.map((item) => (
                      <button key={item.id} type="button" className="min-h-11 px-3 text-[13px]" onClick={() => setReal(item.id)}>
                        {item.label}
                      </button>
                    ))}
              </span>
              <button type="button" className="min-h-11 px-3 text-[13px]" onClick={() => setReal(null)}>
                閉じる
              </button>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}