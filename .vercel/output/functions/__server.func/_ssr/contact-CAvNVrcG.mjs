import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./router-BlmepEte.mjs";
import { d as PhoneIcon, i as CONTACT_CATEGORIES, m as SiteLayout, r as COMPANY } from "./layout-DsezornQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CAvNVrcG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactForm({ defaultCategory }) {
	const initialCategory = (0, import_react.useMemo)(() => {
		if (CONTACT_CATEGORIES.some((c) => c.value === defaultCategory)) return defaultCategory;
		return "";
	}, [defaultCategory]);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		setError("");
		const data = new FormData(e.currentTarget);
		const company = String(data.get("company") ?? "").trim();
		const name = String(data.get("name") ?? "").trim();
		const email = String(data.get("email") ?? "").trim();
		const tel = String(data.get("tel") ?? "").trim();
		const message = String(data.get("message") ?? "").trim();
		const agree = data.get("agree") === "on";
		if (!company || !name || !email || !message) {
			setError("必須項目をご入力ください。");
			return;
		}
		if (!agree) {
			setError("個人情報の取り扱いにご同意ください。");
			return;
		}
		setStatus("sending");
		const payload = {
			company,
			name,
			email,
			tel,
			category: String(data.get("category") ?? ""),
			message,
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			const prev = JSON.parse(localStorage.getItem("cosugi-inquiries") || "[]");
			localStorage.setItem("cosugi-inquiries", JSON.stringify([payload, ...prev].slice(0, 20)));
		} catch {}
		window.setTimeout(() => setStatus("done"), 500);
	}
	if (status === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-page px-6 py-12 text-center md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] font-bold tracking-[0.1em] text-navy",
				children: "送信が完了しました"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-[13.5px] leading-7 text-soft",
				children: [
					"お問い合わせありがとうございました。",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"内容を確認のうえ、担当者よりご連絡いたします。"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `tel:${COMPANY.phone.replaceAll("-", "")}`,
				className: "mt-6 inline-block text-navy",
				children: ["お急ぎの場合は ", COMPANY.phone]
			})
		]
	});
	const field = "mt-1.5 w-full border border-line bg-paper px-3.5 py-3 text-[14px] text-ink outline-none transition-colors focus:border-navy";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-5",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "会社名",
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: field,
					name: "company",
					autoComplete: "organization",
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "ご担当者名",
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: field,
					name: "name",
					autoComplete: "name",
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "電話番号",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						name: "tel",
						type: "tel",
						autoComplete: "tel"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "メールアドレス",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						name: "email",
						type: "email",
						autoComplete: "email",
						required: true
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "ご相談内容",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: `${field} bg-paper`,
					name: "category",
					defaultValue: initialCategory,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "選択してください"
					}), CONTACT_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.value,
						children: c.label
					}, c.value))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "お問い合わせ内容",
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${field} min-h-36 resize-y`,
					name: "message",
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-3 text-[13px] leading-6 text-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					name: "agree",
					className: "mt-1 size-4 accent-navy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/privacy",
					className: "text-navy underline underline-offset-4",
					children: "個人情報の取り扱い"
				}), "に同意する"] })]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-navy",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "solid-btn min-h-12 w-full md:w-auto md:px-16",
				disabled: status === "sending",
				children: status === "sending" ? "送信中…" : "送信する"
			})
		]
	});
}
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-[13px] font-medium tracking-[0.08em] text-navy",
			children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 text-[11px] tracking-normal text-muted",
				children: "必須"
			}) : null]
		}), children]
	});
}
function ContactPage() {
	const { category } = Route$1.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-wrap py-12 md:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-label",
					children: "CONTACT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "section-title mt-3",
					children: "お問い合わせ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-lead max-w-xl",
					children: [
						"ユニフォームのことなら、なんでもご相談ください。",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"御見積・ご提案は無料です。"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, { defaultCategory: category }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "border border-line bg-page px-6 py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] font-medium tracking-[0.1em] text-navy",
								children: "お電話でのご相談"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${COMPANY.phone.replaceAll("-", "")}`,
								className: "mt-4 inline-flex items-center gap-2 text-navy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneIcon, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[1.55rem] font-bold tracking-[0.04em]",
									children: COMPANY.phone
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[13px] text-soft",
								children: ["受付時間｜", COMPANY.hours]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-[13px] leading-7 text-soft",
								children: [
									COMPANY.postal,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									COMPANY.address
								]
							})
						]
					})]
				})
			]
		})
	}) });
}
//#endregion
export { ContactPage as component };
