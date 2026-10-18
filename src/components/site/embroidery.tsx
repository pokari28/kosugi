"use client";

import { useEffect, useState } from "react";
import { EMBROIDERY_SEED, EMBROIDERY_TYPES, loadEmbroidery, visibleEmbroidery, type EmbroideryExample } from "@/lib/embroidery";

export function Embroidery() {
  const [items, setItems] = useState<EmbroideryExample[]>(EMBROIDERY_SEED);
  const [open, setOpen] = useState<EmbroideryExample | null>(null);

  useEffect(() => {
    setItems(loadEmbroidery());
  }, []);

  const visible = visibleEmbroidery(items);

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

        {visible.length ? (
          <div className="mt-14">
            <div className="text-center">
              <h2 className="section-title">刺繍の見本</h2>
              <span className="mx-auto mt-3 block h-[2px] w-8 bg-navy" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-center text-[12.5px] leading-7 text-muted">写真を押すと大きく表示します。</p>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {visible.map((item) => (
                <article key={item.id}>
                  <button type="button" className="block w-full text-left" onClick={() => setOpen(item)}>
                    <div className="aspect-[4/3] overflow-hidden bg-line">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-cover object-center"
                        width={1500}
                        height={1125}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-4 text-[15px] font-bold tracking-[0.08em] text-navy">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-7 text-soft">{item.body}</p>
                  </button>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-8" onClick={() => setOpen(null)}>
          <figure className="max-h-full w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <img src={open.image} alt={open.title} className="max-h-[78dvh] w-full object-contain" />
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