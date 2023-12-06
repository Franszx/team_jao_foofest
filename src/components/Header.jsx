import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-center items-center gap-8 py-12 px-6 absolute top-0 w-full z-50">
      <div className="flex justify-between items-center w-full max-w-5xl">
        <Link href="/">
          <Image
            className="w-32 lg:w-82"
            src="/foofest-logo.svg"
            height="200"
            width="200"
            alt="logo"
          />
        </Link>

        <nav className="hidden lg:flex font-medium text-sm">
          <ul className="flex space-x-8">
            <li>
              <Link href="/">Schedule</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link
        href="/booking"
        className="btn  bg-primary hover:bg-emerald-500 border-emerald-500 hover:border-emerald-400 text-emerald-100 font-medium  w-fit whitespace-nowrap"
      >
        Buy Tickets
      </Link>
    </header>
  );
}

export default Header;
