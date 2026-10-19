import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { ProductsIndex } from "@/components/site/products-index";

type ProductsSearch = {
  category?: string;
};

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: ProductsRoute,
  head: () => ({
    meta: [{ title: "取扱商品一覧｜株式会社コスギ" }],
  }),
});

function ProductsRoute() {
  const { category } = Route.useSearch();
  return (
    <SiteLayout snap="page">
      <ProductsIndex initialCategory={category} />
    </SiteLayout>
  );
}