"use client";

import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/shell";
import { CASE_FILTERS } from "@/data/site";
import { loadExtraCases, saveExtraCases, type ExtraCase } from "@/lib/cases-extra";

export const Route = createFileRoute("/admin/cases")({
  component: CasesAdminPage,
  head: () => ({
    meta: [{ title: "導入事例 管理画面｜株式会社コスギ" }],
  }),
});

const empty = (): ExtraCase => ({
  id: "",
  client: "",
  industry: "other",
  industryLabel: "その他",
  uniform: "",
  proposal: "",
  background: "",
  effect: "",
  image: "",
  visible: false,
});

function CasesAdminPage() {
  const [items, setItems] = useState<ExtraCase[]>([]);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState<ExtraCase | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(loadExtraCases());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveExtraCases(items);
  }, [items, ready]);

  function saveDraft() {
    if (!draft) return;
    if (!draft.client.trim() || !draft.image) {
      setError("タイトルと画像を入れてください。");
      return;
    }
    const next = { ...draft, id: draft.id || `case-${Date.now()}`, client: draft.client.trim() };
    setItems((current) => {
      const index = current.findIndex((item) => item.id === next.id);
      if (index === -1) return [...current, next];
      return current.map((item) => (item.id === next.id ? next : item));
    });
    setDraft(null);
    setError("");
  }

  return (
    <AdminShell>
      <p className="max-w-2xl text-[13px] leading-7 text-soft">
        着用写真の事例を追加できます。初期状態は非公開です。お客様の顔や社名が写る写真は、掲載了承を得てから「表示」にしてください。トップの既存事例はここでは消しません。
      </p>
      <button type="button" className="solid-btn mt-6 min-h-12" onClick={() => setDraft(empty())}>
        事例を追加
      </button>
      {draft ? (
        <form
          className="mt-6 grid gap-4 border border-line bg-paper p-5"
          onSubmit={(event) => {
            event.preventDefault();
            saveDraft();
          }}
        >
          <label className="text-[13px] text-navy">
            タイトル
            <input value={draft.client} onChange={(event) => setDraft({ ...draft, client: event.target.value })} className="mt-2 w-full min-h-12 border border-line px-3 text-[16px]" />
          </label>
          <label className="text-[13px] text-navy">
            業種
            <select
              value={draft.industry}
              onChange={(event) => {
                const industry = event.target.value;
                const label = CASE_FILTERS.find((item) => item.value === industry)?.label ?? "その他";
                setDraft({ ...draft, industry, industryLabel: label });
              }}
              className="mt-2 w-full min-h-12 border border-line px-3 text-[16px]"
            >
              {CASE_FILTERS.filter((item) => item.value !== "all").map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[13px] text-navy">
            説明
            <textarea value={draft.proposal} rows={3} onChange={(event) => setDraft({ ...draft, proposal: event.target.value })} className="mt-2 w-full border border-line px-3 py-3 text-[16px]" />
          </label>
          <label className="text-[13px] text-navy">
            画像
            <input
              type="file"
              accept="image/*"
              className="mt-2 block w-full text-[14px]"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setDraft({ ...draft, image: String(reader.result) });
                reader.readAsDataURL(file);
              }}
            />
          </label>
          <label className="inline-flex min-h-12 items-center gap-2 text-[15px] text-navy">
            <input type="checkbox" checked={draft.visible} onChange={(event) => setDraft({ ...draft, visible: event.target.checked })} />
            掲載了承済みとして表示する
          </label>
          {error ? <p className="text-[14px] text-navy">{error}</p> : null}
          <div className="flex gap-3">
            <button type="button" className="outline-btn min-h-12" onClick={() => setDraft(null)}>
              キャンセル
            </button>
            <button type="submit" className="solid-btn min-h-12">
              保存する
            </button>
          </div>
        </form>
      ) : null}
      <ul className="mt-8 divide-y divide-line border border-line bg-paper">
        {items.length === 0 ? <li className="px-4 py-6 text-[14px] text-soft">追加した事例はまだありません。</li> : null}
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-[14px] text-navy">
              {item.client}
              <span className="ml-3 text-[12px] text-soft">{item.visible ? "表示" : "非表示"}</span>
            </span>
            <span className="flex gap-2">
              <button type="button" className="outline-btn min-h-11 px-4" onClick={() => setDraft(item)}>
                編集
              </button>
              <button
                type="button"
                className="min-h-11 border border-line px-4 text-[13px] text-soft"
                onClick={() => {
                  if (window.confirm("この事例を削除しますか？")) setItems((current) => current.filter((row) => row.id !== item.id));
                }}
              >
                削除
              </button>
            </span>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
