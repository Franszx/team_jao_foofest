"use client";
import Link from "next/link";
import BuyButton from "./BuyButton";
import Image from "next/image";

export default function Header() {
  return (
    <header className=" mx-auto px-6 py-12 absolute top-0 z-50 w-screen">
      <div className="flex justify-between items-center w-full max-w-7xl  mx-auto ">
        <div className="w-32 lg:w-60">
          <Link href="/">
            <Image src="/foofest-logo.svg" height="500" width="500" alt="logo" className="w-36" />
          </Link>
        </div>

        <nav className="hidden lg:flex gap-12">
          <ul className="flex gap-6 font-medium items-center">
            <li>
              <Link href="/schedule">Schedule</Link>
            </li>
            <li>
              <Link href="/">Stages</Link>
            </li>
            <li>
              <Link href="/">About FF</Link>
            </li>
            <li>
              <BuyButton />
            </li>
          </ul>
        </nav>
        <div className="block lg:hidden font-medium">
          <BuyButton />
        </div>
      </div>
    </header>
  );
}
