import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveArtists from "@/components/LiveArtists";

export default function Home() {
	return (
		<>
			<Header />
			<main className="container mx-auto max-w-6xl px-6">
				<LiveArtists />
			</main>
			<Footer />
		</>
	);
}
