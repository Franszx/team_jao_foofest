"use client";

import CampMap from "./CampMap";
import CampDisplay from "./CampDisplay";
import BuyButton from "./BuyButton";
import { useEffect, useState } from "react";
import { url } from "/config";

export default function CampOverview() {
	const [dataCamps, setDataCamps] = useState(null);
	const [selectedCamp, setSelectedCamp] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const resCamps = await fetch(`${url}/available-spots`);
			const dataCamps = await resCamps.json();
			setDataCamps(dataCamps);
		};

		fetchData();
	}, []);

	return (
		<section className="my-4">
			<h2 className="text-gray-600 mb-4">
				<span className="text-xl text-gray-50">Camp Map</span> & Avaliable Spots
			</h2>
			{!dataCamps && <div className="skeleton w-full h-96 md:h-[700px]"></div>}
			{dataCamps && (
				<div className="md:grid md:grid-cols-3 md:gap-6 md:place-items-center">
					<div className="hidden md:flex md:flex-col md:items-center md:w-full">
						{dataCamps &&
							dataCamps.map((camp) => {
								return (
									<CampDisplay
										key={camp.area}
										campName={camp.area}
										available={camp.available}
										spots={camp.spots}
										camp={camp}
										selectedCamp={selectedCamp}
										onClick={(e) => {
											setSelectedCamp(camp);
										}}
									/>
								);
							})}
						<div className="mt-4">
							<BuyButton />
						</div>
					</div>
					<CampMap
						selectedCamp={selectedCamp}
						setSelectedCamp={setSelectedCamp}
						className="aspect-[4/5] w-full md:col-start-2 md:col-end-4 md:aspect-[5/4]"
					/>
					<div className="flex justify-center mt-6 md:hidden">
						<BuyButton />
					</div>
				</div>
			)}
		</section>
	);
}
