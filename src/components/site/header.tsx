"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { COMPANY, NAV } from "@/data/site";
import { Logo } from "./logo";
import { CloseIcon, MailIcon, MenuIcon } from "./icons";
import { cn } from "@/lib/utils";

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = open || (!overlay && scrolled);

  return (
    <header
      className={cn(
        "z-50 transition-[background-color,box-shadow] duration-200",
        overlay ? "fixed top-0 right-0 left-0" : "sticky top-0",
        solid ? "bg-paper shadow-[var(--shadow-header)]" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "site-wrap flex h-[68px] items-stretch md:h-[74px]",
          overlay && !open && "[filter:drop-shadow(0_1px_8px_rgb(255_255_255))]",
        )}
      >
        <div className="flex items-center">
          <Logo />
        </div>

        <nav
          className="ml-auto hidden items-center gap-7 pr-8 xl:gap-9 lg:flex"
          aria-label="メインナビゲーション"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-[0.1em] text-navy transition-opacity hover:opacity-65"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden min-w-[160px] items-center justify-center gap-2 self-stretch bg-navy px-5 text-[13px] font-medium tracking-[0.12em] text-paper transition-opacity hover:opacity-90 lg:inline-flex"
        >
          <MailIcon size={16} />
          お問い合わせ
        </Link>

        <div className="ml-auto flex items-center lg:hidden">
          <Link
            to="/contact"
            className="inline-flex size-11 items-center justify-center text-navy"
            aria-label="お問い合わせ"
          >
            <MailIcon size={20} />
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-navy"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="site-wrap flex flex-col py-4" aria-label="モバイルメニュー">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-12 items-center border-b border-line text-[15px] tracking-[0.08em] text-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${COMPANY.phone.replaceAll("-", "")}`}
              className="flex min-h-12 items-center text-[15px] text-navy"
              onClick={() => setOpen(false)}
            >
              TEL {COMPANY.phone}
            </a>
            <Link to="/contact" className="solid-btn mt-3 w-full" onClick={() => setOpen(false)}>
              お問い合わせフォームへ
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
