import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveArtists from "@/components/LiveArtists";
import BurgerMenu from "@/components/BurgerMenu";

export default function Home() {
	return (
		<>
			<Header />
			<BurgerMenu />
			<main className="container mx-auto max-w-6xl px-6">
				<LiveArtists />
			</main>
			<Footer />
		</>
	);
}
