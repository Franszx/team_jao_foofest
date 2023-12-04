"use client";

import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";

export default function LiveArtists() {
	const [dataSchedule, setDataSchedule] = useState(null);
	const [dataBands, setDataBands] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const resSchedule = await fetch("http://localhost:8080/schedule");
			const dataSchedule = await resSchedule.json();
			setDataSchedule(dataSchedule);

			const resBands = await fetch("http://localhost:8080/bands");
			const dataBandsInfo = await resBands.json();
			setDataBands(dataBandsInfo);
		};

		fetchData();
	}, []);

	if (!dataSchedule || !dataBands) {
		return <div>Loading...</div>;
	}

	const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	const date = new Date();
	const dayName = days[date.getDay()];
	const currentHour = date.getHours();
	console.log(dayName, currentHour);

	const getCurrentAct = (schedule) => {
		return schedule.find((act) => {
			const startHour = parseInt(act.start.split(":")[0]);
			const endHour = parseInt(act.end.split(":")[0]);
			return currentHour >= startHour && currentHour < endHour;
		});
	};

	const getBandInfo = (bandName) => {
		return dataBands.find((band) => (band.name = bandName));
	};

	// console.log(dataBands.map((band) => band.name));

	return (
		<>
			<h2 className="">Playing Now</h2>
			<div className="flex gap-4 justify-around">
				{Object.keys(dataSchedule).map((scene) => {
					const schedule = dataSchedule[scene][dayName];
					const currentAct = getCurrentAct(schedule);
					const bandName = currentAct.act;
					const bandInfo = getBandInfo(bandName);
					console.log(bandInfo);

					if (currentAct && bandName) {
						return (
							<ArtistCard
								key={scene}
								scene={scene}
								artist={currentAct.act}
								time={currentAct.end}
								src={"https://source.unsplash.com/random/720x480?random=38459"}
							/>
						);
					}

					return null;
				})}
			</div>
		</>
	);
}
