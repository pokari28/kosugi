import { Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/site";
import { Chevron } from "./layout";

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 bg-paper pb-16 md:pb-24">
      <div className="site-wrap grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-14">
        <div>
          <p className="en-label">PRODUCTS</p>
          <h2 className="section-title mt-3">取扱商品</h2>
          <p className="section-lead">
            あらゆる業種・職種に対応する
            <br />
            豊富なラインナップ。
          </p>
          <Link to="/products" className="outline-btn mt-8">
            取扱商品一覧
            <Chevron />
          </Link>
        </div>

        <div id="product-grid" className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8">
          {PRODUCTS.map((item) => (
            <Link
              key={item.slug}
              to="/contact"
              search={{ category: item.slug }}
              className="group block"
            >
              <div className="aspect-[5/4] overflow-hidden bg-line">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`img-cover transition-opacity duration-200 group-hover:opacity-90 ${item.imageClass}`}
                  width={800}
                  height={640}
                  loading="lazy"
                />
              </div>
              <p className="mt-2.5 text-center text-[13px] font-medium tracking-[0.08em] text-navy md:text-[14px]">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
