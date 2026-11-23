"use client";

import { useMemo, useState } from "react";
import { CONTACT_CATEGORIES, COMPANY } from "@/data/site";

type Status = "idle" | "sending" | "done";

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "";

function fieldError(data: FormData) {
  const company = String(data.get("company") ?? "").trim();
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const tel = String(data.get("tel") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!company || !name || !email || !message) return "必須項目をご入力ください。";
  if (company.length > 100 || name.length > 80 || message.length > 2000) return "文字数が上限を超えています。";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "メールアドレスの形式が正しくありません。";
  if (tel && !/^[0-9+\-() ]{8,20}$/.test(tel)) return "電話番号の形式が正しくありません。";
  if (data.get("agree") !== "on") return "個人情報の取り扱いにご同意ください。";
  return "";
}

export function ContactForm({ defaultCategory }: { defaultCategory?: string }) {
  const initialCategory = useMemo(() => {
    if (CONTACT_CATEGORIES.some((c) => c.value === defaultCategory)) {
      return defaultCategory as string;
    }
    return "";
  }, [defaultCategory]);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const company = String(data.get("company") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const tel = String(data.get("tel") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (data.get("website")) {
      setError("送信できませんでした。");
      return;
    }
    const invalid = fieldError(data);
    if (invalid) {
      setError(invalid);
      return;
    }

    setStatus("sending");
    if (!contactEndpoint) {
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
        /* preview only */
      }
      window.setTimeout(() => setStatus("done"), 500);
      return;
    }

    try {
      const tokenRes = await fetch(contactEndpoint, { credentials: "same-origin", headers: { Accept: "application/json" } });
      const tokenBody = (await tokenRes.json().catch(() => null)) as { token?: string } | null;
      if (!tokenRes.ok || !tokenBody?.token) {
        setStatus("idle");
        setError("送信の準備に失敗しました。時間をおいて再度お試しください。");
        return;
      }
      await new Promise((resolve) => window.setTimeout(resolve, 2000));
      const res = await fetch(contactEndpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          company,
          name,
          email,
          tel,
          category: String(data.get("category") ?? ""),
          message,
          agree: true,
          token: tokenBody.token,
          website: "",
        }),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !body?.ok) {
        setStatus("idle");
        setError(body?.error || "送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("送信に失敗しました。通信環境をご確認ください。");
    }
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
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
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
