import { Link } from "@tanstack/react-router";
import { Chevron } from "./layout";
import { asset } from "@/lib/paths";

export function Original() {
  return (
    <section id="original" className="scroll-mt-20 bg-navy text-paper">
      <div className="site-wrap grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="flex flex-col justify-center py-14 md:py-16 lg:pr-10">
          <h2 className="text-[1.6rem] leading-snug font-black tracking-[0.1em] md:text-[1.85rem]">
            オリジナルユニフォームの
            <br />
            制作もお任せください
          </h2>
          <p className="mt-6 text-[13.5px] leading-7 text-paper/80">
            企業のイメージや目的に合わせて、
            <br />
            デザインから加工までトータルでサポートします。
            <br />
            社名・ロゴ・個人名などの刺繍にも対応しています。
          </p>
          <Link to="/customize" className="outline-btn-dark mt-8 w-fit">
            加工・カスタマイズの詳細
            <Chevron />
          </Link>
        </div>

        <div className="grid grid-rows-[minmax(160px,0.85fr)_minmax(180px,1.15fr)] gap-3 py-0 pb-8 lg:py-8">
          <div className="overflow-hidden bg-navy-2">
            <img
              src={asset("/images/emb-machine.jpg")}
              alt="刺繍機"
              className="img-cover object-[center_42%]"
              width={1500}
              height={1125}
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden bg-navy-2">
              <img
                src={asset("/images/uniform-back.jpg")}
                alt="COSUGIのロゴを入れた作業着"
                className="img-cover object-[center_78%]"
                width={1200}
                height={1600}
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden bg-paper">
              <img
                src={asset("/images/original-sketch.jpg")}
                alt="ユニフォームのデザイン画"
                className="img-cover object-center"
                width={700}
                height={712}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
