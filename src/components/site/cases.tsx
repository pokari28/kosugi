import { Link } from "@tanstack/react-router";
import { CASES } from "@/data/site";
import { Chevron } from "./layout";

export function Cases() {
  return (
    <section id="cases" className="scroll-mt-20 bg-paper py-16 md:py-24">
      <div className="site-wrap grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-14">
        <div>
          <p className="en-label">CASE STUDY</p>
          <h2 className="section-title mt-3">導入事例</h2>
          <p className="section-lead">
            さまざまな業種・業界の企業様に
            <br />
            ご導入いただいています。
          </p>
          <Link to="/cases" className="outline-btn mt-8">
            事例一覧を見る
            <Chevron />
          </Link>
        </div>

        <div id="case-grid" className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          {CASES.map((item) => (
            <article key={item.slug}>
              <div className="aspect-[16/10] overflow-hidden bg-line">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-cover"
                  width={900}
                  height={560}
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 text-[14px] font-bold tracking-[0.1em] text-navy">{item.title}</h3>
              <p className="mt-1.5 whitespace-pre-line text-[12.5px] leading-6 text-soft">{item.body}</p>
            </article>
          ))}

          <Link
            to="/cases"
            className="flex min-h-[180px] flex-col items-start justify-center bg-navy px-7 py-8 text-paper transition-opacity hover:opacity-90 sm:min-h-0"
          >
            <span className="flex items-center gap-3 text-[15px] font-medium tracking-[0.1em]">
              その他の事例を見る
              <Chevron />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
