"use client";

import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/logo";
import {
  NEWS_CATEGORIES,
  NEWS_SEED,
  formatNewsDate,
  loadNews,
  publishedNews,
  saveNews,
  type NewsCategory,
  type NewsItem,
} from "@/lib/news";

export const Route = createFileRoute("/admin/news")({
  component: NewsAdminPage,
  head: () => ({
    meta: [{ title: "新着情報 管理画面｜株式会社コスギ" }],
  }),
});

type Draft = {
  id: string | null;
  date: string;
  category: NewsCategory;
  title: string;
  body: string;
  published: boolean;
};

const emptyDraft = (): Draft => ({
  id: null,
  date: "2026-09-29",
  category: "お知らせ",
  title: "",
  body: "",
  published: true,
});

function NewsAdminPage() {
  const [items, setItems] = useState<NewsItem[]>(NEWS_SEED);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<NewsItem | null>(null);

  useEffect(() => {
    setItems(loadNews());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveNews(items);
  }, [items, ready]);

  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

  function openCreate() {
    setError("");
    setDraft(emptyDraft());
  }

  function openEdit(item: NewsItem) {
    setError("");
    setDraft({
      id: item.id,
      date: item.date,
      category: item.category,
      title: item.title,
      body: item.body,
      published: item.published,
    });
  }

  function saveDraft() {
    if (!draft) return;
    if (!draft.date || !draft.title.trim()) {
      setError("公開日とタイトルを入力してください。");
      return;
    }
    const next: NewsItem = {
      id: draft.id ?? `news-${Date.now()}`,
      date: draft.date,
      category: draft.category,
      title: draft.title.trim(),
      body: draft.body.trim(),
      published: draft.published,
    };
    setItems((current) => {
      const without = current.filter((item) => item.id !== next.id);
      return [next, ...without];
    });
    setDraft(null);
    setError("");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    setItems((current) => current.filter((item) => item.id !== pendingDelete.id));
    if (draft?.id === pendingDelete.id) setDraft(null);
    setPendingDelete(null);
  }

  return (
    <div className="min-h-dvh bg-page text-ink">
      <header className="bg-navy text-paper">
        <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between gap-4 px-5 py-4">
          <div>
            <Logo variant="white" />
            <p className="mt-1 text-[13px] tracking-[0.12em]">新着情報 管理画面</p>
          </div>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center bg-yellow px-5 text-[14px] font-bold tracking-[0.08em] text-navy"
          >
            サイトを見る
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1080px] px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[13px] leading-7 text-soft">
            公開中 {publishedNews(items, 99).length}件。トップページには新しい順に3件まで表示されます。
          </p>
          <button type="button" className="solid-btn min-h-12" onClick={openCreate}>
            新しいお知らせを作成
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
            <h2 className="text-[18px] font-black tracking-[0.08em] text-navy">
              {draft.id ? "お知らせを編集" : "新しいお知らせ"}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
                公開日
                <input
                  type="date"
                  required
                  value={draft.date}
                  onChange={(event) => setDraft({ ...draft, date: event.target.value })}
                  className="mt-2 w-full min-h-12 border border-line bg-paper px-3 text-[16px] text-ink"
                />
              </label>
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
                カテゴリ
                <select
                  value={draft.category}
                  onChange={(event) => setDraft({ ...draft, category: event.target.value as NewsCategory })}
                  className="mt-2 w-full min-h-12 border border-line bg-paper px-3 text-[16px] text-ink"
                >
                  {NEWS_CATEGORIES.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy md:col-span-2">
                タイトル
                <input
                  type="text"
                  required
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  className="mt-2 w-full min-h-12 border border-line bg-paper px-3 text-[16px] text-ink"
                />
              </label>
              <label className="block text-[13px] font-medium tracking-[0.06em] text-navy md:col-span-2">
                本文
                <textarea
                  value={draft.body}
                  rows={5}
                  onChange={(event) => setDraft({ ...draft, body: event.target.value })}
                  className="mt-2 w-full border border-line bg-paper px-3 py-3 text-[16px] leading-7 text-ink"
                />
              </label>
              <fieldset className="text-[13px] font-medium tracking-[0.06em] text-navy">
                <legend>公開状態</legend>
                <div className="mt-3 flex gap-6 text-[16px] font-normal text-ink">
                  <label className="inline-flex min-h-12 items-center gap-2">
                    <input
                      type="radio"
                      name="published"
                      checked={draft.published}
                      onChange={() => setDraft({ ...draft, published: true })}
                    />
                    公開
                  </label>
                  <label className="inline-flex min-h-12 items-center gap-2">
                    <input
                      type="radio"
                      name="published"
                      checked={!draft.published}
                      onChange={() => setDraft({ ...draft, published: false })}
                    />
                    非公開
                  </label>
                </div>
              </fieldset>
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
          <table className="w-full min-w-[760px] text-left text-[14px]">
            <thead className="bg-page text-[12px] tracking-[0.08em] text-navy">
              <tr>
                <th className="px-4 py-3 font-medium">公開状態</th>
                <th className="px-4 py-3 font-medium">日付</th>
                <th className="px-4 py-3 font-medium">カテゴリ</th>
                <th className="px-4 py-3 font-medium">タイトル</th>
                <th className="px-4 py-3 font-medium">編集</th>
                <th className="px-4 py-3 font-medium">削除</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => (
                <tr key={item.id} className="border-t border-line">
                  <td className="px-4 py-4">
                    <span className={item.published ? "bg-navy px-2 py-1 text-[12px] text-paper" : "border border-line px-2 py-1 text-[12px] text-soft"}>
                      {item.published ? "公開" : "非公開"}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-soft">{formatNewsDate(item.date)}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-4 py-4 font-medium text-navy">{item.title}</td>
                  <td className="px-4 py-4">
                    <button type="button" className="outline-btn min-h-11 px-4" onClick={() => openEdit(item)}>
                      編集
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center border border-line px-4 text-[13px] text-soft"
                      onClick={() => setPendingDelete(item)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {pendingDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-5">
          <div className="w-full max-w-md bg-paper p-6">
            <h2 className="text-[16px] font-black tracking-[0.08em] text-navy">このお知らせを削除しますか？</h2>
            <p className="mt-3 text-[14px] leading-7 text-soft">{pendingDelete.title}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="outline-btn min-h-12" onClick={() => setPendingDelete(null)}>
                キャンセル
              </button>
              <button type="button" className="solid-btn min-h-12" onClick={confirmDelete}>
                削除する
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
