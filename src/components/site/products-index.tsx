"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PRODUCT_CATEGORIES } from "@/data/site";
import { asset } from "@/lib/paths";
import { Chevron } from "./layout";
import { PageCta } from "./page-cta";
import { Breadcrumb, PageHero } from "./page-hero";
import { cn } from "@/lib/utils";

export function ProductsIndex() {
  const [filter, setFilter] = useState<string>("all");
  const items = filter === "all" ? PRODUCT_CATEGORIES : PRODUCT_CATEGORIES.filter((item) => item.slug === filter);

  return (
    <>
      <PageHero
        title="取扱商品一覧"
        lead="企業・団体のあらゆるニーズにお応えする、豊富な商品ラインナップ"
        image={asset("/images/hero-products.jpg")}
        imageAlt="ハンガーに並ぶ各種ワーキングウェア"
        imageClass="object-[center_45%]"
      />
      <Breadcrumb current="取扱商品一覧" />

      <section className="bg-paper py-12 md:py-16">
        <div className="site-wrap">
          <div className="text-center">
            <h2 className="section-title">カテゴリから探す</h2>
            <span className="mx-auto mt-3 block h-[2px] w-8 bg-navy" />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              className={cn(
                "min-h-10 px-4 text-[12.5px] tracking-[0.08em]",
                filter === "all" ? "bg-navy text-paper" : "border border-line bg-paper text-navy hover:border-navy",
              )}
              onClick={() => setFilter("all")}
            >
              すべて
            </button>
            {PRODUCT_CATEGORIES.map((item) => (
              <button
                key={item.slug}
                type="button"
                className={cn(
                  "min-h-10 px-4 text-[12.5px] tracking-[0.08em]",
                  filter === item.slug ? "bg-navy text-paper" : "border border-line bg-paper text-navy hover:border-navy",
                )}
                onClick={() => setFilter(item.slug)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {items.map((item) => (
              <article key={item.slug} className="flex flex-col">
                <div className="aspect-[5/4] overflow-hidden bg-line">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`img-cover ${item.imageClass}`}
                    width={1200}
                    height={960}
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-bold tracking-[0.08em] text-navy">{item.name}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-7 text-soft">{item.summary}</p>
                <Link
                  to="/contact"
                  search={{ category: item.slug }}
                  className="outline-btn mt-5 w-fit"
                >
                  詳しく見る
                  <Chevron />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        icon="clipboard"
        title="商品選びにお困りの方へ"
        body="用途やご予算に合わせて最適な商品をご提案いたします。お気軽にご相談ください。"
      />
    </>
  );
}
