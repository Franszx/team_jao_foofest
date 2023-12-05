export default function ArtistCardLoading(props) {
	return (
		<article className="flex flex-col items-center snap-start rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-4">
			<p className="w-64 h-16 md:w-80">{props.scene}</p>
			<p className="capitalize text-xl text-gray-50">Loading Artist</p>
			<span className="loading loading-ring loading-lg text-primary"></span>
		</article>
	);
}
