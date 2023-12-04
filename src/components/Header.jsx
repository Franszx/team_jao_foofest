"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import Image from "next/image";

function Header() {
	const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);

	useEffect(() => {
		const isDesktopOrLaptopQuery = window.matchMedia("(min-width: 1224px)");
		setIsDesktopOrLaptop(isDesktopOrLaptopQuery.matches);
		const listener = () => setIsDesktopOrLaptop(isDesktopOrLaptopQuery.matches);
		isDesktopOrLaptopQuery.addListener(listener);
		return () => isDesktopOrLaptopQuery.removeListener(listener);
	}, []);

	return (
		<header className="flex justify-center items-center py-4 px-4">
			<div className="flex justify-between items-center w-full max-w-5xl">
				<div>
					<Image
						className="w-32 lg:w-82"
						src="./foofest-logo.svg"
						height="200"
						width="200"
						alt="logo"
					/>
				</div>

				{isDesktopOrLaptop && (
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
			</div>
			<button className="ml-4 bg-primary text-white px-8 py-2 rounded text-xs">
				Køb billeter
			</button>
		</header>
	);
}

export default Header;
