export default function ArtistCardLoading(props) {
	return (
		<article className="w-64 md:w-80 flex flex-col items-center snap-start">
			<p className="w-64 md:w-80">{props.scene}</p>
			<p className="capitalize text-xl text-gray-50">Loading Artist</p>
			<span className="loading loading-ring loading-lg text-primary"></span>
		</article>
	);
}
