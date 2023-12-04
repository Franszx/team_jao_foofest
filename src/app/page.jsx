// "use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/BurgerMenu";
// import Hero from "@/components/Hero";

// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <>
      <Header />
      <BurgerMenu />
      {/* <Hero /> */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button className="btn w-64 rounded-full">Button</button>
      </main>
      <Footer />
    </>
  );
}
