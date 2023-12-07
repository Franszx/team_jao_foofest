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
		<div>
			<h2
				className={`text-xl font-semibold ${
					campColors[area] || "text-gray-100"
				}`}
			>
				{area}
			</h2>
			<div className="flex justify-between gap-4 text-gray-400">
				<p>Avaliable Spots:</p>
				<p>
					{available} / {spots}
				</p>
			</div>
		</div>
	);
}
