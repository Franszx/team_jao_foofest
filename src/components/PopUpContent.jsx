export default function PopUpContent({ selectedCamp }) {
	const { area, available, spots } = selectedCamp;

	const campColors = {
		Svartheim: "text-red-600",
		Nilfheim: "text-purple-800",
		Helheim: "text-green-500",
		Muspelheim: "text-yellow-600",
		Alfheim: "text-sky-800",
	};

	return (
		<div className={`text-red-900 ${campColors[area] || "text-gray-100"}`}>
			<h2 className="text-xl font-semibold">{area}</h2>
			<p>
				{available} / {spots}
			</p>
		</div>
	);
}
