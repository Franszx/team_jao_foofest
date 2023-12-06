"use client";

import CampMap from "./CampMap";
import CampDisplay from "./CampDisplay";
import { useEffect, useState } from "react";

export default function CampOverview() {
	const [dataCamps, setDataCamps] = useState(null);

	// const url = "http://foofest.glitch.me";

	// Manual override for testing, comment out when done:
	const url = "http://localhost:8080";

	useEffect(() => {
		const fetchData = async () => {
			const resCamps = await fetch(`${url}/available-spots`);
			const dataCamps = await resCamps.json();
			setDataCamps(dataCamps);
		};

		fetchData();
	}, []);

	return (
		<section className="my-16">
			<h2 className="text-gray-600 mb-4">
				<span className="text-xl text-gray-50">Camp Map</span> & Avaliable Spots
			</h2>
			<div className="grid grid-cols-3 gap-6">
				<div>
					{dataCamps &&
						dataCamps.map((camp) => {
							return (
								<CampDisplay
									key={camp.area}
									campName={camp.area}
									available={camp.available}
									spots={camp.spots}
								/>
							);
						})}
				</div>
				<CampMap className="col-start-2 col-end-4 aspect-square" />
			</div>
		</section>
	);
}
