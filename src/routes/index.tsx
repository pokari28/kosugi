import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Hero } from "@/components/site/hero";
import { Strength } from "@/components/site/strength";
import { Products } from "@/components/site/products";
import { Original } from "@/components/site/original";
import { Cases } from "@/components/site/cases";
import { Flow } from "@/components/site/flow";
import { Cta } from "@/components/site/cta";
import { About, Company } from "@/components/site/about";
import { Access } from "@/components/site/access";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteLayout snap>
      <Hero />
      <Strength />
      <Products />
      <Original />
      <Cases />
      <Flow />
      <Cta />
      <About />
      <Company />
      <Access />
    </SiteLayout>
  );
}
