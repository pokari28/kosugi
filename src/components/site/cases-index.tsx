"use client";

import { useState } from "react";
import { CASE_FILTERS, CASE_STUDIES } from "@/data/site";
import { asset } from "@/lib/paths";
import { PageCta } from "./page-cta";
import { Breadcrumb, PageHero } from "./page-hero";
import { cn } from "@/lib/utils";

export function CasesIndex() {
  const [filter, setFilter] = useState<(typeof CASE_FILTERS)[number]["value"]>("all");
  const items = filter === "all" ? CASE_STUDIES : CASE_STUDIES.filter((item) => item.industry === filter);

  return (
    <>
      <PageHero
        title="事例一覧"
        lead="様々な業種・用途での導入事例をご紹介します"
        image={asset("/images/original-backs.jpg")}
        imageAlt="オリジナルユニフォームを着用したスタッフ"
        imageClass="object-[center_20%]"
      />
      <Breadcrumb current="事例一覧" />

      <section className="bg-paper py-12 md:py-16">
        <div className="site-wrap">
          <div className="flex flex-wrap justify-center gap-2">
            {CASE_FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                className={cn(
                  "min-h-10 px-4 text-[12.5px] tracking-[0.08em]",
                  filter === item.value
                    ? "bg-navy text-paper"
                    : "border border-line bg-paper text-navy hover:border-navy",
                )}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10">
            {items.map((item) => (
              <article key={item.slug} className="flex flex-col bg-paper">
                <div className="relative aspect-[16/10] overflow-hidden bg-line">
                  <img
                    src={item.image}
                    alt={`${item.client}の導入事例`}
                    className="img-cover"
                    width={900}
                    height={560}
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 bg-navy px-2.5 py-1 text-[11px] tracking-[0.1em] text-paper">
                    {item.industryLabel}
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-bold tracking-[0.08em] text-navy">{item.client}</h3>
                <p className="mt-2 text-[13px] leading-7 text-soft">{item.proposal}</p>
                <p className="mt-2 text-[12.5px] leading-6 text-muted">導入ユニフォーム：{item.uniform}</p>
                <p className="mt-1 text-[12.5px] leading-6 text-muted">背景：{item.background}</p>
                <p className="mt-1 flex-1 text-[12.5px] leading-6 text-muted">効果：{item.effect}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        icon="users"
        title="あなたの会社の事例も作りませんか？"
        body="豊富な経験と実績で、最適なユニフォームをご提案いたします。"
      />
    </>
  );
}
