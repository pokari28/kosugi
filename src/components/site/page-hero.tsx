import { Link } from "@tanstack/react-router";

export function PageHero({
  title,
  lead,
  image,
  imageAlt,
  imageClass = "object-center",
}: {
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  imageClass?: string;
}) {
  return (
    <section className="bg-navy text-paper">
      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)]">
        <div className="flex items-center">
          <div className="site-wrap w-full py-12 lg:ml-auto lg:mr-0 lg:max-w-[540px] lg:py-16 lg:pr-8">
            <h1 className="text-[1.7rem] leading-snug font-black tracking-[0.08em] md:text-[2.05rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-md text-[13.5px] leading-7 text-paper/80 md:text-[14.5px] md:leading-8">
              {lead}
            </p>
          </div>
        </div>
        <div className="min-h-[200px] overflow-hidden bg-navy-2 lg:min-h-[320px]">
          <img
            src={image}
            alt={imageAlt}
            className={`img-cover min-h-[200px] lg:min-h-[320px] ${imageClass}`}
            width={1600}
            height={900}
          />
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
