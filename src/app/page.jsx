"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import BurgerMenu from "@/components/BurgerMenu";

export default function Home() {
  return (
    <>
      <Header />
      <BurgerMenu />

      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
      <Footer />
    </>
  );
}
