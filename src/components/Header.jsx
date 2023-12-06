"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import BuyButton from "./BuyButton";
import Image from "next/image";

export default function Header() {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);

  useEffect(() => {
    const isDesktopOrLaptopQuery = window.matchMedia("(min-width: 1224px)");
    setIsDesktopOrLaptop(isDesktopOrLaptopQuery.matches);
    const listener = () => setIsDesktopOrLaptop(isDesktopOrLaptopQuery.matches);
    isDesktopOrLaptopQuery.addListener(listener);
    return () => isDesktopOrLaptopQuery.removeListener(listener);
  }, []);

  return (
    <header className="container mx-auto max-w-6xl px-6">
      <div className="flex justify-center items-center py-4 px-4 mt-8 lg:mt-16 ">
        <div className="flex justify-between items-center w-full max-w-5xl">
          <div className="w-32 lg:w-60">
            <Image src="./foofest-logo.svg" height="500" width="500" alt="logo" />
          </div>

          {isDesktopOrLaptop && (
            <nav className="flex ml-4">
              <ul className="flex space-x-6">
                <li>
                  <Link className="font-extralight" href="/schedule">
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link className="font-extralight" href="/">
                    Stages
                  </Link>
                </li>
                <li>
                  <Link className="font-extralight" href="/">
                    About FF
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <BuyButton />
      </div>
    </header>
  );
}
