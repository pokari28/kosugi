type IconProps = {
  className?: string;
  size?: number;
};

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BuildingIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="10" y="3.5" width="12" height="7.5" rx="0.4" {...stroke} />
      <rect x="6" y="12" width="20" height="7.5" rx="0.4" {...stroke} />
      <rect x="2.5" y="20.5" width="27" height="8" rx="0.4" {...stroke} />
    </svg>
  );
}

export function ShirtIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M11 6.5 8 9.2 4.5 12.2 8 14.5v12.2h16V14.5l3.5-2.3L24 9.2 21 6.5s-1.2 3-5 3-5-3-5-3Z"
        {...stroke}
      />
      <path d="M13 6.8c.6 1.6 2 2.4 3 2.4s2.4-.8 3-2.4" {...stroke} />
    </svg>
  );
}

export function HandsIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M13.5 18.5c-2.2-1.8-3.8-4.6-3.2-7.2.4-1.6 1.8-2.6 3.2-2.3 1.3.3 2.2 1.6 2.5 3"
        {...stroke}
      />
      <path
        d="M18.5 18.5c2.2-1.8 3.8-4.6 3.2-7.2-.4-1.6-1.8-2.6-3.2-2.3-1.3.3-2.2 1.6-2.5 3"
        {...stroke}
      />
      <path d="M10 19.5c-1.8 1.2-3.2 3.2-3.2 5.6h18.4c0-2.4-1.4-4.4-3.2-5.6" {...stroke} />
      <path d="M16 12.2v6.2" {...stroke} />
    </svg>
  );
}

export function MailIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4.5" y="8.5" width="23" height="15" rx="1.2" {...stroke} />
      <path d="m5.5 10 10.5 8 10.5-8" {...stroke} />
    </svg>
  );
}

export function UsersIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="12" cy="11" r="3.2" {...stroke} />
      <path d="M6.5 21.5c.6-3.2 2.6-5 5.5-5s4.9 1.8 5.5 5" {...stroke} />
      <circle cx="21.2" cy="11.5" r="2.6" {...stroke} />
      <path d="M20.2 16.6c2.4.2 4.2 1.8 4.8 4.4" {...stroke} />
    </svg>
  );
}

export function BoxIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M5.5 11.5 16 6.5l10.5 5-10.5 5-10.5-5Z" {...stroke} />
      <path d="M5.5 11.5v10l10.5 5 10.5-5v-10" {...stroke} />
      <path d="M16 16.5v10" {...stroke} />
    </svg>
  );
}

export function PhoneIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M8.5 6.8c.4-.6 1.2-.8 1.9-.6l3.2 1c.7.2 1.2.8 1.3 1.5l.4 3.2c.1.7-.2 1.4-.8 1.8l-1.6 1.1c1.6 3.2 4 5.5 7.3 6.9l1.2-1.5c.5-.6 1.2-.8 2-.6l3.1.8c.7.2 1.2.8 1.3 1.5l.6 3.2c.1.8-.3 1.5-1 1.8-2.2.9-7.1.8-12.8-4.2S6.8 10.4 8.5 6.8Z"
        {...stroke}
      />
    </svg>
  );
}

export function ChevronIcon({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className} aria-hidden="true">
      <path d="M6.5 3.5 12 9l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function MenuIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function FlowIcon({ name, className, size = 36 }: { name: "mail" | "users" | "shirt" | "box" | "hands" } & IconProps) {
  const map = {
    mail: MailIcon,
    users: UsersIcon,
    shirt: ShirtIcon,
    box: BoxIcon,
    hands: HandsIcon,
  };
  const Cmp = map[name];
  return <Cmp className={className} size={size} />;
}

export function PeopleHeartIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="11.5" cy="9.5" r="3" {...stroke} />
      <circle cx="20.5" cy="9.5" r="3" {...stroke} />
      <path d="M6.5 21c.5-3.2 2.6-5.2 5-5.2 1.5 0 2.8.7 3.7 1.8" {...stroke} />
      <path d="M18.8 17.6c.9-1.1 2.2-1.8 3.7-1.8 2.4 0 4.5 2 5 5.2" {...stroke} />
      <path
        d="M16 22.2c-.8-1.6-3.2-2-4.2-.6-.7 1 .1 2.4 1.4 3.4L16 27l2.8-2c1.3-1 2.1-2.4 1.4-3.4-1-1.4-3.4-1-4.2.6Z"
        fill="#FDD858"
        stroke="#FDD858"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export function CitySparkleIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M6 26V12.5h7V8h8.5v6.5H26V26H6Z" {...stroke} />
      <path d="M10 16v2.5M10 21v2M14.5 16v2.5M14.5 21v2M19.5 16v2.5M19.5 21v2" {...stroke} />
      <path d="M24.5 6.5v3M23 8h3" stroke="#FDD858" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldCheckIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 5 7 8.5v8c0 5.4 3.6 8.8 9 10.5 5.4-1.7 9-5.1 9-10.5v-8L16 5Z" {...stroke} />
      <path d="m12 16.5 2.8 2.8 5.4-6" {...stroke} />
    </svg>
  );
}

export function TeamIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="10" r="3" {...stroke} />
      <circle cx="8.2" cy="11.2" r="2.4" {...stroke} />
      <circle cx="23.8" cy="11.2" r="2.4" {...stroke} />
      <path d="M10.5 22.5c.5-3.4 2.6-5.3 5.5-5.3s5 1.9 5.5 5.3" {...stroke} />
      <path d="M4.8 22c.4-2.4 1.8-3.8 3.8-3.8" {...stroke} />
      <path d="M27.2 22c-.4-2.4-1.8-3.8-3.8-3.8" {...stroke} />
    </svg>
  );
}

export function SparkleShirtIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M11 7.5 8.2 9.8 5 12.4 8 14.5v11.2h16V14.5l3-2.1-3.2-2.6L21 7.5s-1.2 2.8-5 2.8-5-2.8-5-2.8Z"
        {...stroke}
      />
      <path d="M13.2 7.8c.6 1.4 1.8 2.2 2.8 2.2s2.2-.8 2.8-2.2" {...stroke} />
      <path d="M23.5 6.2v2.6M22.2 7.5h2.6" stroke="#FDD858" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9.2 18.5v2M8.2 19.5h2" stroke="#FDD858" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function SlidePointIcon({
  name,
  className,
  size = 36,
}: {
  name: "shirt" | "people" | "city" | "shield" | "team" | "building" | "hands";
} & IconProps) {
  const map = {
    shirt: SparkleShirtIcon,
    people: PeopleHeartIcon,
    city: CitySparkleIcon,
    shield: ShieldCheckIcon,
    team: TeamIcon,
    building: BuildingIcon,
    hands: HandsIcon,
  };
  const Cmp = map[name];
  return <Cmp className={className} size={size} />;
}

export function ClipboardIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="8" y="7" width="16" height="20" rx="1.5" {...stroke} />
      <path d="M12 7.2V6.2A2.2 2.2 0 0 1 14.2 4h3.6A2.2 2.2 0 0 1 20 6.2v1" {...stroke} />
      <path d="M12 14h8M12 18h8M12 22h5" {...stroke} />
    </svg>
  );
}

export function BulbIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 5.5a7 7 0 0 0-4.2 12.6c.6.5 1 1.2 1.1 2v.4h6.2v-.4c.1-.8.5-1.5 1.1-2A7 7 0 0 0 16 5.5Z" {...stroke} />
      <path d="M13.4 23.8h5.2M14.2 26.2h3.6" {...stroke} />
    </svg>
  );
}
