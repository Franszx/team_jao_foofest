"use client";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import MapPin from "./MapPin";

export default function Map(props) {
	const [viewPort, setViewPort] = useState({
		latitude: 55.515097,
		longitude: 11.866122,
		bearing: -90,
		width: "100%",
		height: "100%",
		zoom: 7,
	});

	const [dataCamps, setDataCamps] = useState(null);
	const [selectedCamp, setSelectedCamp] = useState(null);

	const url = "http://foofest.glitch.me";

	// Manual override for testing, comment out when done:
	// const url = "http://localhost:8080";

	useEffect(() => {
		const fetchData = async () => {
			const resCamps = await fetch(`${url}/available-spots`);
			const dataCamps = await resCamps.json();
			setDataCamps(dataCamps);
		};

		fetchData();
	}, []);

	useEffect(() => {
		console.log("selectedCamp" + selectedCamp);
	}, [selectedCamp]);

	return (
		<div className="aspect-[4/5] md:col-start-2 md:col-end-4 md:aspect-[5/4] w-full">
			<ReactMapGl
				{...viewPort}
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				onMove={(evt) => setViewPort(evt.viewPort)}
				mapStyle="mapbox://styles/jaco7643/clptpf0t101an01pj9z1r8nx3"
				attributionControl={false}
			>
				{dataCamps &&
					dataCamps.map((camp) => {
						return (
							<Marker
								key={camp.area}
								latitude={camp.marker[0]}
								longitude={camp.marker[1]}
							>
								<MapPin
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setSelectedCamp(camp);
										console.log("camp" + camp);
									}}
									campName={camp.area}
								/>
							</Marker>
						);
					})}
				{selectedCamp ? (
					<Popup
						latitude={selectedCamp.marker[0]}
						longitude={selectedCamp.marker[1]}
						onClose={() => {
							setSelectedCamp(null);
						}}
					>
						<div className="text-red-900">
							<h2 className="text-xl font-semibold">{selectedCamp.area}</h2>
							<p>
								{selectedCamp.available} / {selectedCamp.spots}
							</p>
						</div>
					</Popup>
				) : null}
			</ReactMapGl>
		</div>
	);
}
