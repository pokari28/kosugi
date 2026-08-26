import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layout-DsezornQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COMPANY = {
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
	mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("秋田県秋田市外旭川字神宮田36-5 株式会社コスギ")
};
var NAV = [
	{
		href: "/#strength",
		label: "コスギの強み"
	},
	{
		href: "/#products",
		label: "取扱商品"
	},
	{
		href: "/#cases",
		label: "導入事例"
	},
	{
		href: "/#flow",
		label: "ご提案の流れ"
	},
	{
		href: "/#company",
		label: "会社概要"
	}
];
var FOOTER_NAV_LEFT = [
	{
		href: "/",
		label: "トップ"
	},
	{
		href: "/#strength",
		label: "コスギの強み"
	},
	{
		href: "/#products",
		label: "取扱商品"
	},
	{
		href: "/#cases",
		label: "導入事例"
	},
	{
		href: "/#flow",
		label: "ご提案の流れ"
	}
];
var FOOTER_NAV_RIGHT = [
	{
		href: "/#company",
		label: "会社概要"
	},
	{
		href: "/#access",
		label: "アクセス"
	},
	{
		href: "/privacy",
		label: "プライバシーポリシー"
	}
];
var PRODUCTS = [
	{
		slug: "work",
		name: "作業服",
		image: "/images/product-work.jpg",
		imageClass: "object-[center_20%]"
	},
	{
		slug: "office",
		name: "事務服",
		image: "/images/product-office.jpg",
		imageClass: "object-center"
	},
	{
		slug: "medical",
		name: "白衣・メディカルウェア",
		image: "/images/product-medical.jpg",
		imageClass: "object-center"
	},
	{
		slug: "rain",
		name: "雨衣・レインウェア",
		image: "/images/product-rain.jpg",
		imageClass: "object-center"
	},
	{
		slug: "print",
		name: "Tシャツ・プリント",
		image: "/images/product-tshirt.jpg",
		imageClass: "object-center"
	},
	{
		slug: "safety",
		name: "安全用品・その他",
		image: "/images/product-safety.jpg",
		imageClass: "object-center"
	}
];
var STRENGTHS = [
	{
		num: "01",
		title: "提案力",
		body: "現場を知るスタッフが、最適な\nユニフォームをご提案します。",
		image: "/images/strength-01.jpg",
		imageClass: "object-[center_30%]"
	},
	{
		num: "02",
		title: "商品力",
		body: "作業服から事務服、白衣まで\n幅広い商品を取り揃えています。",
		image: "/images/strength-02.jpg",
		imageClass: "object-center"
	},
	{
		num: "03",
		title: "加工・カスタマイズ",
		body: "刺繍・プリントなどの加工で、\nオリジナルユニフォームを実現。",
		image: "/images/strength-03.jpg",
		imageClass: "object-center"
	}
];
var CASES = [
	{
		slug: "construction",
		title: "建設業",
		body: "動きやすく、耐久性に優れた作業服で\n現場のモチベーションが向上。",
		image: "/images/case-construction.jpg"
	},
	{
		slug: "medical",
		title: "医療・介護",
		body: "清潔感のある白衣で、\nスタッフの印象もアップ。",
		image: "/images/case-medical.jpg"
	},
	{
		slug: "factory",
		title: "製造業",
		body: "安全性と機能性を兼ね備えた\nユニフォームで事故を防止。",
		image: "/images/case-factory.jpg"
	}
];
var FLOW = [
	{
		num: "01",
		title: "お問い合わせ",
		body: "お電話またはフォームより\nお気軽にご連絡ください。",
		icon: "mail"
	},
	{
		num: "02",
		title: "ヒアリング・ご提案",
		body: "詳細にご要望を伺い、最適な\nユニフォームをご提案します。",
		icon: "users"
	},
	{
		num: "03",
		title: "お見積り・サンプル",
		body: "お見積りとサンプルをご確認\nいただけます。",
		icon: "shirt"
	},
	{
		num: "04",
		title: "ご発注・納品",
		body: "丁寧・迅速に納品まで\nサポートいたします。",
		icon: "box"
	},
	{
		num: "05",
		title: "アフターフォロー",
		body: "納品後も安心のサポートで\n長くお付き合いします。",
		icon: "hands"
	}
];
var CONTACT_CATEGORIES = [
	{
		value: "work",
		label: "作業服"
	},
	{
		value: "office",
		label: "事務服"
	},
	{
		value: "medical",
		label: "白衣・メディカルウェア"
	},
	{
		value: "rain",
		label: "雨衣・レインウェア"
	},
	{
		value: "print",
		label: "Tシャツ・プリント"
	},
	{
		value: "safety",
		label: "安全用品・その他"
	},
	{
		value: "original",
		label: "オリジナルユニフォーム"
	},
	{
		value: "other",
		label: "その他"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Logo({ variant = "navy", compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("inline-flex items-baseline gap-1.5 tracking-wide", variant === "white" ? "text-paper" : "text-navy"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-medium", compact ? "text-[10px]" : "text-[11px] md:text-xs"),
			children: "株式会社"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-black tracking-[0.12em]", compact ? "text-xl" : "text-[22px] md:text-[24px]"),
			children: "コスギ"
		})]
	});
}
var stroke = {
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.4,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
function BuildingIcon({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10",
				y: "3.5",
				width: "12",
				height: "7.5",
				rx: "0.4",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "12",
				width: "20",
				height: "7.5",
				rx: "0.4",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2.5",
				y: "20.5",
				width: "27",
				height: "8",
				rx: "0.4",
				...stroke
			})
		]
	});
}
function ShirtIcon({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11 6.5 8 9.2 4.5 12.2 8 14.5v12.2h16V14.5l3.5-2.3L24 9.2 21 6.5s-1.2 3-5 3-5-3-5-3Z",
			...stroke
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M13 6.8c.6 1.6 2 2.4 3 2.4s2.4-.8 3-2.4",
			...stroke
		})]
	});
}
function HandsIcon({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13.5 18.5c-2.2-1.8-3.8-4.6-3.2-7.2.4-1.6 1.8-2.6 3.2-2.3 1.3.3 2.2 1.6 2.5 3",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18.5 18.5c2.2-1.8 3.8-4.6 3.2-7.2-.4-1.6-1.8-2.6-3.2-2.3-1.3.3-2.2 1.6-2.5 3",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 19.5c-1.8 1.2-3.2 3.2-3.2 5.6h18.4c0-2.4-1.4-4.4-3.2-5.6",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 12.2v6.2",
				...stroke
			})
		]
	});
}
function MailIcon({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "4.5",
			y: "8.5",
			width: "23",
			height: "15",
			rx: "1.2",
			...stroke
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "m5.5 10 10.5 8 10.5-8",
			...stroke
		})]
	});
}
function UsersIcon({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "11",
				r: "3.2",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.5 21.5c.6-3.2 2.6-5 5.5-5s4.9 1.8 5.5 5",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "21.2",
				cy: "11.5",
				r: "2.6",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20.2 16.6c2.4.2 4.2 1.8 4.8 4.4",
				...stroke
			})
		]
	});
}
function BoxIcon({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5.5 11.5 16 6.5l10.5 5-10.5 5-10.5-5Z",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5.5 11.5v10l10.5 5 10.5-5v-10",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 16.5v10",
				...stroke
			})
		]
	});
}
function PhoneIcon({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8.5 6.8c.4-.6 1.2-.8 1.9-.6l3.2 1c.7.2 1.2.8 1.3 1.5l.4 3.2c.1.7-.2 1.4-.8 1.8l-1.6 1.1c1.6 3.2 4 5.5 7.3 6.9l1.2-1.5c.5-.6 1.2-.8 2-.6l3.1.8c.7.2 1.2.8 1.3 1.5l.6 3.2c.1.8-.3 1.5-1 1.8-2.2.9-7.1.8-12.8-4.2S6.8 10.4 8.5 6.8Z",
			...stroke
		})
	});
}
function MenuIcon({ className, size = 24 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 7h16M4 12h16M4 17h16",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round"
		})
	});
}
function CloseIcon({ className, size = 24 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 6l12 12M18 6 6 18",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round"
		})
	});
}
function FlowIcon({ name, className, size = 36 }) {
	const Cmp = {
		mail: MailIcon,
		users: UsersIcon,
		shirt: ShirtIcon,
		box: BoxIcon,
		hands: HandsIcon
	}[name];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cmp, {
		className,
		size
	});
}
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("sticky top-0 z-50 bg-paper transition-shadow duration-200", scrolled && "shadow-[var(--shadow-header)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-wrap flex h-[68px] items-stretch md:h-[74px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-auto hidden items-center gap-7 pr-8 xl:gap-9 lg:flex",
					"aria-label": "メインナビゲーション",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "text-[13px] tracking-[0.1em] text-navy transition-opacity hover:opacity-65",
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "hidden min-w-[160px] items-center justify-center gap-2 self-stretch bg-navy px-5 text-[13px] font-medium tracking-[0.12em] text-paper transition-opacity hover:opacity-90 lg:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailIcon, { size: 16 }), "お問い合わせ"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "inline-flex size-11 items-center justify-center text-navy",
						"aria-label": "お問い合わせ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailIcon, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex size-11 items-center justify-center text-navy",
						"aria-label": open ? "メニューを閉じる" : "メニューを開く",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, {})
					})]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line bg-paper lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "site-wrap flex flex-col py-4",
				"aria-label": "モバイルメニュー",
				children: [
					NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "flex min-h-12 items-center border-b border-line text-[15px] tracking-[0.08em] text-navy",
						onClick: () => setOpen(false),
						children: item.label
					}, item.href)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:${COMPANY.phone.replaceAll("-", "")}`,
						className: "flex min-h-12 items-center text-[15px] text-navy",
						onClick: () => setOpen(false),
						children: ["TEL ", COMPANY.phone]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "solid-btn mt-3 w-full",
						onClick: () => setOpen(false),
						children: "お問い合わせフォームへ"
					})
				]
			})
		}) : null]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-navy text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-wrap grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_0.9fr] md:gap-8 md:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { variant: "white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13px] tracking-[0.16em] text-paper/70",
					children: COMPANY.tagline
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] tracking-[0.08em]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2.5",
						children: FOOTER_NAV_LEFT.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: "text-paper/90 transition-opacity hover:opacity-70",
							children: item.label
						}) }, item.href))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2.5",
						children: FOOTER_NAV_RIGHT.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item.href === "/privacy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "text-paper/90 transition-opacity hover:opacity-70",
							children: item.label
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: "text-paper/90 transition-opacity hover:opacity-70",
							children: item.label
						}) }, item.href))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "flex flex-col items-center justify-center gap-3 border border-paper/35 px-6 py-8 text-center transition-colors hover:bg-paper/8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailIcon, { size: 28 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[14px] font-medium tracking-[0.1em]",
							children: "お問い合わせフォームへ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] tracking-[0.14em] text-paper/65",
							children: "24時間受付中"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-paper/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "site-wrap py-4 text-center text-[11px] tracking-[0.12em] text-paper/55 md:text-right",
				children: ["© ", COMPANY.nameEn]
			})
		})]
	});
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-page text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-paper",
				children: "本文へスキップ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Chevron() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "chev",
		viewBox: "0 0 18 18",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7 4.5 12.5 9 7 13.5",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4"
		})
	});
}
//#endregion
export { Chevron as a, HandsIcon as c, PhoneIcon as d, STRENGTHS as f, CONTACT_CATEGORIES as i, MailIcon as l, SiteLayout as m, CASES as n, FLOW as o, ShirtIcon as p, COMPANY as r, FlowIcon as s, BuildingIcon as t, PRODUCTS as u };
