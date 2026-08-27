import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { CasesIndex } from "@/components/site/cases-index";

export const Route = createFileRoute("/cases")({
  component: CasesRoute,
  head: () => ({
    meta: [{ title: "事例一覧｜株式会社コスギ" }],
  }),
});

function CasesRoute() {
  return (
    <SiteLayout>
      <CasesIndex />
    </SiteLayout>
  );
}
