import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/BurgerMenu";
import PlayingWhen from "@/components/PlayingWhen";
import Image from "next/image";
import { url } from "/config";
import BackButton from "@/components/BackButton";

// Function to generate static paths for each band
export async function generateStaticParams() {
	const bands = await fetch(`${url}/bands`).then((res) => res.json());

	return bands.map((band) => ({
		slug: band.slug,
	}));
}

// Function to generate metadata for each band, to be used in the <head> of the page
export async function generateMetadata({ params }) {
	const bands = await fetch(`${url}/bands`).then((res) => res.json());

	const { slug } = params;
	const band = bands.find((band) => band.slug === slug);

	return {
		title: band ? band.name : "Band not found",
		description: band ? band.bio : "No description available",
	};
}

// Function to generate the page itself
export default async function Page({ params }) {
	const bands = await fetch(`${url}/bands`).then((res) => res.json());
	const { slug } = params;

	const getBandLogo = (band) => {
		if (band.logo?.startsWith("https")) {
			return band.logo;
		}
		if (band.name === "break") {
			return `/img/${band.logo}`;
		}
		return `${url}/logos/${band.logo}`;
	};

	bands
		.filter((band) => band.slug === slug)
		.map((band) => {
			band.logo = getBandLogo(band);
		});

	return (
		<>
			<Header />
			<BurgerMenu />
			{bands
				.filter((band) => band.slug === slug)
				.map((band) => (
					<div key={band.slug}>
						<div className="w-fit h-fit relative">
							<Image
								src={band.logo}
								alt="Random Unsplash Image"
								width={2000}
								height={2000}
								className="w-screen h-[40vh] overflow-hidden object-cover object-center opacity-30 band-image"
							/>

							<div className="container mx-auto max-w-4xl px-6 relative">
								<h1 className="absolute bottom-6 z-50 text-3xl font-medium">
									{band.name}
								</h1>
								<p className="absolute bottom-6 right-0 text-sm text-gray-400 opacity-50 max-w-xl  text-right">
									{band.logoCredits}
								</p>
							</div>
						</div>
						<div className="flex flex-col md:flex-row mt-6 md:mt-12 mb-12 max-w-5xl mx-auto container">
							<div className="space-y-6 md:space-y-12  w-full order-2 md:order-1">
								<div className="flex md:items-center justify-between gap-12 max-w-4xl mx-auto px-6">
									<BackButton />
									<div className="flex flex-col-reverse self-end md:flex-row gap-6 items-end md:justify-end">
										<div className="badge badge-outline border-gray-700 text-gray-300  rounded-lg  h-fit py-1">
											{band.genre}
										</div>
										<PlayingWhen band={band} />
									</div>
								</div>
								<div className="container mx-auto max-w-4xl px-6 space-y-6">
									<p className="">{band.bio}</p>
									<ul className="list-none space-y-1">
										<span className="mb-1">Members</span>
										{band.members.map((member) => (
											<li key={member} className="text-sm text-gray-300">
												{member}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				))}
			<Footer />
		</>
	);
}
