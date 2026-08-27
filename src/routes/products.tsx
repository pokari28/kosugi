import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { ProductsIndex } from "@/components/site/products-index";

export const Route = createFileRoute("/products")({
  component: ProductsRoute,
  head: () => ({
    meta: [{ title: "取扱商品一覧｜株式会社コスギ" }],
  }),
});

function ProductsRoute() {
  return (
    <SiteLayout>
      <ProductsIndex />
    </SiteLayout>
  );
}
