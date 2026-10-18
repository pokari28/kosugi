"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function PageHero({
  title,
  lead,
  image,
  imageAlt,
  imageClass = "object-center",
  slides,
}: {
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  imageClass?: string;
  slides?: { src: string; alt: string; imageClass?: string }[];
}) {
  const frames = slides && slides.length > 1 ? slides : [{ src: image, alt: imageAlt, imageClass }];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % frames.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [frames.length]);

  return (
    <section className="bg-navy text-paper">
      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)]">
        <div className="flex items-center">
          <div className="site-wrap w-full py-12 lg:ml-auto lg:mr-0 lg:max-w-[540px] lg:py-16 lg:pr-8">
            <h1 className="text-[1.7rem] leading-snug font-black tracking-[0.08em] md:text-[2.05rem]">{title}</h1>
            <p className="mt-5 max-w-md text-[13.5px] leading-7 text-paper/80 md:text-[14.5px] md:leading-8">{lead}</p>
          </div>
        </div>
        <div className="relative min-h-[220px] overflow-hidden bg-navy-2 lg:min-h-[320px]">
          {frames.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={i === index ? item.alt : ""}
              aria-hidden={i !== index}
              className={`img-cover absolute inset-0 min-h-[220px] transition-opacity duration-700 lg:min-h-[320px] ${item.imageClass ?? "object-center"} ${i === index ? "opacity-100" : "opacity-0"}`}
              width={1536}
              height={1024}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="border-b border-line bg-paper" aria-label="パンくずリスト">
      <p className="site-wrap py-3 text-[12px] tracking-[0.06em] text-soft">
        <Link to="/" className="hover:text-navy">
          ホーム
        </Link>
        <span className="mx-2 text-line">/</span>
        <span className="text-navy">{current}</span>
      </p>
    </nav>
  );
}
