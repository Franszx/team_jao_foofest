import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveArtists from "@/components/LiveArtists";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<LiveArtists />
			</main>
			<Footer />
		</>
	);
}
