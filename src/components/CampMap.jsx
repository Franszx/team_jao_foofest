"use client";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { url } from "/config";
import MapPin from "./MapPin";
import PopUpContent from "./PopUpContent";

export default function Map({
	selectedCamp,
	setSelectedCamp,
	chooseSpot,
	totalTickets,
	className,
	mapHandleModal,
}) {
	const [viewPort, setViewPort] = useState({
		latitude: 55.515097,
		longitude: 11.866122,
		bearing: -90,
		width: "100%",
		height: "100%",
		zoom: 7,
	});

	const [dataCamps, setDataCamps] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const resCamps = await fetch(`${url}/available-spots`);
			const dataCamps = await resCamps.json();
			setDataCamps(dataCamps);
		};

		fetchData();
	}, []);

	return (
		<div className={className}>
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
										mapHandleModal();
										{
											chooseSpot && chooseSpot(camp.area);
										}
									}}
									campName={camp.area}
									selectedCamp={selectedCamp}
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
						<PopUpContent selectedCamp={selectedCamp} />
					</Popup>
				) : null}
			</ReactMapGl>
		</div>
	);
}
