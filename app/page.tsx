import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { SovereignIntro } from "@/components/sections/sovereign-intro";
import { Pillars } from "@/components/sections/pillars";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { Manifesto } from "@/components/sections/manifesto";
import { PastEvents } from "@/components/sections/past-events";
import { EventDetails } from "@/components/sections/event-details";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SovereignIntro />
        <Pillars />
        <JourneyTimeline />
        <Manifesto />
        <PastEvents />
        <EventDetails />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
