"use client";
import { useState } from "react";
import ReactMapGl from "react-map-gl";

export default function Map(props) {
	const [viewPort, setViewPort] = useState({
		latitude: 55.515097,
		longitude: 11.866122,
		bearing: -90,
		width: "100%",
		height: "100%",
		zoom: 7,
	});

	return (
		<div className={props.className}>
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
