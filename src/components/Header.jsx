import Link from "next/link";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

function BurgerIcon({ isOpen, onClick }) {
  return (
    <div className={`relative w-6 h-6 ${isOpen ? "open" : ""}`} onClick={onClick}>
      <div className="absolute h-0.5 w-full bg-white rounded-full transition-transform duration-200 ease-in-out transform origin-center" style={{ top: "33%", left: "50%", transform: `translate(-60%, -25%) rotate(${isOpen ? "45deg" : "0"})` }}></div>

      <div className="absolute h-0.5 w-full bg-white rounded-full transition-transform duration-200 ease-in-out transform origin-center" style={{ bottom: "33%", left: "50%", transform: `translate(-60%, -25%) rotate(${isOpen ? "-45deg" : "0"})` }}></div>
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <header className="flex justify-center items-center py-4 ">
      <div className="flex justify-between items-center w-full max-w-5xl px-4">
        <div>
          <Image src="/foofest-logo.svg" alt="logo" height="300" width="100" />
        </div>
        <div className="flex items-center text-white">
          {isMobile ? (
            <Menu className="mt-10" right isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)} customBurgerIcon={<BurgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />} customCrossIcon={false}>
              <Link onClick={() => setIsOpen(false)} href="/">
                Schedule
              </Link>
              <Link onClick={() => setIsOpen(false)} href="/">
                Stages
              </Link>
              <Link onClick={() => setIsOpen(false)} href="/">
                About FooFest
              </Link>
            </Menu>
          ) : (
            <nav className="flex ml-4">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/">Schedule</Link>
                </li>
                <li>
                  <Link href="/">Stages</Link>
                </li>
                <li>
                  <Link href="/">About FooFest</Link>
                </li>
              </ul>
            </nav>
          )}
          <button className="ml-4 bg-primary text-white px-4 py-2 rounded ">Køb billeter</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
