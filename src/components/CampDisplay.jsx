export default function CampDisplay(props) {
	return (
		<div className="flex justify-between text-gray-400 bg-gray-900 border-2 border-gray-800 rounded-lg mb-4 py-5 px-4">
			<p>{props.campName}</p>
			<p>
				{props.available} / {props.spots}
			</p>
		</div>
	);
}
