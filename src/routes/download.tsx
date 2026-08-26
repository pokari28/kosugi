import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [{ title: "ダウンロード｜株式会社コスギ" }],
  }),
});

function DownloadPage() {
  return (
    <SiteLayout>
      <section className="bg-paper">
        <div className="site-wrap py-16 md:py-24">
          <p className="en-label">DOWNLOAD</p>
          <h1 className="section-title mt-3">サイトデータをダウンロード</h1>
          <p className="section-lead max-w-xl">
            下のボタンを押すと、ZIPファイルが保存されます。
            <br />
            貼り付けは不要です。
          </p>
          <a
            href="/cosugi-website.zip"
            download="cosugi-website.zip"
            className="solid-btn mt-10 min-h-[56px] px-8 text-[15px]"
          >
            ZIPをダウンロード
          </a>
          <p className="mt-8 max-w-xl text-[13px] leading-7 text-soft">
            保存したZIPを展開し、フォルダ内で次を実行してください。
            <br />
            1. npm install
            <br />
            2. npm run dev
            <br />
            3. ブラウザで http://localhost:8080 を開く
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
