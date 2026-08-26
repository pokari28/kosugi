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
  { href: "/#strength", label: "コスギの強み" },
  { href: "/#products", label: "取扱商品" },
  { href: "/#cases", label: "導入事例" },
  { href: "/#flow", label: "ご提案の流れ" },
  { href: "/#company", label: "会社概要" },
] as const;

export const FOOTER_NAV_LEFT = [
  { href: "/", label: "トップ" },
  { href: "/#strength", label: "コスギの強み" },
  { href: "/#products", label: "取扱商品" },
  { href: "/#cases", label: "導入事例" },
  { href: "/#flow", label: "ご提案の流れ" },
] as const;

export const FOOTER_NAV_RIGHT = [
  { href: "/#company", label: "会社概要" },
  { href: "/#access", label: "アクセス" },
  { href: "/privacy", label: "プライバシーポリシー" },
] as const;

export const PRODUCTS = [
  {
    slug: "work",
    name: "作業服",
    image: "/images/product-work.jpg",
    imageClass: "object-[center_20%]",
  },
  {
    slug: "office",
    name: "事務服",
    image: "/images/product-office.jpg",
    imageClass: "object-center",
  },
  {
    slug: "medical",
    name: "白衣・メディカルウェア",
    image: "/images/product-medical.jpg",
    imageClass: "object-center",
  },
  {
    slug: "rain",
    name: "雨衣・レインウェア",
    image: "/images/product-rain.jpg",
    imageClass: "object-center",
  },
  {
    slug: "print",
    name: "Tシャツ・プリント",
    image: "/images/product-tshirt.jpg",
    imageClass: "object-center",
  },
  {
    slug: "safety",
    name: "安全用品・その他",
    image: "/images/product-safety.jpg",
    imageClass: "object-center",
  },
] as const;

export const STRENGTHS = [
  {
    num: "01",
    title: "提案力",
    body: "現場を知るスタッフが、最適な\nユニフォームをご提案します。",
    image: "/images/strength-01.jpg",
    imageClass: "object-[center_30%]",
  },
  {
    num: "02",
    title: "商品力",
    body: "作業服から事務服、白衣まで\n幅広い商品を取り揃えています。",
    image: "/images/strength-02.jpg",
    imageClass: "object-center",
  },
  {
    num: "03",
    title: "加工・カスタマイズ",
    body: "刺繍・プリントなどの加工で、\nオリジナルユニフォームを実現。",
    image: "/images/strength-03.jpg",
    imageClass: "object-center",
  },
] as const;

export const CASES = [
  {
    slug: "construction",
    title: "建設業",
    body: "動きやすく、耐久性に優れた作業服で\n現場のモチベーションが向上。",
    image: "/images/case-construction.jpg",
  },
  {
    slug: "medical",
    title: "医療・介護",
    body: "清潔感のある白衣で、\nスタッフの印象もアップ。",
    image: "/images/case-medical.jpg",
  },
  {
    slug: "factory",
    title: "製造業",
    body: "安全性と機能性を兼ね備えた\nユニフォームで事故を防止。",
    image: "/images/case-factory.jpg",
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

export const IMPRESSION_POINTS = [
  {
    icon: "shirt" as const,
    title: "清潔感で安心感をプラス",
    body: "衛生的で清潔感のある印象が、\nお客様からの信頼につながります。",
  },
  {
    icon: "people" as const,
    title: "スタッフのやる気と一体感を向上",
    body: "着心地の良いユニフォームが\n働く人のやる気を引き出します。",
  },
  {
    icon: "city" as const,
    title: "企業のイメージアップにも貢献",
    body: "統一感のあるユニフォームが\n企業ブランドの価値を高めます。",
  },
] as const;

export const HERO_SLIDES = [
  {
    id: "main",
    image: "/images/hero.jpg",
    imageClass: "object-[62%_18%]",
    alt: "作業服を着てヘルメットを持つスタッフ",
    tone: "light" as const,
    heading: ["プロの現場を、", "カッコよく支える。"],
    lead: "ユニフォームの力で、働く人の誇りと企業の価値を高めます。",
    barLabel: { kind: "script" as const, text: "Point" },
    points: [
      {
        icon: "building" as const,
        title: "秋田・庄内エリア中心",
        body: "約1,000社の取引実績。地域に根ざした提案型営業です。",
      },
      {
        icon: "shirt" as const,
        title: "豊富な品揃えと提案力",
        body: "作業服から事務服、白衣まで最適な一着をご提案します。",
      },
      {
        icon: "hands" as const,
        title: "外商部門の提案型営業",
        body: "現場を知るスタッフが、課題解決まで伴走します。",
      },
    ],
  },
  {
    id: "medical",
    image: "/images/slide-medical.jpg",
    imageClass: "object-[80%_center]",
    alt: "清潔感のある白衣を着たスタッフ",
    tone: "light" as const,
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    barLabel: { kind: "script" as const, text: "Point" },
    points: IMPRESSION_POINTS,
  },
  {
    id: "office",
    image: "/images/slide-office.jpg",
    imageClass: "object-[80%_center]",
    alt: "事務服を着たスタッフ",
    tone: "light" as const,
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    barLabel: { kind: "script" as const, text: "Point" },
    points: IMPRESSION_POINTS,
  },
  {
    id: "nurse",
    image: "/images/slide-nurse.jpg",
    imageClass: "object-[80%_center]",
    alt: "メディカルウェアを着たスタッフ",
    tone: "dark" as const,
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    barLabel: { kind: "script" as const, text: "Point" },
    points: IMPRESSION_POINTS,
  },
  {
    id: "work",
    image: "/images/slide-work.jpg",
    imageClass: "object-[80%_center]",
    alt: "建設現場で作業服を着たスタッフ",
    tone: "dark" as const,
    heading: ["「見た目の印象」が、", "信頼と安心をつくる。"],
    lead: "清潔感のあるユニフォームが、スタッフのモチベーションと企業イメージを高めます。",
    barLabel: { kind: "script" as const, text: "Point" },
    points: IMPRESSION_POINTS,
  },
  {
    id: "safety",
    image: "/images/slide-safety.jpg",
    imageClass: "object-[80%_center]",
    alt: "空調服とヘルメットを着用したスタッフ",
    tone: "light" as const,
    heading: ["家族のために、", "今日も安全第一で。"],
    lead: "見えないところで支える仕事だからこそ、確かな品質と安全管理を徹底します。一つひとつの現場を大切に、地域の未来をつくっていきます。",
    barLabel: { kind: "plain" as const, text: "私たちの強み" },
    points: [
      {
        icon: "shield" as const,
        title: "安全を最優先に",
        body: "全ての現場で安全管理を徹底し、事故ゼロを目指します。",
      },
      {
        icon: "team" as const,
        title: "チームワークで高品質を",
        body: "経験豊富なスタッフが連携し、高品質な施工を実現します。",
      },
      {
        icon: "city" as const,
        title: "地域とともに未来をつくる",
        body: "インフラ整備を通じて、安心して暮らせる街づくりに貢献します。",
      },
    ],
  },
] as const;
