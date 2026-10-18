import { FLOW } from "@/data/site";

export function Flow() {
  return (
    <section id="flow" className="scroll-mt-20 bg-paper pb-16 md:pb-24">
      <div className="site-wrap">
        <p className="en-label">FLOW</p>
        <h2 className="section-title mt-3">ご提案の流れ</h2>
        <p className="section-lead mt-4">初めてのお客様でも安心してご相談いただけます。</p>

        <ol className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          {FLOW.map((step, i) => (
            <li key={step.num} className="relative">
              {i < FLOW.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-7 -right-4 z-10 hidden text-navy/35 lg:block"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M5 2.5 11 8 5 13.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              ) : null}
              <div className="flex items-start gap-4 lg:flex-col lg:items-start">
                <div className="flex size-16 shrink-0 items-center justify-center text-navy">
                  <FlowSketch n={step.num} />
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

function FlowSketch({ n }: { n: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      {n === "01" ? (
        <>
          <rect x="8" y="12" width="28" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="m8 14 14 9 14-9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : null}
      {n === "02" ? (
        <>
          <circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="28" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 31c1-5 3.5-7 7-7s6 2 7 7M21 31c1-5 3.5-7 7-7s6 2 7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : null}
      {n === "03" ? (
        <>
          <path d="M16 10h12l4 6v16H12V16l4-6Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 22h8M18 26h5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : null}
      {n === "04" ? (
        <>
          <path d="M10 18h16v14H10zM26 22h8v10h-8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 18v-4h8v4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : null}
      {n === "05" ? (
        <>
          <path d="M12 30 24 10l8 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 22h12" fill="none" stroke="#FDD858" strokeWidth="1.6" />
        </>
      ) : null}
      {n === "06" ? (
        <>
          <rect x="10" y="12" width="24" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 20h10M14 25h7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="m26 24 3 3 5-6" fill="none" stroke="#FDD858" strokeWidth="1.6" />
        </>
      ) : null}
      {n === "07" ? (
        <>
          <path d="M8 26h18l4-6h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="30" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="30" cy="30" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 20h8v6h-8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      ) : null}
    </svg>
  );
}