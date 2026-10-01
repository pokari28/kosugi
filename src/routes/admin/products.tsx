"use client";

import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/shell";
import { CATALOG_SEED, loadCatalog, saveCatalog, type CatalogItem } from "@/lib/catalog";

export const Route = createFileRoute("/admin/products")({
  component: ProductsAdminPage,
  head: () => ({
    meta: [{ title: "取扱商品 管理画面｜株式会社コスギ" }],
  }),
});

function ProductsAdminPage() {
  const [items, setItems] = useState<CatalogItem[]>(CATALOG_SEED);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(loadCatalog());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveCatalog(items);
  }, [items, ready]);

  const current = items.find((item) => item.slug === editing) ?? null;

  function update(slug: string, patch: Partial<CatalogItem>) {
    setItems((currentItems) => currentItems.map((item) => (item.slug === slug ? { ...item, ...patch } : item)));
  }

  async function onImage(file: File) {
    if (!current) return;
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください。");
      return;
    }
    const image = await shrinkImage(file);
    update(current.slug, { image });
    setError("");
  }

  return (
    <AdminShell>
      <p className="text-[13px] leading-7 text-soft">
        商品名・画像・表示を変更できます。非表示にした商品は、トップページと取扱商品一覧から外れます。
      </p>

      {current ? (
        <form
          className="mt-6 border border-line bg-paper p-5 md:p-7"
          onSubmit={(event) => {
            event.preventDefault();
            if (!current.name.trim()) {
              setError("商品名を入力してください。");
              return;
            }
            update(current.slug, { name: current.name.trim() });
            setEditing(null);
            setError("");
          }}
        >
          <h2 className="text-[18px] font-black tracking-[0.08em] text-navy">{current.name} を編集</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-[180px_minmax(0,1fr)]">
            <img src={current.image} alt="" className="aspect-[5/4] w-full object-cover" />
            <div className="grid gap-5">
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
                商品名
                <input
                  value={current.name}
                  onChange={(event) => update(current.slug, { name: event.target.value })}
                  className="mt-2 w-full min-h-12 border border-line px-3 text-[16px]"
                />
              </label>
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
                英語表記
                <input
                  value={current.nameEn}
                  onChange={(event) => update(current.slug, { nameEn: event.target.value })}
                  className="mt-2 w-full min-h-12 border border-line px-3 text-[16px]"
                  placeholder="NOBORI"
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
                    <input
                      type="radio"
                      name="visible"
                      checked={current.visible}
                      onChange={() => update(current.slug, { visible: true })}
                    />
                    表示
                  </label>
                  <label className="inline-flex min-h-12 items-center gap-2">
                    <input
                      type="radio"
                      name="visible"
                      checked={!current.visible}
                      onChange={() => update(current.slug, { visible: false })}
                    />
                    非表示
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
          {error ? <p className="mt-4 text-[14px] text-navy">{error}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="outline-btn min-h-12" onClick={() => setEditing(null)}>
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
              <th className="px-4 py-3 font-medium">商品名</th>
              <th className="px-4 py-3 font-medium">表示</th>
              <th className="px-4 py-3 font-medium">編集</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.slug} className="border-t border-line">
                <td className="px-4 py-3">
                  <img src={item.image} alt="" className="h-16 w-20 object-cover" />
                </td>
                <td className="px-4 py-3 font-medium text-navy">
                  {item.name}
                  {item.nameEn ? <span className="mt-1 block text-[12px] font-normal tracking-[0.08em] text-soft">{item.nameEn}</span> : null}
                </td>
                <td className="px-4 py-3">
                  <span className={item.visible ? "bg-navy px-2 py-1 text-[12px] text-paper" : "border border-line px-2 py-1 text-[12px] text-soft"}>
                    {item.visible ? "表示" : "非表示"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className="outline-btn min-h-11 px-4" onClick={() => setEditing(item.slug)}>
                    編集
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        const max = 900;
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
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = () => reject(new Error("image"));
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
