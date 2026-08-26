"use client";

import { useMemo, useState } from "react";
import { CONTACT_CATEGORIES, COMPANY } from "@/data/site";

type Status = "idle" | "sending" | "done";

export function ContactForm({ defaultCategory }: { defaultCategory?: string }) {
  const initialCategory = useMemo(() => {
    if (CONTACT_CATEGORIES.some((c) => c.value === defaultCategory)) {
      return defaultCategory as string;
    }
    return "";
  }, [defaultCategory]);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("cosugi-inquiries") || "[]") as unknown[];
      localStorage.setItem("cosugi-inquiries", JSON.stringify([payload, ...prev].slice(0, 20)));
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setStatus("done"), 500);
  }

  if (status === "done") {
    return (
      <div className="border border-line bg-page px-6 py-12 text-center md:px-10">
        <p className="text-[15px] font-bold tracking-[0.1em] text-navy">送信が完了しました</p>
        <p className="mt-4 text-[13.5px] leading-7 text-soft">
          お問い合わせありがとうございました。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <a href={`tel:${COMPANY.phone.replaceAll("-", "")}`} className="mt-6 inline-block text-navy">
          お急ぎの場合は {COMPANY.phone}
        </a>
      </div>
    );
  }

  const field = "mt-1.5 w-full border border-line bg-paper px-3.5 py-3 text-[14px] text-ink outline-none transition-colors focus:border-navy";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="会社名" required>
        <input className={field} name="company" autoComplete="organization" required />
      </Field>
      <Field label="ご担当者名" required>
        <input className={field} name="name" autoComplete="name" required />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="電話番号">
          <input className={field} name="tel" type="tel" autoComplete="tel" />
        </Field>
        <Field label="メールアドレス" required>
          <input className={field} name="email" type="email" autoComplete="email" required />
        </Field>
      </div>
      <Field label="ご相談内容">
        <select className={`${field} bg-paper`} name="category" defaultValue={initialCategory}>
          <option value="">選択してください</option>
          {CONTACT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="お問い合わせ内容" required>
        <textarea className={`${field} min-h-36 resize-y`} name="message" required />
      </Field>
      <label className="flex items-start gap-3 text-[13px] leading-6 text-soft">
        <input type="checkbox" name="agree" className="mt-1 size-4 accent-navy" />
        <span>
          <a href="/privacy" className="text-navy underline underline-offset-4">
            個人情報の取り扱い
          </a>
          に同意する
        </span>
      </label>
      {error ? <p className="text-[13px] text-navy">{error}</p> : null}
      <button type="submit" className="solid-btn min-h-12 w-full md:w-auto md:px-16" disabled={status === "sending"}>
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium tracking-[0.08em] text-navy">
        {label}
        {required ? <span className="ml-2 text-[11px] tracking-normal text-muted">必須</span> : null}
      </span>
      {children}
    </label>
  );
}
