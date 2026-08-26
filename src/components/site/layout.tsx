import { Header } from "./header";
import { Footer } from "./footer";
import { SnapHome } from "./snap-home";
import { MobileDock } from "./mobile-dock";

export function SiteLayout({
  children,
  snap = false,
}: {
  children: React.ReactNode;
  snap?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-page text-ink">
      {snap ? <SnapHome /> : null}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
      >
        本文へスキップ
      </a>
      <Header overlay={snap} />
      <main id="main">{children}</main>
      <Footer />
      <MobileDock />
    </div>
  );
}

export function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M7 4.5 12.5 9 7 13.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
