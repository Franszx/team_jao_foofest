import ArtistCard from "./ArtistCard";

export default async function LiveArtists() {
	const midgard = data.Midgard;
	const vanaheim = data.Vanaheim;
	const jotunheim = data.Jotunheim;

	const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	const date = new Date();
	const dayName = days[date.getDay()];
	const currentHour = date.getHours();

	return (
		<>
			<h2>Playing Now</h2>
			<p>Todays weekday: {dayName}</p>
			<p>Current hour: {currentHour}</p>
			<div>
				<ArtistCard scene="" artist="" time="" />
			</div>
		</>
	);
}

const res = await fetch("http://localhost:8080/schedule");
const data = await res.json();
