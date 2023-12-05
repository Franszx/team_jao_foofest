import Link from "next/link";
import Image from "next/image";

export default function ArtistCard(props) {
	return (
		<div className="w-64 md:w-80 snap-start">
			<Link href={`${props.slug}`}>
				<article className="h-48 w-64 md:w-80 md:h-56 grid grid-rows-2">
					<p className="ml-6 mt-4 text-gray-300 col-start-1 row-start-1 z-20">
						{props.scene}
					</p>
					<div className="ml-6 mb-4 col-start-1 row-start-2 z-20 self-end">
						<p className="capitalize text-2xl text-gray-50">{props.artist}</p>
						<p className="text-gray-300">Until {props.time}</p>
					</div>
					<Image
						className="col-start-1 col-end-2 row-start-1 row-end-3 object-cover z-0 brightness-50 rounded-lg border-2 border-gray-800 h-full w-full"
						width={320}
						height={320}
						src={props.src}
						alt="Band logo"
					/>
				</article>
			</Link>
			<div className="grid">
				<p className="italic text-gray-500 text-[0.5rem]">
					{props.logoCredits}
				</p>
				<Link href={props.nextSlug}>
					<p className=" text-sm text-gray-400 bg-gray-900 border-2 border-gray-800 w-fit py-2 px-3 mt-2 rounded-lg">
						&#8594; {props.nextTime}{" "}
						<span className="text-gray-50 capitalize">{props.nextBand}</span>
					</p>
				</Link>
			</div>
		</div>
	);
}
