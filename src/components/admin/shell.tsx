import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { to: "/admin/news", label: "新着情報" },
  { to: "/admin/products", label: "取扱商品" },
  { to: "/admin/instagram", label: "Instagram設定" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-dvh bg-page text-ink">
      <header className="bg-navy text-paper">
        <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between gap-4 px-5 py-4">
          <div>
            <Logo variant="white" />
            <p className="mt-1 text-[13px] tracking-[0.12em]">管理画面</p>
          </div>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center bg-yellow px-5 text-[14px] font-bold tracking-[0.08em] text-navy"
          >
            サイトを見る
          </Link>
        </div>
        <nav className="border-t border-paper/15" aria-label="管理メニュー">
          <div className="mx-auto flex w-full max-w-[1080px] gap-1 overflow-x-auto px-3">
            {ADMIN_NAV.map((item) => {
              const active = path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex min-h-12 shrink-0 items-center px-4 text-[14px] tracking-[0.08em]",
                    active ? "bg-paper text-navy" : "text-paper/85",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-[1080px] px-5 py-8">{children}</main>
    </div>
  );
}
