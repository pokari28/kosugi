import { COMPANY } from "@/data/site";
import { Chevron } from "./layout";

const ROWS = [
  { label: "会社名", value: COMPANY.name },
  { label: "資本金", value: COMPANY.capital },
  { label: "所在地", value: `${COMPANY.postal}\n${COMPANY.address}` },
  { label: "従業員数", value: COMPANY.employees },
  { label: "電話番号", value: COMPANY.phone },
  {
    label: "事業内容",
    value: "各種ワーキングウェアの販売を主体に、\nヘルメットや雨具、白衣、\nTシャツプリントなども手掛けています。",
  },
  { label: "設立", value: COMPANY.established },
] as const;

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper pt-16 md:pt-24">
      <div className="site-wrap">
        <h2 className="section-title">コスギについて</h2>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <p className="text-[14px] leading-[2] tracking-[0.04em] text-soft">
            創業は{COMPANY.foundedShowa}。
            <br />
            ワーキングウェアの専門商社として、
            <br />
            秋田・庄内地域を中心に約1,000社の
            <br />
            お客様と信頼関係を築いてきました。
            <br />
            外商部門の提案型営業で、
            <br />
            企業の「働く」を支え続けます。
          </p>
          <div className="aspect-[16/10] overflow-hidden bg-line">
            <img
              src="/images/building.jpg"
              alt="株式会社コスギ 社屋外観"
              className="img-cover object-[center_60%]"
              width={1536}
              height={1024}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Company() {
  const left = [ROWS[0], ROWS[2], ROWS[4], ROWS[6]];
  const right = [ROWS[1], ROWS[3], ROWS[5]];

  return (
    <section id="company" className="scroll-mt-20 bg-paper py-16 md:py-20">
      <div className="site-wrap">
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
          <dl className="divide-y divide-line">
            {left.map((row) => (
              <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-5 md:grid-cols-[8rem_1fr]">
                <dt className="text-[13px] font-medium tracking-[0.08em] text-navy">{row.label}</dt>
                <dd className="whitespace-pre-line text-[13.5px] leading-7 text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="divide-y divide-line">
            {right.map((row) => (
              <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-5 md:grid-cols-[8rem_1fr]">
                <dt className="text-[13px] font-medium tracking-[0.08em] text-navy">{row.label}</dt>
                <dd className="whitespace-pre-line text-[13.5px] leading-7 text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-12 flex justify-center">
          <a href="#company" className="solid-btn">
            会社概要を見る
            <Chevron />
          </a>
        </div>
      </div>
    </section>
  );
}
