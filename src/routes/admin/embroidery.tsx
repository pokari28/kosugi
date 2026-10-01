"use client";

import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/shell";
import { EMBROIDERY_SEED, loadEmbroidery, saveEmbroidery, type EmbroideryExample } from "@/lib/embroidery";

export const Route = createFileRoute("/admin/embroidery")({
  component: EmbroideryAdminPage,
  head: () => ({
    meta: [{ title: "刺繍実例 管理画面｜株式会社コスギ" }],
  }),
});

type Draft = {
  id: string | null;
  title: string;
  body: string;
  image: string;
  visible: boolean;
};

const emptyDraft = (): Draft => ({
  id: null,
  title: "",
  body: "",
  image: "",
  visible: true,
});

function EmbroideryAdminPage() {
  const [items, setItems] = useState<EmbroideryExample[]>(EMBROIDERY_SEED);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<EmbroideryExample | null>(null);

  useEffect(() => {
    setItems(loadEmbroidery());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveEmbroidery(items);
  }, [items, ready]);

  function openEdit(item: EmbroideryExample) {
    setError("");
    setDraft({ id: item.id, title: item.title, body: item.body, image: item.image, visible: item.visible });
  }

  async function onImage(file: File) {
    if (!draft) return;
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください。");
      return;
    }
    const image = await shrinkImage(file);
    setDraft({ ...draft, image });
    setError("");
  }

  function saveDraft() {
    if (!draft) return;
    if (!draft.title.trim() || !draft.image) {
      setError("タイトルと画像を入れてください。");
      return;
    }
    const next: EmbroideryExample = {
      id: draft.id ?? `emb-${Date.now()}`,
      title: draft.title.trim(),
      body: draft.body.trim(),
      image: draft.image,
      visible: draft.visible,
    };
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-[13px] leading-7 text-soft">
          刺繍実例の写真・タイトル・説明・表示を変更できます。お客様の社名や個人名が写る写真は、掲載了承を得たものだけを使ってください。
        </p>
        <button
          type="button"
          className="solid-btn min-h-12"
          onClick={() => {
            setError("");
            setDraft(emptyDraft());
          }}
        >
          実例を追加
        </button>
      </div>

      {draft ? (
        <form
          className="mt-6 border border-line bg-paper p-5 md:p-7"
          onSubmit={(event) => {
            event.preventDefault();
            saveDraft();
          }}
        >
          <h2 className="text-[18px] font-black tracking-[0.08em] text-navy">{draft.id ? "実例を編集" : "実例を追加"}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="aspect-[4/3] overflow-hidden bg-line">
              {draft.image ? <img src={draft.image} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="grid gap-5">
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
                タイトル
                <input
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  className="mt-2 w-full min-h-12 border border-line px-3 text-[16px]"
                  placeholder="社名刺繍"
                />
              </label>
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
                説明文
                <textarea
                  value={draft.body}
                  rows={4}
                  onChange={(event) => setDraft({ ...draft, body: event.target.value })}
                  className="mt-2 w-full border border-line px-3 py-3 text-[16px] leading-7"
                />
              </label>
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
                画像
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 block w-full text-[14px]"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void onImage(file);
                  }}
                />
              </label>
              <fieldset className="text-[13px] font-medium tracking-[0.06em] text-navy">
                <legend>表示</legend>
                <div className="mt-3 flex gap-6 text-[16px] font-normal text-ink">
                  <label className="inline-flex min-h-12 items-center gap-2">
                    <input type="radio" name="emb-visible" checked={draft.visible} onChange={() => setDraft({ ...draft, visible: true })} />
                    表示
                  </label>
                  <label className="inline-flex min-h-12 items-center gap-2">
                    <input type="radio" name="emb-visible" checked={!draft.visible} onChange={() => setDraft({ ...draft, visible: false })} />
                    非表示
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
          {error ? <p className="mt-4 text-[14px] text-navy">{error}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="outline-btn min-h-12" onClick={() => setDraft(null)}>
              キャンセル
            </button>
            <button type="submit" className="solid-btn min-h-12">
              保存する
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-8 overflow-x-auto border border-line bg-paper">
        <table className="w-full min-w-[720px] text-left text-[14px]">
          <thead className="bg-page text-[12px] tracking-[0.08em] text-navy">
            <tr>
              <th className="px-4 py-3 font-medium">画像</th>
              <th className="px-4 py-3 font-medium">タイトル</th>
              <th className="px-4 py-3 font-medium">表示</th>
              <th className="px-4 py-3 font-medium">編集</th>
              <th className="px-4 py-3 font-medium">削除</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <img src={item.image} alt="" className="h-16 w-24 object-cover" />
                </td>
                <td className="px-4 py-3 font-medium text-navy">
                  {item.title}
                  <span className="mt-1 block text-[12px] font-normal leading-6 text-soft">{item.body}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={item.visible ? "bg-navy px-2 py-1 text-[12px] text-paper" : "border border-line px-2 py-1 text-[12px] text-soft"}>
                    {item.visible ? "表示" : "非表示"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className="outline-btn min-h-11 px-4" onClick={() => openEdit(item)}>
                    編集
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className="inline-flex min-h-11 items-center border border-line px-4 text-[13px] text-soft" onClick={() => setPendingDelete(item)}>
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pendingDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-5">
          <div className="w-full max-w-md bg-paper p-6">
            <h2 className="text-[16px] font-black tracking-[0.08em] text-navy">この実例を削除しますか？</h2>
            <p className="mt-3 text-[14px] leading-7 text-soft">{pendingDelete.title}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="outline-btn min-h-12" onClick={() => setPendingDelete(null)}>
                キャンセル
              </button>
              <button
                type="button"
                className="solid-btn min-h-12"
                onClick={() => {
                  setItems((current) => current.filter((item) => item.id !== pendingDelete.id));
                  if (draft?.id === pendingDelete.id) setDraft(null);
                  setPendingDelete(null);
                }}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}

function shrinkImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1200;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = () => reject(new Error("image"));
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
