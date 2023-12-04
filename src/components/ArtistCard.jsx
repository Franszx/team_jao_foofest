export default function ArtistCard(props) {
	return (
		<div>
			<article className="grid grid-rows-2 max-w-md">
				<p className="ml-6 mt-4 text-gray-300 col-start-1 row-start-1 z-20">
					{props.scene}
				</p>
				<div className="ml-6 mb-4 col-start-1 row-start-2 z-20 self-end">
					<p className="capitalize text-2xl text-gray-50">{props.artist}</p>
					<p className="text-gray-300">Until {props.time}</p>
				</div>
				<img
					className="col-start-1 col-end-2 row-start-1 row-end-3 object-cover z-0 brightness-50 rounded-lg border-2 border-gray-800"
					src={props.src}
					alt=""
				/>
			</article>
			<p className="italic text-gray-500 text-sm">{props.logoCredits}</p>
		</div>
	);
}
