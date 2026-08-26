import { COMPANY } from "@/data/site";
import { asset } from "@/lib/paths";

const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapsQuery)}&hl=ja&z=16&output=embed`;

export function Access() {
  return (
    <section id="access" className="scroll-mt-20 bg-paper pb-16 md:pb-24">
      <div className="site-wrap">
        <h2 className="section-title">アクセス</h2>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
          <a
            href={COMPANY.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="relative block aspect-[16/10] overflow-hidden bg-line"
            aria-label="Google マップで開く"
          >
            <img
              src={asset("/images/map.jpg")}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              width={1000}
              height={596}
              loading="lazy"
            />
            <iframe
              title="株式会社コスギ所在地マップ"
              src={embedSrc}
              className="absolute inset-0 h-full w-full border-0 bg-paper"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
          <div className="text-[14px] leading-8 tracking-[0.04em] text-ink">
            <p>{COMPANY.postal}</p>
            <p>{COMPANY.address}</p>
            <p className="mt-6">{COMPANY.accessNote}</p>
            <p>{COMPANY.parking}</p>
            <a
              href={COMPANY.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-[13px] tracking-[0.08em] text-navy underline underline-offset-4"
            >
              Google マップで開く
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
