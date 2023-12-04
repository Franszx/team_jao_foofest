import { SocialIcon } from "react-social-icons";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="hero flex flex-col my-10">
      <div className="hero-content flex flex-wrap mb-4">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-9 lg:gap-x-36 justify-items-center ">
          <li>
            <a className="text-sm lg:text-sm text-gray-300" href="/">
              News
            </a>
          </li>
          <li>
            <Link className="text-sm lg:text-sm text-gray-300" href="/Booking">
              Tickets
            </Link>
          </li>
          <li>
            <a className="text-sm lg:text-sm text-gray-300" href="/">
              Responsibility
            </a>
          </li>
          <li>
            <a className="text-sm lg:text-sm text-gray-300" href="/">
              Volunteer
            </a>
          </li>
          <li>
            <a className="text-sm lg:text-sm text-gray-300" href="/">
              About FooFest
            </a>
          </li>
          <li>
            <a className="text-sm lg:text-sm text-gray-300" href="/">
              Press
            </a>
          </li>
          <li>
            <a className="text-sm lg:text-sm text-gray-300" href="/">
              Internship
            </a>
          </li>
          <li>
            <a className="text-sm lg:text-sm text-gray-300" href="/">
              Non-profit & Donations
            </a>
          </li>
        </ul>
      </div>
      <div className="hero-content flex flex-wrap mb-4">
        <SocialIcon network="facebook" bgColor="#030712" fgColor="#A1A1AA" />
        <SocialIcon network="x" bgColor="#030712" fgColor="#A1A1AA" />
        <SocialIcon network="instagram" bgColor="#030712" fgColor="#A1A1AA" />
        <SocialIcon network="snapchat" bgColor="#030712" fgColor="#A1A1AA" />
      </div>
      <div>
        <p className="text-gray-300">info@foofest.com</p>
      </div>
    </footer>
  );
}
