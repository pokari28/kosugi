import { Link } from "@tanstack/react-router";
import { BulbIcon, ClipboardIcon, UsersIcon } from "./icons";
import { Chevron } from "./layout";

const ICONS = {
  clipboard: ClipboardIcon,
  bulb: BulbIcon,
  users: UsersIcon,
} as const;

export function PageCta({
  icon,
  title,
  body,
  action = "お問い合わせはこちら",
  category,
  tone = "navy",
}: {
  icon: keyof typeof ICONS;
  title: string;
  body: string;
  action?: string;
  category?: string;
  tone?: "navy" | "paper";
}) {
  const Icon = ICONS[icon];
  const navy = tone === "navy";

  return (
    <section className={navy ? "bg-paper" : "bg-page"}>
      <div className="site-wrap py-12 md:py-16">
        <div
          className={
            navy
              ? "flex flex-col items-start justify-between gap-6 bg-navy px-6 py-8 text-paper md:flex-row md:items-center md:px-10 md:py-10"
              : "flex flex-col items-start justify-between gap-6 border border-line bg-paper px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10"
          }
        >
          <div className="flex items-start gap-4">
            <Icon size={36} className={navy ? "mt-0.5 shrink-0 text-yellow" : "mt-0.5 shrink-0 text-navy"} />
            <div>
              <h2 className={`text-[1.15rem] font-black tracking-[0.08em] md:text-[1.35rem] ${navy ? "" : "text-navy"}`}>
                {title}
              </h2>
              <p className={`mt-2 max-w-xl text-[13px] leading-7 ${navy ? "text-paper/75" : "text-soft"}`}>{body}</p>
            </div>
          </div>
          <Link
            to="/contact"
            search={category ? { category } : undefined}
            className={
              navy
                ? "inline-flex min-h-12 items-center gap-3 bg-paper px-6 py-3 text-[13px] font-medium tracking-[0.08em] text-navy transition-opacity hover:opacity-90"
                : "solid-btn"
            }
          >
            {action}
            <Chevron />
          </Link>
        </div>
      </div>
    </section>
  );
}
