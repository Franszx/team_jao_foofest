import CampMap from "./CampMap";
import CampDisplay from "./CampDisplay";

export default function CampOverview() {
	return (
		<>
			<h2>Map</h2>
			<div className="grid grid-cols-2">
				<div></div>
				<CampMap />
			</div>
		</>
	);
}
