import { asset, withBase } from "@/lib/paths";

export const COMPANY = {
  name: "株式会社コスギ",
  nameEn: "COSUGI Co., Ltd.",
  tagline: "ユニフォーム専門店",
  phone: "018-868-0567",
  hours: "平日 8:30～17:30",
  postal: "〒010-0802",
  address: "秋田県秋田市外旭川字神宮田36-5",
  addressFull: "〒010-0802 秋田県秋田市外旭川字神宮田36-5",
  foundedShowa: "昭和49年",
  established: "昭和53年3月",
  capital: "13,800千円",
  employees: "10名",
  accessNote: "JR秋田駅から車で約15分",
  parking: "駐車場完備",
  mapsQuery: "秋田県秋田市外旭川字神宮田36-5 株式会社コスギ",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("秋田県秋田市外旭川字神宮田36-5 株式会社コスギ"),
};

export const NAV = [
  { href: withBase("/#strength"), label: "コスギの強み" },
  { href: withBase("/products"), label: "取扱商品" },
  { href: withBase("/customize"), label: "オリジナル制作" },
  { href: withBase("/cases"), label: "導入事例" },
  { href: withBase("/#flow"), label: "ご提案の流れ" },
  { href: withBase("/#company"), label: "会社概要" },
] as const;

export const FOOTER_NAV_LEFT = [
  { href: withBase("/"), label: "トップ" },
  { href: withBase("/#strength"), label: "コスギの強み" },
  { href: withBase("/products"), label: "取扱商品" },
  { href: withBase("/customize"), label: "オリジナル制作" },
  { href: withBase("/cases"), label: "導入事例" },
] as const;

export const FOOTER_NAV_RIGHT = [
  { href: withBase("/#flow"), label: "ご提案の流れ" },
  { href: withBase("/#company"), label: "会社概要" },
  { href: withBase("/#access"), label: "アクセス" },
  { href: withBase("/privacy"), label: "プライバシーポリシー" },
] as const;

