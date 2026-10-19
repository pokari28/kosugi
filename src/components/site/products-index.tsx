"use client";

import { useEffect, useState } from "react";
import { CATALOG_SEED, loadCatalog, visibleProducts, type CatalogItem } from "@/lib/catalog";
import { asset } from "@/lib/paths";
import { PageCta } from "./page-cta";
import { Breadcrumb, PageHero } from "./page-hero";
import { cn } from "@/lib/utils";

const IMAGE_NOTE_SLUGS = new Set(["white-coat", "scrubs", "samue", "security"]);

export function ProductsIndex({ initialCategory }: { initialCategory?: string }) {
  const [catalog, setCatalog] = useState<CatalogItem[]>(visibleProducts(CATALOG_SEED));
  const [filter, setFilter] = useState<string>(
    initialCategory === "towel"
      ? "other"
      : initialCategory && CATALOG_SEED.some((item) => item.slug === initialCategory)
        ? initialCategory
        : "all",
  );

  useEffect(() => {
    setCatalog(visibleProducts(loadCatalog()));
  }, []);

  const items = filter === "all" ? catalog : catalog.filter((item) => item.slug === filter);

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

      <section className="snap-stack bg-paper max-md:py-0 md:py-16">
        <div className="site-wrap">
          <div className="snap-card text-center">
            <h2 className="section-title">カテゴリから探す</h2>
            <span className="mx-auto mt-3 block h-[2px] w-8 bg-navy" />

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
            {catalog.map((item) => (
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
                {IMAGE_NOTE_SLUGS.has(item.slug) ? (
                  <p className="mt-2 text-[12px] leading-6 text-muted">カテゴリー紹介用のイメージです。</p>
                ) : null}
              </article>
            ))}
          </div>

          {filter === "all" || filter === "other" ? (
            <div id="towel" className="snap-card mt-14 border-t border-line pt-10">
              <p className="text-[12px] tracking-[0.14em] text-muted">その他商品</p>
              <div className="mt-4 grid items-center gap-6 md:grid-cols-[minmax(220px,320px)_minmax(0,1fr)]">
                <div className="aspect-[5/4] overflow-hidden bg-line">
                  <img
                    src={asset("/images/towels.jpg")}
                    alt="タオル"
                    className="img-cover object-center"
                    width={508}
                    height={366}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-[0.08em] text-navy">タオル</h3>
                  <p className="mt-2 text-[13px] leading-7 text-soft">
                    企業名やロゴを入れたオリジナルタオルなど、各種タオルのご相談も承ります。
                  </p>
                  <p className="mt-2 text-[12px] leading-6 text-muted">カテゴリー紹介用のイメージです。</p>
                </div>
              </div>
            </div>
          ) : null}
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
