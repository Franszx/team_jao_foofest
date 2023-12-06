"use client";
import { useState } from "react";
import ReactMapGl from "react-map-gl";

export default function Map() {
	const [viewPort, setViewPort] = useState({
		latitude: 45.4211,
		longitude: -75.6903,
		width: "100%",
		height: "100%",
		zoom: 10,
	});
	console.log(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

	return (
		<div className="h-96">
			<ReactMapGl
				{...viewPort}
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				onMove={(evt) => setViewPort(evt.viewPort)}
				mapStyle="mapbox://styles/jaco7643/clptpf0t101an01pj9z1r8nx3"
			>
				Markers Here
			</ReactMapGl>
		</div>
	);
}
