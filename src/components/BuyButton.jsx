import Link from "next/link";
export default function Header() {
  return (
    <Link href="/booking" legacyBehavior>
      <a id="link" className="btn ml-4 px-8 py-2 bg-primary text-emerald-100 text-xs lg:text-base w-fit rounded border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400">
        Buy Tickets
      </a>
    </Link>
  );
}
