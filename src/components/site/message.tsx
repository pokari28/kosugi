import { asset } from "@/lib/paths";

const PARAGRAPHS = [
  "私たち株式会社コスギは、昭和49年の創業以来、ワーキングウェアの専門商社として、地域の皆様とともに歩んでまいりました。",
  "作業服やユニフォームは、単に仕事で着用する衣服ではありません。働く人の安全や快適さを守るとともに、企業の姿勢や信頼を伝える大切な役割を担っています。",
  "私たちは、お客様一社一社の仕事内容や職場環境、ご要望に耳を傾け、数多くの商品から最適な一着をご提案することを大切にしています。",
  "また、社名やロゴの刺繍、プリント加工などを通じて、企業の個性やチームとしての一体感を形にするお手伝いも行っています。",
  "時代とともに働き方や求められる機能は変化していきますが、お客様との信頼関係を何よりも大切にする姿勢は、これからも変わりません。",
  "地域の企業と、そこで働く皆様のお役に立てるよう、社員一同、誠実に取り組んでまいります。",
  "今後とも、株式会社コスギをよろしくお願い申し上げます。",
];

export function Message() {
  return (
    <section id="message" className="scroll-mt-20 bg-paper py-16 md:py-24">
      <div className="site-wrap">
        <p className="en-label">MESSAGE</p>
        <h2 className="section-title mt-3">代表挨拶</h2>
        <p className="mt-2 text-[12px] tracking-[0.06em] text-muted">原稿案（社長確認前）</p>
        <div className="message-layout mt-8 grid items-start gap-8 md:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)]">
          <figure>
            <div className="overflow-hidden bg-line aspect-[4/5] md:aspect-[3/4]">
              <img
                src={asset("/images/president.jpg")}
                alt="株式会社コスギ 代表取締役社長 斎藤末雄"
                className="h-full w-full object-cover object-[66%_28%]"
                width={1500}
                height={1125}
              />
            </div>
          </figure>
          <div className="message-copy">
            <p className="text-[1.2rem] font-bold leading-relaxed tracking-[0.06em] text-navy md:text-[1.45rem]">
              働く人を支え、
              <br />
              地域の企業とともに歩む。
            </p>
            <div className="message-body mt-6 space-y-4 text-[13.5px] leading-8 text-soft">
              {PARAGRAPHS.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <p className="mt-8 text-[13.5px] leading-7 tracking-[0.08em] text-navy">
              株式会社コスギ
              <br />
              代表取締役社長
            </p>
            <p className="president-name">斎藤 末雄</p>
          </div>
        </div>
      </div>
    </section>
  );
}
