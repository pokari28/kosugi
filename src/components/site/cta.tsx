import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/data/site";
import { MailIcon, PhoneIcon } from "./icons";

export function Cta() {
  return (
    <section id="contact-cta" className="bg-navy text-paper">
      <div className="site-wrap flex flex-col items-start justify-between gap-8 py-12 md:flex-row md:items-center md:py-14">
        <div>
          <h2 className="text-[1.35rem] leading-snug font-black tracking-[0.08em] md:text-[1.65rem]">
            ユニフォームのことなら、なんでもご相談ください。
          </h2>
          <p className="mt-3 text-[13px] leading-7 tracking-[0.04em] text-paper/75">
            御見積・ご提案は無料です。お気軽にお問い合わせください。
          </p>
          <a
            href={`tel:${COMPANY.phone.replaceAll("-", "")}`}
            className="mt-6 inline-flex items-center gap-3 text-paper"
          >
            <PhoneIcon size={26} />
            <span className="text-[1.85rem] font-bold tracking-[0.04em] md:text-[2.05rem]">
              {COMPANY.phone}
            </span>
          </a>
          <p className="mt-2 text-[12.5px] tracking-[0.06em] text-paper/70">
            受付時間｜{COMPANY.hours}
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex min-h-[72px] items-center gap-4 bg-yellow px-7 py-4 text-navy transition-opacity hover:opacity-90"
        >
          <MailIcon size={28} />
          <span className="text-left">
            <span className="block text-[15px] font-bold tracking-[0.1em]">お問い合わせフォームへ</span>
            <span className="mt-0.5 block text-[11px] tracking-[0.14em]">24時間受付中</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
