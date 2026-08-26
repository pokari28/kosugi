import { STRENGTHS } from "@/data/site";
import { Chevron } from "./layout";

export function Strength() {
  return (
    <section id="strength" className="scroll-mt-20 bg-paper py-16 md:py-24">
      <div className="site-wrap grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-14">
        <div>
          <p className="en-label">STRENGTH</p>
          <h2 className="section-title mt-3">コスギが選ばれる理由</h2>
          <p className="section-lead">
            創業から約50年、秋田・庄内エリアで多くの企業様に
            <br className="hidden md:block" />
            ユニフォームをご提案してきました。
            <br />
            豊富な品揃えと提案力で、お客様の課題解決を支えます。
          </p>
          <a href="#strength-cards" className="outline-btn mt-8">
            詳しく見る
            <Chevron />
          </a>
        </div>

        <div id="strength-cards" className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
          {STRENGTHS.map((item) => (
            <article key={item.num}>
              <div className="relative aspect-[4/3] overflow-hidden bg-line">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`img-cover ${item.imageClass}`}
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 text-[42px] leading-none font-black tracking-tight text-paper drop-shadow-[0_1px_8px_rgb(0_37_89_/_0.35)]">
                  {item.num}
                </span>
              </div>
              <h3 className="mt-3 text-[15px] font-bold tracking-[0.08em] text-navy">{item.title}</h3>
              <p className="mt-1.5 whitespace-pre-line text-[12.5px] leading-6 text-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
