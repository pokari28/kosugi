"use client";

import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/shell";
import { INSTAGRAM_DEFAULT, loadInstagram, saveInstagram, type InstagramSettings } from "@/lib/instagram";

export const Route = createFileRoute("/admin/instagram")({
  component: InstagramAdminPage,
  head: () => ({
    meta: [{ title: "Instagram設定｜株式会社コスギ" }],
  }),
});

function InstagramAdminPage() {
  const [settings, setSettings] = useState<InstagramSettings>(INSTAGRAM_DEFAULT);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(loadInstagram());
    setReady(true);
  }, []);

  return (
    <AdminShell>
      <p className="max-w-2xl text-[13px] leading-7 text-soft">
        アカウントURLを入れると、トップページのアイコン・アカウント名・投稿画像・「Instagramで見る」がすべてそのURLになります。
        投稿写真は、あとから実際のInstagram表示へ差し替えられるように分けてあります。
      </p>

      <form
        className="mt-6 max-w-2xl border border-line bg-paper p-5 md:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          if (!ready) return;
          const next = {
            ...settings,
            url: settings.url.trim(),
            accountName: settings.accountName.trim(),
          };
          setSettings(next);
          saveInstagram(next);
          setSaved(true);
        }}
      >
        <h2 className="text-[18px] font-black tracking-[0.08em] text-navy">Instagram設定</h2>
        <div className="mt-6 grid gap-5">
          <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
            InstagramアカウントURL
            <input
              type="url"
              inputMode="url"
              placeholder="https://www.instagram.com/..."
              value={settings.url}
              onChange={(event) => {
                setSaved(false);
                setSettings({ ...settings, url: event.target.value });
              }}
              className="mt-2 w-full min-h-12 border border-line px-3 text-[16px]"
            />
          </label>
          <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
            アカウント名
            <input
              value={settings.accountName}
              placeholder="アカウント名"
              onChange={(event) => {
                setSaved(false);
                setSettings({ ...settings, accountName: event.target.value });
              }}
              className="mt-2 w-full min-h-12 border border-line px-3 text-[16px]"
            />
          </label>
          <fieldset className="text-[13px] font-medium tracking-[0.06em] text-navy">
            <legend>表示</legend>
            <div className="mt-3 flex gap-6 text-[16px] font-normal text-ink">
              <label className="inline-flex min-h-12 items-center gap-2">
                <input
                  type="radio"
                  name="ig-visible"
                  checked={settings.visible}
                  onChange={() => {
                    setSaved(false);
                    setSettings({ ...settings, visible: true });
                  }}
                />
                表示
              </label>
              <label className="inline-flex min-h-12 items-center gap-2">
                <input
                  type="radio"
                  name="ig-visible"
                  checked={!settings.visible}
                  onChange={() => {
                    setSaved(false);
                    setSettings({ ...settings, visible: false });
                  }}
                />
                非表示
              </label>
            </div>
          </fieldset>
          <label className="block text-[13px] font-medium tracking-[0.06em] text-navy">
            投稿の表示方法
            <select
              value={settings.source}
              onChange={(event) => {
                setSaved(false);
                setSettings({ ...settings, source: event.target.value === "api" ? "api" : "manual" });
              }}
              className="mt-2 w-full min-h-12 border border-line bg-paper px-3 text-[16px]"
            >
              <option value="manual">サイト内の写真（現在）</option>
              <option value="api">Instagram連携（準備中）</option>
            </select>
          </label>
        </div>
        {saved ? <p className="mt-4 text-[14px] text-navy">保存しました。トップページに反映されます。</p> : null}
        <button type="submit" className="solid-btn mt-6 min-h-12">
          保存する
        </button>
      </form>
    </AdminShell>
  );
}
