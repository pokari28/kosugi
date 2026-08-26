import { Link } from "@tanstack/react-router";
import { COMPANY, FOOTER_NAV_LEFT, FOOTER_NAV_RIGHT } from "@/data/site";
import { Logo } from "./logo";
import { MailIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-navy text-paper">
      <div className="site-wrap grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_0.9fr] md:gap-8 md:py-16">
        <div>
          <Logo variant="white" />
          <p className="mt-2 text-[13px] tracking-[0.16em] text-paper/70">{COMPANY.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] tracking-[0.08em]">
          <ul className="space-y-2.5">
            {FOOTER_NAV_LEFT.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-paper/90 transition-opacity hover:opacity-70">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            {FOOTER_NAV_RIGHT.map((item) => (
              <li key={item.href}>
                {item.href === "/privacy" ? (
                  <Link to="/privacy" className="text-paper/90 transition-opacity hover:opacity-70">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="text-paper/90 transition-opacity hover:opacity-70">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/contact"
          className="flex flex-col items-center justify-center gap-3 border border-paper/35 px-6 py-8 text-center transition-colors hover:bg-paper/8"
        >
          <MailIcon size={28} />
          <span className="text-[14px] font-medium tracking-[0.1em]">お問い合わせフォームへ</span>
          <span className="text-[11px] tracking-[0.14em] text-paper/65">24時間受付中</span>
        </Link>
      </div>
      <div className="border-t border-paper/10">
        <p className="site-wrap py-4 text-center text-[11px] tracking-[0.12em] text-paper/55 md:text-right">
          © {COMPANY.nameEn}
        </p>
      </div>
    </footer>
  );
}