export const PRODUCTS = [
  {
    slug: "work",
    name: "作業服",
    image: asset("/images/product-work.jpg"),
    imageClass: "object-[center_18%]",
  },
  {
    slug: "office",
    name: "事務服",
    image: asset("/images/product-office.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "medical",
    name: "白衣・メディカルウェア",
    image: asset("/images/product-medical.jpg"),
    imageClass: "object-[center_18%]",
  },
  {
    slug: "rain",
    name: "雨衣・レインウェア",
    image: asset("/images/product-rain.jpg"),
    imageClass: "object-[center_16%]",
  },
  {
    slug: "print",
    name: "Tシャツ・プリント",
    image: asset("/images/product-tshirt.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "safety",
    name: "安全用品・その他",
    image: asset("/images/product-safety.jpg"),
    imageClass: "object-center",
  },
] as const;

export const PRODUCT_CATEGORIES = [
  {
    slug: "work",
    name: "作業服",
    summary: "作業環境に合わせた機能性と動きやすさを追求した作業服。",
    image: asset("/images/product-work.jpg"),
    imageClass: "object-[center_18%]",
  },
  {
    slug: "office",
    name: "事務服・オフィスウェア",
    summary: "快適性と清潔感を兼ね備えた、オフィス向けユニフォーム。",
    image: asset("/images/product-office.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "medical",
    name: "白衣・医療ウェア",
    summary: "医療・介護現場を支える、清潔で機能的なウェア。",
    image: asset("/images/product-medical.jpg"),
    imageClass: "object-[center_18%]",
  },
  {
    slug: "rain",
    name: "雨衣・レインウェア",
    summary: "悪天候から身を守る、高い防水性と耐久性。",
    image: asset("/images/product-rain.jpg"),
    imageClass: "object-[center_16%]",
  },
  {
    slug: "print",
    name: "Tシャツ・ポロシャツ",
    summary: "イベントやスタッフウェアに最適な各種ウェア。",
    image: asset("/images/product-tshirt.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "safety",
    name: "安全用品・保護具",
    summary: "現場の安全を守るための各種保護具・安全用品。",
    image: asset("/images/product-safety.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "shoes",
    name: "シューズ・靴",
    summary: "作業現場に適した安全性と快適性を備えた履物。",
    image: asset("/images/cat-shoes.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "winter",
    name: "防寒着・防寒用品",
    summary: "寒い季節の各種現場を支える防寒ウェア・防寒用品。",
    image: asset("/images/cat-winter.jpg"),
    imageClass: "object-[center_20%]",
  },
  {
    slug: "other",
    name: "その他商品",
    summary: "上記以外の各種用品も豊富に取り揃えています。",
    image: asset("/images/cat-other.jpg"),
    imageClass: "object-center",
  },
] as const;

export const CUSTOMIZE_SERVICES = [
  {
    slug: "embroidery",
    name: "刺繍加工",
    lead: "高級感のある仕上がりで、企業ロゴやネーム入れに最適です。",
    suitable: "建設・製造・医療など、長く着るユニフォームに。",
    merit: "耐久性が高く、洗濯を重ねても美しさが残ります。",
    image: asset("/images/original-bag.jpg"),
    imageClass: "object-[center_35%]",
  },
  {
    slug: "print",
    name: "プリント加工",
    lead: "多色デザインや大きなロゴも美しく再現できます。",
    suitable: "イベントウェア、スタッフTシャツ、チームウェアに。",
    merit: "短納期にも対応し、数量が多い案件もお任せください。",
    image: asset("/images/original-backs.jpg"),
    imageClass: "object-[center_20%]",
  },
  {
    slug: "patch",
    name: "ワッペン・ネーム加工",
    lead: "縫い付けワッペンやネームタグなど、様々な形状に対応できます。",
    suitable: "名入れ、部署表示、着脱できる識別に。",
    merit: "付け替えやすく、人員の入れ替わりにも柔軟です。",
    image: asset("/images/svc-patch.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "reflective",
    name: "反射材加工",
    lead: "夜間の視認性を高める反射材を、各種ウェアに加工します。",
    suitable: "道路工事、夜間作業、物流・交通誘導に。",
    merit: "安全基準に沿った配置を、現場に合わせてご提案します。",
    image: asset("/images/svc-reflective.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "hemming",
    name: "裾上げ・サイズ調整",
    lead: "体型に合わせたサイズ調整で、快適な着心地を実現します。",
    suitable: "既製品を現場に合わせて整えたい企業様に。",
    merit: "納品後のサイズ直しも、気軽にご相談いただけます。",
    image: asset("/images/svc-hemming.jpg"),
    imageClass: "object-center",
  },
  {
    slug: "design",
    name: "オリジナルデザイン制作",
    lead: "デザインからご提案し、オリジナルユニフォームを制作します。",
    suitable: "ブランド統一、採用強化、お客様対応の印象づくりに。",
    merit: "聞く・描く・作るまで、一社で伴走できることが強みです。",
    image: asset("/images/original-sketch.jpg"),
    imageClass: "object-center",
  },
] as const;

export const CUSTOMIZE_STEPS = [
  { num: "01", title: "ヒアリング", body: "ご要望や用途を詳しくお伺いします。" },
  { num: "02", title: "ご提案・デザイン", body: "最適なデザインとお見積りをご提案。" },
  { num: "03", title: "サンプル制作", body: "サンプルで仕上がりをご確認いただけます。" },
  { num: "04", title: "本制作", body: "高品質な製品を丁寧に制作します。" },
  { num: "05", title: "納品・アフターサポート", body: "納品後も安心のサポート体制。" },
] as const;

export const CASE_FILTERS = [
  { value: "all", label: "すべて" },
  { value: "construction", label: "建設業" },
  { value: "factory", label: "製造業" },
  { value: "medical", label: "医療・介護" },
  { value: "service", label: "サービス業" },
  { value: "other", label: "その他" },
] as const;

export const CASE_STUDIES = [
  {
    slug: "construction-1",
    industry: "construction",
    industryLabel: "建設業",
    client: "建設業のお客様",
    uniform: "空調服とオリジナル刺繍入り作業服",
    background: "夏場の現場負担を減らし、会社の印象も整えたいというご相談でした。",
    proposal: "通気性と視認性を両立した作業服に、社名刺繍を組み合わせてご提案しました。",
    effect: "快適性と企業イメージの向上を、現場から実感いただけています。",
    image: asset("/images/case-construction.jpg"),
  },
  {
    slug: "factory-1",
    industry: "factory",
    industryLabel: "製造業",
    client: "製造業のお客様",
    uniform: "安全性と機能性を重視したユニフォーム",
    background: "工場内の安全基準を満たしつつ、動きやすい服が必要でした。",
    proposal: "反射材付きの作業服で、安全性向上と作業効率の改善を実現。",
    effect: "現場の一体感と安全性の両立につながっています。",
    image: asset("/images/case-factory.jpg"),
  },
  {
    slug: "medical-1",
    industry: "medical",
    industryLabel: "医療・介護",
    client: "医療・介護のお客様",
    uniform: "清潔感のある白衣・スクラブ",
    background: "スタッフ全員のウェアを統一し、来院される方への印象を良くしたい。",
    proposal: "動きやすく洗濯に強いメディカルウェアをご提案しました。",
    effect: "スタッフの一体感と、お客様からの信頼感向上を実現。",
    image: asset("/images/case-medical.jpg"),
  },
  {
    slug: "service-1",
    industry: "service",
    industryLabel: "サービス業",
    client: "サービス業のお客様",
    uniform: "おもてなしの心を表現するユニフォーム",
    background: "接客の第一印象を高める、落ち着いたデザインを探していました。",
    proposal: "動きやすさと上品さを両立したジャケットをご提案。",
    effect: "お客様対応の印象向上につながっています。",
    image: asset("/images/case-service.jpg"),
  },
  {
    slug: "construction-2",
    industry: "construction",
    industryLabel: "建設業",
    client: "建設業のお客様",
    uniform: "耐久性と動きやすさを追求した作業服",
    background: "汚れやすく傷みやすい現場でも、長く着られる服を求めていました。",
    proposal: "生地と縫製を現場用途に合わせて選定し、名入れ加工も実施。",
    effect: "買い替え頻度の抑制と、作業効率の向上を実現。",
    image: asset("/images/slide-work.jpg"),
  },
  {
    slug: "event-1",
    industry: "other",
    industryLabel: "その他",
    client: "地域イベントのお客様",
    uniform: "イベントの一体感を高めるオリジナルTシャツ",
    background: "地域行事でスタッフと参加者が同じウェアを着たい。",
    proposal: "プリントTシャツを数量と納期に合わせて制作しました。",
    effect: "会場の一体感と、運営スタッフの識別しやすさが向上。",
    image: asset("/images/case-event.jpg"),
  },
] as const;

export const STRENGTHS = [
  {
    num: "01",
    title: "提案力",
    body: "現場を知るスタッフが、最適な\nユニフォームをご提案します。",
    image: asset("/images/strength-01.jpg"),
    imageClass: "object-[center_30%]",
  },
  {
    num: "02",
    title: "商品力",
    body: "作業服から事務服、白衣まで\n幅広い商品を取り揃えています。",
    image: asset("/images/strength-02.jpg"),
    imageClass: "object-center",
  },
  {
    num: "03",
    title: "加工・カスタマイズ",
    body: "刺繍・プリントなどの加工で、\nオリジナルユニフォームを実現。",
    image: asset("/images/strength-03.jpg"),
    imageClass: "object-center",
  },
] as const;

export const CASES = [
  {
    slug: "construction",
    title: "建設業",
    body: "動きやすく、耐久性に優れた作業服で\n現場のモチベーションが向上。",
    image: asset("/images/case-construction.jpg"),
  },
  {
    slug: "medical",
    title: "医療・介護",
    body: "清潔感のある白衣で、\nスタッフの印象もアップ。",
    image: asset("/images/case-medical.jpg"),
  },
  {
    slug: "factory",
    title: "製造業",
    body: "安全性と機能性を兼ね備えた\nユニフォームで事故を防止。",
    image: asset("/images/case-factory.jpg"),
  },
] as const;

export const FLOW = [
  {
    num: "01",
    title: "お問い合わせ",
    body: "お電話またはフォームより\nお気軽にご連絡ください。",
    icon: "mail" as const,
  },
  {
    num: "02",
    title: "ヒアリング・ご提案",
    body: "詳細にご要望を伺い、最適な\nユニフォームをご提案します。",
    icon: "users" as const,
  },
  {
    num: "03",
    title: "お見積り・サンプル",
    body: "お見積りとサンプルをご確認\nいただけます。",
    icon: "shirt" as const,
  },
  {
    num: "04",
    title: "ご発注・納品",
    body: "丁寧・迅速に納品まで\nサポートいたします。",
    icon: "box" as const,
  },
  {
    num: "05",
    title: "アフターフォロー",
    body: "納品後も安心のサポートで\n長くお付き合いします。",
    icon: "hands" as const,
  },
] as const;

export const CONTACT_CATEGORIES = [
  { value: "work", label: "作業服" },
  { value: "office", label: "事務服" },
  { value: "medical", label: "白衣・メディカルウェア" },
  { value: "rain", label: "雨衣・レインウェア" },
  { value: "print", label: "Tシャツ・プリント" },
  { value: "safety", label: "安全用品・保護具" },
  { value: "shoes", label: "シューズ・靴" },
  { value: "winter", label: "防寒着・防寒用品" },
  { value: "original", label: "オリジナルユニフォーム" },
  { value: "other", label: "その他" },
] as const;

export const HERO_SLIDES = [
  {
    id: "main",
    image: asset("/images/hero.jpg"),
    imageClass: "object-[62%_top]",
    alt: "作業服を着てヘルメットを持つスタッフ",
    tone: "dark" as "light" | "dark",
    heading: ["プロの現場を、", "カッコよく支える。"],
    lead: "ユニフォームの力で、働く人の誇りと企業の価値を高めます。",
    banner: ["ワーキングウェアのプロが、", "現場のパフォーマンスを支えます。"],
    features: [
      { icon: "building" as const, lines: ["秋田・庄内エリア中心", "約1,000社の取引実績"] },
      { icon: "shirt" as const, lines: ["豊富な品揃えと", "最適なご提案力"] },
      { icon: "hands" as const, lines: ["外商部門の", "提案型営業"] },
    ],
  },
  {
    id: "nurse",
    image: asset("/images/slide-nurse.jpg"),
    imageClass: "object-[70%_top] max-md:object-[18%_12%]",
    alt: "メディカルウェアを着たスタッフ",
    tone: "dark" as "light" | "dark",
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    banner: null,
    features: [
      { icon: "shirt" as const, lines: ["清潔感で安心感をプラス", "お客様からの信頼へ"] },
      { icon: "people" as const, lines: ["スタッフのやる気と", "一体感を向上"] },
      { icon: "city" as const, lines: ["企業のイメージ", "アップにも貢献"] },
    ],
  },
  {
    id: "work",
    image: asset("/images/slide-work.jpg"),
    imageClass: "object-[75%_top] max-md:object-[22%_14%]",
    alt: "建設現場で作業服を着たスタッフ",
    tone: "dark" as "light" | "dark",
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    banner: null,
    features: [
      { icon: "shirt" as const, lines: ["清潔感で安心感をプラス", "お客様からの信頼へ"] },
      { icon: "people" as const, lines: ["スタッフのやる気と", "一体感を向上"] },
      { icon: "city" as const, lines: ["企業のイメージ", "アップにも貢献"] },
    ],
  },
] as const;
