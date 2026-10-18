import { Link } from "@tanstack/react-router";
import { asset } from "@/lib/paths";
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
        "inline-flex items-center gap-2 tracking-wide",
        variant === "white" ? "text-paper" : "text-navy",
      )}
    >
      <img
        src={asset("/images/logo-mark.png")}
        alt=""
        width={40}
        height={40}
        className={cn(
          "shrink-0",
          compact ? "size-7" : "size-8 md:size-9",
          variant === "white" && "bg-paper",
        )}
      />
      <span className={cn("font-medium", compact ? "text-[10px]" : "text-[11px] md:text-xs")}>
        株式会社
      </span>
      <span className={cn("font-black tracking-[0.12em]", compact ? "text-xl" : "text-[22px] md:text-[24px]")}>
        コスギ
      </span>
    </Link>
  );
}