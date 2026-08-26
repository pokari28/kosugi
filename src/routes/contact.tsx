import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { ContactForm } from "@/components/site/contact-form";
import { COMPANY } from "@/data/site";
import { PhoneIcon } from "@/components/site/icons";

type ContactSearch = {
  category?: string;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: ContactPage,
  head: () => ({
    meta: [{ title: "お問い合わせ｜株式会社コスギ" }],
  }),
});

function ContactPage() {
  const { category } = Route.useSearch();

  return (
    <SiteLayout>
      <section className="bg-paper">
        <div className="site-wrap py-12 md:py-16">
          <p className="en-label">CONTACT</p>
          <h1 className="section-title mt-3">お問い合わせ</h1>
          <p className="section-lead max-w-xl">
            ユニフォームのことなら、なんでもご相談ください。
            <br />
            御見積・ご提案は無料です。
          </p>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <ContactForm defaultCategory={category} />
            <aside className="border border-line bg-page px-6 py-8">
              <p className="text-[13px] font-medium tracking-[0.1em] text-navy">お電話でのご相談</p>
              <a
                href={`tel:${COMPANY.phone.replaceAll("-", "")}`}
                className="mt-4 inline-flex items-center gap-2 text-navy"
              >
                <PhoneIcon size={22} />
                <span className="text-[1.55rem] font-bold tracking-[0.04em]">{COMPANY.phone}</span>
              </a>
              <p className="mt-2 text-[13px] text-soft">受付時間｜{COMPANY.hours}</p>
              <p className="mt-6 text-[13px] leading-7 text-soft">
                {COMPANY.postal}
                <br />
                {COMPANY.address}
              </p>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
