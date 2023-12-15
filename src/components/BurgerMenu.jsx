"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="fixed z-50 right-2 bottom-2 md:hidden">
      <div className="dropdown dropdown-left">
        <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Image className="w-24" src="/cross.svg" height="100" width="100" alt="logo" /> : <Image className="w-24" src="/greenBurger.svg" height="100" width="100" alt="logo" />}
        </div>
        {isOpen && (
          <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-neutral rounded-box w-52">
            <li>
              <a href="/schedule">Schedule</a>
            </li>
            <li>
              <a href="/stageChat">Stage Chat</a>
            </li>
            <li>
              <a href="/about">About FF</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
