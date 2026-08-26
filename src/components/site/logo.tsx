import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "navy",
  compact = false,
}: {
  variant?: "navy" | "white";
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-baseline gap-1.5 tracking-wide",
        variant === "white" ? "text-paper" : "text-navy",
      )}
    >
      <span className={cn("font-medium", compact ? "text-[10px]" : "text-[11px] md:text-xs")}>
        株式会社
      </span>
      <span className={cn("font-black tracking-[0.12em]", compact ? "text-xl" : "text-[22px] md:text-[24px]")}>
        コスギ
      </span>
    </Link>
  );
}
