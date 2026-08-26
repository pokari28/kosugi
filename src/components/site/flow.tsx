import { FLOW } from "@/data/site";
import { FlowIcon } from "./icons";

export function Flow() {
  return (
    <section id="flow" className="scroll-mt-20 bg-paper pb-16 md:pb-24">
      <div className="site-wrap">
        <p className="en-label">FLOW</p>
        <h2 className="section-title mt-3">ご提案の流れ</h2>
        <p className="section-lead mt-4">初めてのお客様でも安心してご相談いただけます。</p>

        <ol className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {FLOW.map((step, i) => (
            <li key={step.num} className="relative px-0 lg:px-3">
              {i < FLOW.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-7 -right-1 z-10 hidden text-navy/35 lg:block"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M5 2.5 11 8 5 13.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              ) : null}
              <div className="flex items-start gap-4 lg:flex-col lg:items-start">
                <div className="flex size-16 shrink-0 items-center justify-center text-navy">
                  <FlowIcon name={step.icon} size={40} />
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-[0.16em] text-navy">{step.num}</p>
                  <h3 className="mt-1 text-[15px] font-bold tracking-[0.08em] text-navy">{step.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-[12.5px] leading-6 text-soft">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
