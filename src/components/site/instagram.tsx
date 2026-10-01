"use client";

import { useEffect, useState } from "react";
import {
  INSTAGRAM_DEFAULT,
  INSTAGRAM_POSTS,
  loadInstagram,
  type InstagramSettings,
} from "@/lib/instagram";

function InstagramMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-navy">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function Instagram() {
  const [settings, setSettings] = useState<InstagramSettings>(INSTAGRAM_DEFAULT);

  useEffect(() => {
    setSettings(loadInstagram());
  }, []);

  if (!settings.visible) return null;

  const href = settings.url || undefined;

  return (
    <section id="instagram" className="scroll-mt-20 overflow-x-hidden border-b border-line bg-paper py-16 md:py-24">
      <div className="site-wrap min-w-0">
        <div className="flex items-center gap-2">
          <InstagramMark />
          <p className="en-label">Instagram</p>
        </div>
        <h2 className="section-title mt-3">コスギ公式Instagram</h2>
        <p className="section-lead max-w-xl">
          現場の様子や新商品の紹介など、
          <br className="hidden sm:block" />
          最新の情報を発信しています。
        </p>
        {settings.accountName ? (
          <AccountLink href={href} className="mt-4 inline-flex text-[13px] tracking-[0.08em] text-navy">
            @{settings.accountName.replace(/^@/, "")}
          </AccountLink>
        ) : null}

        <div className="ig-row mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:pb-0">
          {INSTAGRAM_POSTS.map((post) => (
            <AccountLink
              key={post.id}
              href={href}
              className="block aspect-square w-[42%] shrink-0 snap-start overflow-hidden bg-line sm:w-[31%] md:w-auto"
            >
              <img src={post.image} alt={post.alt} className="img-cover" width={800} height={800} loading="lazy" />
            </AccountLink>
          ))}
        </div>

        <div className="mt-6">
          <AccountLink href={href} className="text-[13px] font-medium tracking-[0.12em] text-navy">
            Instagramで見る →
          </AccountLink>
        </div>
      </div>
    </section>
  );
}

function AccountLink({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}
