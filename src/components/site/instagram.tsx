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
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id="ig-mark" cx="30%" cy="110%" r="130%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-mark)" />
      <rect x="7" y="7" width="10" height="10" rx="5" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="#fff" />
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
          <AccountLink href={href} className="inline-flex">
            <InstagramMark />
          </AccountLink>
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

        {INSTAGRAM_POSTS.length ? (
          <div className="ig-grid mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className="block aspect-square overflow-hidden bg-line"
              >
                <img src={post.image} alt={post.alt} className="img-cover" width={800} height={800} loading="lazy" />
              </a>
            ))}
          </div>
        ) : null}

        <div className="mt-6">
          <a href={href || "https://www.instagram.com/cosugiakita/"} target="_blank" rel="noreferrer" className="outline-btn">
            Instagramで最新情報を見る
          </a>
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
