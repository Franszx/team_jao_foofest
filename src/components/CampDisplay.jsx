export default function CampDisplay(props) {
	return (
		<div>
			<p>{props.campName}</p>
			<p>
				{props.avaliable} / {props.spots}
			</p>
		</div>
	);
}
