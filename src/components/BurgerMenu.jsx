import { useState, useEffect } from "react";
import Image from "next/image";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed left-2/3 top-2/4">
      <div>
        {isMobile && (
          <div className=" dropdown dropdown-left">
            <div tabIndex={0} role="button" className="btn m-1 bg-transparent rounded-full" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <Image className="w-32 lg:w-82" src="./cross.svg" height="200" width="200" alt="logo" /> : <Image className="w-32 lg:w-82" src="./burger.svg" height="200" width="200" alt="logo" />}
            </div>
            {isOpen && (
              <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-neutral rounded-box w-52">
                <li>
                  <a>Schedule</a>
                </li>
                <li>
                  <a>Stages</a>
                </li>
                <li>
                  <a>About Foofest</a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
