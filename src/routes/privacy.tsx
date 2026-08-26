import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { COMPANY } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [{ title: "プライバシーポリシー｜株式会社コスギ" }],
  }),
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="bg-paper">
        <div className="site-wrap max-w-3xl py-12 md:py-16">
          <p className="en-label">PRIVACY POLICY</p>
          <h1 className="section-title mt-3">プライバシーポリシー</h1>
          <div className="mt-10 space-y-8 text-[14px] leading-8 text-soft">
            <p>
              {COMPANY.name}
              （以下「当社」）は、お客様の個人情報を適切に取り扱うことが企業の社会的責務であると考え、以下のとおりプライバシーポリシーを定めます。
            </p>
            <section>
              <h2 className="text-[16px] font-bold tracking-[0.08em] text-navy">1. 収集する情報</h2>
              <p className="mt-2">
                お問い合わせフォーム等を通じて、会社名、ご担当者名、電話番号、メールアドレス、ご相談内容などをお預かりします。
              </p>
            </section>
            <section>
              <h2 className="text-[16px] font-bold tracking-[0.08em] text-navy">2. 利用目的</h2>
              <p className="mt-2">
                いただいた情報は、お問い合わせへの回答、お見積り・ご提案、商品・サービスのご案内、品質向上のために利用します。
              </p>
            </section>
            <section>
              <h2 className="text-[16px] font-bold tracking-[0.08em] text-navy">3. 第三者提供</h2>
              <p className="mt-2">
                法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
              </p>
            </section>
            <section>
              <h2 className="text-[16px] font-bold tracking-[0.08em] text-navy">4. 安全管理</h2>
              <p className="mt-2">
                個人情報の漏えい、滅失、毀損を防ぐため、適切な安全管理措置を講じます。
              </p>
            </section>
            <section>
              <h2 className="text-[16px] font-bold tracking-[0.08em] text-navy">5. お問い合わせ窓口</h2>
              <p className="mt-2">
                {COMPANY.name}
                <br />
                {COMPANY.addressFull}
                <br />
                TEL {COMPANY.phone}
                <br />
                受付時間 {COMPANY.hours}
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
