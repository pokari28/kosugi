import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/data/site";
import { MailIcon, PhoneIcon } from "./icons";

const TEL = `tel:${COMPANY.phone.replaceAll("-", "")}`;

export function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="クイックアクション">
      <a href={TEL} className="mobile-dock-btn mobile-dock-call">
        <PhoneIcon size={18} />
        電話する
      </a>
      <Link to="/contact" className="mobile-dock-btn mobile-dock-mail">
        <MailIcon size={18} />
        お問い合わせ
      </Link>
    </nav>
  );
}
