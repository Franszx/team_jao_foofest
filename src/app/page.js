"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button class="btn w-64 rounded-full">Button</button>
    </main>
  );
}
