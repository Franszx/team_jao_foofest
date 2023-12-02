"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import BurgerMenu from "@/components/BurgerMenu";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <BurgerMenu />

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button class="btn w-64 rounded-full">Button</button>
      </main>
      <Footer />
    </>
  );
}
