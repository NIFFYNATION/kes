import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { CampaignSlider } from "@/components/sections/campaign-slider";
import { Registration } from "@/components/sections/registration";
import { AboutKes } from "@/components/sections/about-kes";
import { Pillars } from "@/components/sections/pillars";
import { Speakers } from "@/components/sections/speakers";
import { RunningOrder } from "@/components/sections/running-order";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { PastEditions } from "@/components/sections/past-editions";
import { BuildersCta } from "@/components/sections/builders-cta";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CampaignSlider />
        <Registration />
        <AboutKes />
        <Pillars />
        <Speakers />
        <RunningOrder />
        <JourneyTimeline />
        <PastEditions />
        <BuildersCta />
      </main>
      <Footer />
    </>
  );
}
