import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { CasesIndex } from "@/components/site/cases-index";
import { CASE_FILTERS } from "@/data/site";

type CasesSearch = {
  industry?: (typeof CASE_FILTERS)[number]["value"];
};

const FILTERS = new Set<string>(CASE_FILTERS.map((item) => item.value));

export const Route = createFileRoute("/cases")({
  validateSearch: (search: Record<string, unknown>): CasesSearch => ({
    industry:
      typeof search.industry === "string" && FILTERS.has(search.industry)
        ? (search.industry as CasesSearch["industry"])
        : undefined,
  }),
  component: CasesRoute,
  head: () => ({
    meta: [{ title: "事例一覧｜株式会社コスギ" }],
  }),
});

function CasesRoute() {
  const { industry } = Route.useSearch();
  return (
    <SiteLayout snap="page">
      <CasesIndex initialIndustry={industry} />
    </SiteLayout>
  );
}
