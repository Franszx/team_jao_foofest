"use client";
import { useState, useEffect } from "react";
import { url } from "/config";
import Link from "next/link";
import React from "react";

export default function Hero() {
	const [pages1, setPages1] = useState([]);
	const [pages2, setPages2] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${url}/bands`);
			const data = await res.json();
			const bands1 = data.slice(0, 10);
			const bands2 = data.slice(30, 42);

			setPages1(bands1);
			setPages2(bands2);
		};

		fetchData();
	}, []);

	if (pages1.length === 0 || pages2.length === 0)
		return (
			<div className="flex mx-auto flex-col gap-6 items-center w-80 md:w-96">
				<span className="loading loading-spinner text-primary w-16"></span>
				<div role="alert" className="alert shadow-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-info shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<div>
						<h3 className="font-bold">Starting Database!</h3>
						<div className="text-xs">Please Stand By</div>
					</div>
				</div>
			</div>
		);

	return (
		<div className="hero flex flex-col -mt-12 lg:my-4 ">
			<div className="hero-content text-center">
				<ul className="flex flex-wrap font-sans justify-center lg:gap-4 text-3xl lg:text-6xl w-fit font-extrabold tracking-tight lg:tracking-normal">
					{pages1.map((band, index, array) => {
						return (
							<React.Fragment key={band.slug}>
								<li>
									<Link
										href={`/artist/${band.slug}`}
										className=" text-gray-950  hover:text-gray-50 transition text-stroke-1 hover:text-stroke-0"
									>
										{band.name}
									</Link>
								</li>
								{index !== array.length - 1 && (
									<li className=" text-gray-400 font-extralight"> / </li>
								)}
							</React.Fragment>
						);
					})}
				</ul>
			</div>
			<div className="hero-content px-2 mt-2">
				<nav className="">
					<ul className="flex grow flex-wrap font-sans justify-center gap-2 text-xs lg:text-xl font-regular">
						{pages2.map((band, index, array) => {
							return (
								<React.Fragment key={band.slug}>
									<li
										className="text-gray-400 hover:text-gray-50 transition-colors"
										key={band.slug}
									>
										<Link href={`/artist/${band.slug}`} key={band.slug}>
											{band.name}
										</Link>
									</li>
									{index !== array.length - 1 && (
										<li className="text-gray-400"> / </li>
									)}
								</React.Fragment>
							);
						})}
					</ul>
				</nav>
			</div>
		</div>
	);
}
