"use client";

import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";

export default function LiveArtists() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("http://localhost:8080/schedule");
			const data = await res.json();
			setData(data);
		};

		fetchData();
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

	const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	const date = new Date();
	const dayName = days[date.getDay()];
	const currentHour = date.getHours();

	const getCurrentAct = (schedule) => {
		return schedule.find((act) => {
			const startHour = parseInt(act.start.split(":")[0]);
			console.log(startHour);
			const endHour = parseInt(act.end.split(":")[0]);
			return currentHour >= startHour && currentHour < endHour;
		});
	};

	return (
		<>
			<h2 className="">Playing Now</h2>
			<div className="flex gap-4 justify-around">
				{Object.keys(data).map((scene) => {
					const schedule = data[scene][dayName];
					const currentAct = getCurrentAct(schedule);
					const bandName = currentAct.act;

					if (currentAct && currentAct.act !== "break") {
						return (
							<ArtistCard
								key={scene}
								scene={scene}
								artist={currentAct.act}
								time={currentAct.end}
								src={"https://source.unsplash.com/random/720x480?random=7937"}
							/>
						);
					}

					return null;
				})}
			</div>
		</>
	);
}
