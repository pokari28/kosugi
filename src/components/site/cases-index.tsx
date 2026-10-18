"use client";

import { useEffect, useState } from "react";
import { CASE_FILTERS, CASE_STUDIES } from "@/data/site";
import { loadExtraCases, visibleExtraCases, type ExtraCase } from "@/lib/cases-extra";
import { asset } from "@/lib/paths";
import { PageCta } from "./page-cta";
import { Breadcrumb, PageHero } from "./page-hero";
import { cn } from "@/lib/utils";

export function CasesIndex() {
  const [filter, setFilter] = useState<(typeof CASE_FILTERS)[number]["value"]>("all");
  const [extras, setExtras] = useState<ExtraCase[]>([]);

  useEffect(() => {
    setExtras(visibleExtraCases(loadExtraCases()));
  }, []);

  const studies = [
    ...CASE_STUDIES,
    ...extras.map((item) => ({
      slug: item.id,
      industry: item.industry || "other",
      industryLabel: item.industryLabel || "その他",
      client: item.client,
      uniform: item.uniform,
      background: item.background,
      proposal: item.proposal,
      effect: item.effect,
      image: item.image,
    })),
  ];
  const items = filter === "all" ? studies : studies.filter((item) => item.industry === filter);

  return (
    <>
      <PageHero
        title="事例一覧"
        lead="様々な業種・用途での導入事例をご紹介します"
        image={asset("/images/case-construction.jpg")}
        imageAlt="作業服を着用した現場"
        imageClass="object-center"
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
            {items.map((item) => {
              const proposal = "kind" in item && item.kind === "proposal";
              const uses = "uses" in item && Array.isArray(item.uses) ? item.uses : [];
              return (
                <article key={item.slug} className="flex flex-col bg-paper">
                  <div className="relative aspect-[16/10] overflow-hidden bg-line">
                    <img
                      src={item.image}
                      alt={
                        proposal
                          ? "運輸・物流向けユニフォームのイメージ。実際の納入事例ではありません。"
                          : `${item.client}の導入事例`
                      }
                      className="img-cover"
                      width={900}
                      height={560}
                      loading="lazy"
                    />
                    <span className="absolute bottom-3 left-3 bg-navy px-2.5 py-1 text-[11px] tracking-[0.1em] text-paper">
                      {proposal ? "ご提案例" : item.industryLabel}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold tracking-[0.08em] text-navy">{item.client}</h3>
                  <p className="mt-2 text-[13px] leading-7 text-soft">{item.proposal}</p>
                  {proposal ? (
                    <p className="mt-2 text-[12px] leading-6 text-muted">
                      イメージです。実際の顧客への納入事例ではありません。
                    </p>
                  ) : (
                    <p className="mt-2 text-[12.5px] leading-6 text-muted">導入ユニフォーム：{item.uniform}</p>
                  )}
                  {uses.length > 0 ? (
                    <ul className="mt-2 space-y-1 text-[12.5px] leading-6 text-muted">
                      {uses.map((use) => (
                        <li key={use}>・{use}</li>
                      ))}
                    </ul>
                  ) : null}
                  {item.background ? <p className="mt-1 text-[12.5px] leading-6 text-muted">背景：{item.background}</p> : null}
                  {item.effect ? <p className="mt-1 flex-1 text-[12.5px] leading-6 text-muted">効果：{item.effect}</p> : null}
                </article>
              );
            })}
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
