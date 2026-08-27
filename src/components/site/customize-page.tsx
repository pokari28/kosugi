import { Link } from "@tanstack/react-router";
import { CUSTOMIZE_SERVICES, CUSTOMIZE_STEPS } from "@/data/site";
import { asset } from "@/lib/paths";
import { Chevron } from "./layout";
import { PageCta } from "./page-cta";
import { Breadcrumb, PageHero } from "./page-hero";

export function CustomizePage() {
  return (
    <>
      <PageHero
        title="加工・カスタマイズの詳細"
        lead="企業の想いをカタチにする、オリジナルユニフォーム制作"
        image={asset("/images/hero-customize.jpg")}
        imageAlt="工業用刺繍ミシン"
        imageClass="object-center"
      />
      <Breadcrumb current="加工・カスタマイズの詳細" />

      <section className="bg-paper py-12 md:py-16">
        <div className="site-wrap">
          <div className="text-center">
            <h2 className="section-title">加工・カスタマイズメニュー</h2>
            <span className="mx-auto mt-3 block h-[2px] w-8 bg-navy" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {CUSTOMIZE_SERVICES.map((item) => (
              <article key={item.slug} className="flex flex-col">
                <div className="aspect-[5/4] overflow-hidden bg-line">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`img-cover ${item.imageClass}`}
                    width={1200}
                    height={960}
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-bold tracking-[0.08em] text-navy">{item.name}</h3>
                <p className="mt-2 text-[13px] leading-7 text-soft">{item.lead}</p>
                <p className="mt-2 text-[12.5px] leading-6 text-muted">向いている用途：{item.suitable}</p>
                <p className="mt-1 text-[12.5px] leading-6 text-muted">コスギの強み：{item.merit}</p>
                <Link to="/contact" search={{ category: "original" }} className="outline-btn mt-5 w-fit">
                  詳しく相談する
                  <Chevron />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page py-12 md:py-16">
        <div className="site-wrap">
          <div className="text-center">
            <h2 className="section-title">オリジナル制作の流れ</h2>
            <span className="mx-auto mt-3 block h-[2px] w-8 bg-navy" />
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {CUSTOMIZE_STEPS.map((step) => (
              <li key={step.num} className="bg-paper px-5 py-6">
                <p className="text-[12px] font-bold tracking-[0.16em] text-navy">{step.num}</p>
                <h3 className="mt-2 text-[14px] font-bold tracking-[0.08em] text-navy">{step.title}</h3>
                <p className="mt-2 text-[12.5px] leading-6 text-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageCta
        icon="bulb"
        title="まずはお気軽にご相談ください"
        body="経験豊富なスタッフが、最適なご提案をいたします。"
        category="original"
        tone="paper"
      />
    </>
  );
}
