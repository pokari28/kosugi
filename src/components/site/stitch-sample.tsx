"use client";

import { useState } from "react";
import { asset } from "@/lib/paths";

const CHART = asset("/images/emb-sample.jpg");
const WORN = asset("/images/emb-sample-wear.jpg");

const GROUPS = [
  { title: "和文書体", body: "楷書体、行書体、明朝体、ゴシック体" },
  { title: "英文書体", body: "見本の番号：英01、英02、英03、英04、英07、英10" },
  { title: "文字サイズ", body: "10mm、12mm、15mm、20mm" },
  { title: "糸の色", body: "見本では黄、緑、水色、桃、橙、白を確認できます。" },
] as const;

type View = "all" | "jp" | "en" | "size" | "worn";

const VIEWS: { id: View; label: string }[] = [
  { id: "all", label: "全体" },
  { id: "jp", label: "和文書体" },
  { id: "en", label: "英文書体" },
  { id: "size", label: "文字サイズ" },
];

const FRAME: Record<Exclude<View, "worn">, string> = {
  all: "object-contain object-center scale-100",
  jp: "object-cover object-[28%_46%] scale-150",
  en: "object-cover object-[70%_68%] scale-150",
  size: "object-cover object-[18%_36%] scale-150",
};

export function StitchSample() {
  const [open, setOpen] = useState<View | null>(null);

  return (
    <section className="bg-paper py-12 md:py-16">
      <div className="site-wrap">
        <div className="text-center">
          <h2 className="section-title">刺繍の書体・サイズを選ぶ</h2>
          <span className="mx-auto mt-3 block h-[2px] w-8 bg-navy" />
        </div>
        <p className="section-lead mx-auto mt-6 max-w-2xl text-center">
          書体・文字サイズ・糸色は、実際の見本で確認できます。
          <br className="hidden sm:block" />
          見本にない書体は掲載していません。
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((item) => (
            <li key={item.title} className="border border-line bg-page px-5 py-5">
              <h3 className="text-[15px] font-bold tracking-[0.08em] text-navy">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-7 text-soft">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <button type="button" className="block bg-line text-left" onClick={() => setOpen("all")}>
            <img src={CHART} alt="刺繍の書体・サイズ見本" className="aspect-[4/3] w-full object-contain" width={1500} height={1125} />
            <span className="block px-1 py-3 text-[13px] tracking-[0.06em] text-navy">書体見本を拡大</span>
          </button>
          <button type="button" className="block bg-line text-left" onClick={() => setOpen("worn")}>
            <img
              src={WORN}
              alt="書体見本を入れたジャンパー"
              className="aspect-[4/3] w-full object-cover object-center"
              width={1500}
              height={1125}
            />
            <span className="block px-1 py-3 text-[13px] tracking-[0.06em] text-navy">見本を入れたジャンパー</span>
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {VIEWS.filter((item) => item.id !== "all").map((item) => (
            <button
              key={item.id}
              type="button"
              className="min-h-11 border border-line bg-paper px-4 text-[13px] tracking-[0.06em] text-navy"
              onClick={() => setOpen(item.id)}
            >
              {item.label}を拡大
            </button>
          ))}
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-8" onClick={() => setOpen(null)}>
          <figure className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex max-h-[72dvh] items-center justify-center overflow-hidden bg-navy-2">
              <img
                src={open === "worn" ? WORN : CHART}
                alt={open === "worn" ? "書体見本を入れたジャンパー" : "刺繍の書体・サイズ見本"}
                className={`max-h-[72dvh] w-full ${open === "worn" ? "object-contain" : FRAME[open]}`}
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-paper">
              <span className="flex flex-wrap gap-2">
                {open === "worn"
                  ? null
                  : VIEWS.map((item) => (
                      <button key={item.id} type="button" className="min-h-11 px-3 text-[13px]" onClick={() => setOpen(item.id)}>
                        {item.label}
                      </button>
                    ))}
              </span>
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
