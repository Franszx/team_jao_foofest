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

	// Manual override for testing, comment out when done:
	// const dayName = "fri";
	// const currentHour = 14;

	const getCurrentAct = (schedule) => {
		return schedule.find((act) => {
			const startHour = parseInt(act.start.split(":")[0]);
			const endHour = parseInt(act.end.split(":")[0]);
			return currentHour >= startHour && currentHour < endHour;
		});
	};

	const getBandInfo = (bandName) => {
		if (bandName === "break") {
			return { name: "break", logo: "break.jpg" };
		}
		return dataBands.find((band) => band.name === bandName);
	};

	const getBandLogo = (bandInfo) => {
		if (bandInfo.logo && bandInfo.logo.startsWith("https")) {
			return bandInfo.logo;
		} else if (bandInfo.name === "break") {
			return `/img/${bandInfo.logo}`;
		} else {
			return `http://localhost:8080/logos/${bandInfo.logo}`;
		}
	};

	const getnextActlink = (nextAct, schedule) => {
		if (nextAct) {
			if (nextAct.act === "break") {
				return "/";
			} else {
				return `/artist/${getBandInfo(nextAct.act).slug}`;
			}
		} else {
			return "/schedule";
		}
	};

	return (
		<>
			<h2 className="">Playing Now</h2>
			<div className="flex gap-4 md:justify-around overflow-x-scroll overflow-y-hidden snap-mandatory scrollbar-hide">
				{Object.keys(dataSchedule).map((scene) => {
					const schedule = dataSchedule[scene][dayName];
					const currentAct = getCurrentAct(schedule);
					const bandName = currentAct.act;
					const bandInfo = getBandInfo(bandName);
					const bandLogo = getBandLogo(bandInfo);
					const nextAct = schedule[schedule.indexOf(currentAct) + 1];
					const nextActLink = getnextActlink(nextAct, schedule);
					console.log(nextActLink);

					if (currentAct && bandName) {
						return (
							<ArtistCard
								key={scene}
								slug={bandName === "break" ? "/" : `/artist/${bandInfo.slug}`}
								scene={scene}
								artist={currentAct.act}
								time={currentAct.end}
								src={bandLogo}
								logoCredits={bandInfo.logoCredits}
								nextTime={nextAct ? nextAct.start : "tomorrow"}
								nextBand={nextAct ? nextAct.act : "check schedule"}
								nextSlug={nextActLink}
							/>
						);
					}

					return null;
				})}
			</div>
		</>
	);
}
