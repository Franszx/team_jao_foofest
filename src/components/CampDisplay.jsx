export default function CampDisplay(props) {
	const { camp, selectedCamp } = props;
	const isActive = selectedCamp && camp.area === selectedCamp.area;

	const campColors = {
		Svartheim: "bg-red-600 border-red-700",
		Nilfheim: "bg-purple-800 border-purple-900",
		Helheim: "bg-green-500 border-green-600",
		Muspelheim: "bg-yellow-600 border-yellow-700",
		Alfheim: "bg-sky-800 border-sky-900",
	};
	return (
		<div
			className={`font-thin flex justify-between w-full  hover:text-gray-100 border rounded-lg mb-4 py-7 px-6 bg-opacity-20 hover:bg-opacity-60 hover:cursor-pointer ${
				isActive ? "bg-opacity-60 text-gray-100" : "text-gray-400"
			} ${campColors[props.campName] || "bg-gray-700 border-gray-800"}`}
			onClick={props.onClick}
		>
			<p>{props.campName}</p>
			<p>
				{props.available} / {props.spots}
			</p>
		</div>
	);
}
