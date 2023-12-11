import Link from "next/link";
export default function Header() {
	return (
		<Link
			id="link"
			href="/booking"
			className="btn bg-primary text-emerald-100 font-medium text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400"
		>
			Buy Tickets
		</Link>
	);
}
