import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { CustomizePage } from "@/components/site/customize-page";

export const Route = createFileRoute("/customize")({
  component: CustomizeRoute,
  head: () => ({
    meta: [{ title: "加工・カスタマイズの詳細｜株式会社コスギ" }],
  }),
});

function CustomizeRoute() {
  return (
    <SiteLayout>
      <CustomizePage />
    </SiteLayout>
  );
}
