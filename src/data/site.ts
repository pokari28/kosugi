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
  { href: withBase("/#products"), label: "取扱商品" },
  { href: withBase("/#cases"), label: "導入事例" },
  { href: withBase("/#flow"), label: "ご提案の流れ" },
  { href: withBase("/#company"), label: "会社概要" },
] as const;

export const FOOTER_NAV_LEFT = [
  { href: withBase("/"), label: "トップ" },
  { href: withBase("/#strength"), label: "コスギの強み" },
  { href: withBase("/#products"), label: "取扱商品" },
  { href: withBase("/#cases"), label: "導入事例" },
  { href: withBase("/#flow"), label: "ご提案の流れ" },
] as const;

export const FOOTER_NAV_RIGHT = [
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
  { value: "safety", label: "安全用品・その他" },
  { value: "original", label: "オリジナルユニフォーム" },
  { value: "other", label: "その他" },
] as const;

export const HERO_SLIDES = [
  {
    id: "main",
    image: asset("/images/hero.jpg"),
    imageClass: "object-[62%_top]",
    alt: "作業服を着てヘルメットを持つスタッフ",
    tone: "light" as const,
    heading: ["プロの現場を、", "カッコよく支える。"],
    lead: "ユニフォームの力で、働く人の誇りと企業の価値を高めます。",
    showBuilding: true,
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
    tone: "dark" as const,
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    showBuilding: false,
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
    tone: "dark" as const,
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    showBuilding: false,
    banner: null,
    features: [
      { icon: "shirt" as const, lines: ["清潔感で安心感をプラス", "お客様からの信頼へ"] },
      { icon: "people" as const, lines: ["スタッフのやる気と", "一体感を向上"] },
      { icon: "city" as const, lines: ["企業のイメージ", "アップにも貢献"] },
    ],
  },
] as const;
