"use client";

import { useEffect, useState } from "react";
import { NEWS_SEED, formatNewsDate, loadNews, publishedNews, type NewsItem } from "@/lib/news";

export function News() {
  const [items, setItems] = useState<NewsItem[]>(NEWS_SEED);

  useEffect(() => {
    setItems(loadNews());
  }, []);

  const visible = publishedNews(items, 3);

  return (
    <section id="news" className="scroll-mt-20 bg-page py-16 md:py-24">
      <div className="site-wrap grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-14">
        <div>
          <p className="en-label">NEWS</p>
          <h2 className="section-title mt-3">新着情報</h2>
          <p className="section-lead">
            コスギからのお知らせや
            <br />
            商品情報をご案内します。
          </p>
        </div>

        <div>
          <ul>
            {visible.map((item) => (
              <li
                key={item.id}
                className="grid gap-2 border-b border-line py-4 first:border-t md:grid-cols-[7.2rem_6.2rem_minmax(0,1fr)] md:items-center md:gap-5 md:py-5"
              >
                <time className="text-[13px] tracking-[0.06em] text-soft" dateTime={item.date}>
                  {formatNewsDate(item.date)}
                </time>
                <span className="w-fit bg-navy px-2 py-0.5 text-[11px] tracking-[0.08em] text-paper">
                  {item.category}
                </span>
                <p className="text-[14px] leading-7 font-medium tracking-[0.04em] text-navy">{item.title}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right text-[12px] font-medium tracking-[0.16em] text-navy">VIEW ALL →</p>
        </div>
      </div>
    </section>
  );
}
