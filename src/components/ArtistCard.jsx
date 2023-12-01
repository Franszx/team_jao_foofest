export default function ArtistCard(props) {
	return (
		<>
			<article>
				<p>{props.scene}</p>
				<p>{props.artist}</p>
				<p>Playing To {props.time}</p>
				<img
					src="https://source.unsplash.com/random/720x480?random=7937"
					alt=""
				/>
			</article>
		</>
	);
}
