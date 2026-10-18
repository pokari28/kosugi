"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { EMBROIDERY_SEED, EMBROIDERY_TYPES } from "@/lib/embroidery";
import { asset } from "@/lib/paths";

const SAMPLES = EMBROIDERY_SEED;
const FEATURE = {
  image: asset("/images/embroidery/09_jacket_back_fireworks.jpg"),
  title: "大きなデザイン刺繍もご相談ください",
  body: "社名や個人名だけでなく、イベントや記念品などに向けたデザイン刺繍についてもご相談いただけます。",
  alt: "背中のデザイン刺繍のイメージ",
  width: 408,
  height: 379,
};

export function Embroidery() {
  const [open, setOpen] = useState<{ image: string; title: string } | null>(null);

  return (
    <section className="bg-page py-12 md:py-16">
      <div className="site-wrap">
        <div className="text-center">
          <h2 className="section-title">刺繍対応</h2>
          <span className="mx-auto mt-3 block h-[2px] w-8 bg-navy" />
        </div>
        <p className="section-lead mx-auto mt-6 max-w-2xl text-center">
          社名やロゴ、個人名などの刺繍にも対応しています。
          <br className="hidden sm:block" />
          作業服やユニフォームにオリジナルの刺繍を施すことで、
          <br className="hidden sm:block" />
          企業やチームとしての統一感を高めます。
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {EMBROIDERY_TYPES.map((item) => (
            <li key={item.title} className="border border-line bg-paper px-5 py-5">
              <h3 className="text-[15px] font-bold tracking-[0.08em] text-navy">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-7 text-soft">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <div className="text-center">
            <h2 className="section-title">刺繍の見本</h2>
            <span className="mx-auto mt-3 block h-[2px] w-8 bg-yellow" />
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[12.5px] leading-7 text-muted">
            掲載写真は刺繍デザインのイメージです。納品事例や加工実績を示すものではありません。写真を押すと大きく表示します。
          </p>
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible">
            {SAMPLES.map((item) => (
              <article key={item.id} className="w-[84%] shrink-0 snap-start border border-line bg-paper md:w-auto">
                <button type="button" className="block w-full text-left" onClick={() => setOpen(item)}>
                  <div className="flex aspect-[4/3] items-center justify-center bg-paper p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                      width={388}
                      height={297}
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
        </div>

        <div className="mt-12 grid items-center gap-8 bg-paper px-5 py-8 md:grid-cols-[minmax(220px,380px)_minmax(0,1fr)] md:px-8">
          <button type="button" className="block w-full" onClick={() => setOpen({ image: FEATURE.image, title: FEATURE.title })}>
            <img
              src={FEATURE.image}
              alt={FEATURE.alt}
              className="mx-auto max-h-[420px] w-full object-contain"
              width={FEATURE.width}
              height={FEATURE.height}
              loading="lazy"
            />
          </button>
          <div>
            <h2 className="text-[1.35rem] font-black tracking-[0.08em] text-navy">{FEATURE.title}</h2>
            <p className="mt-4 text-[14px] leading-8 text-soft">{FEATURE.body}</p>
            <p className="mt-3 text-[12.5px] leading-7 text-muted">
              デザインや仕上がりはイメージです。対応範囲は内容によって異なりますので、詳しくはお問い合わせください。
            </p>
          </div>
        </div>

        <div className="mt-12 bg-navy px-6 py-10 text-center text-paper md:px-10">
          <h2 className="text-[1.35rem] font-black tracking-[0.08em]">オリジナル刺繍のご相談はこちら</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-8 text-paper/85">
            社名・個人名・ロゴ・デザイン刺繍など、用途やご希望に合わせてご提案します。
            <br className="hidden sm:block" />
            書体やサイズ、加工位置についてもお気軽にお問い合わせください。
          </p>
          <Link to="/contact" search={{ category: "original" }} className="solid-btn-yellow mt-7">
            刺繍について問い合わせる
          </Link>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-8" onClick={() => setOpen(null)}>
          <figure className="max-h-full w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <img src={open.image} alt={open.title} className="max-h-[78dvh] w-full bg-paper object-contain" />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-paper">
              <span className="text-[14px] tracking-[0.06em]">{open.title}</span>
              <button type="button" className="min-h-11 px-3 text-[13px]" onClick={() => setOpen(null)}>
                閉じる
              </button>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}