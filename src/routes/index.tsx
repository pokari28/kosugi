import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Hero } from "@/components/site/hero";
import { News } from "@/components/site/news";
import { Instagram } from "@/components/site/instagram";
import { Strength } from "@/components/site/strength";
import { Products } from "@/components/site/products";
import { Original } from "@/components/site/original";
import { ProcessSlider } from "@/components/site/process-slider";
import { Cases } from "@/components/site/cases";
import { Flow } from "@/components/site/flow";
import { Cta } from "@/components/site/cta";
import { About, Company } from "@/components/site/about";
import { Message } from "@/components/site/message";
import { Access } from "@/components/site/access";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteLayout snap>
      <Hero />
      <News />
      <Instagram />
      <Strength />
      <Products />
      <Original />
      <ProcessSlider />
      <Cases />
      <Flow />
      <Cta />
      <About />
      <Company />
      <Message />
      <Access />
    </SiteLayout>
  );
}
