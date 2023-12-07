import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveArtists from "@/components/LiveArtists";
import BurgerMenu from "@/components/BurgerMenu";
import Hero from "@/components/Hero";
import CampOverview from "@/components/CampOverview";

// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <BurgerMenu />
      <main className="container mx-auto max-w-6xl px-6 mt-40 flex flex-col gap-16">
        <Hero />
        <LiveArtists />
        <CampOverview />
      </main>
      <Footer />
    </>
  );
}
