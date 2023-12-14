import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/BurgerMenu";
import WrapperLiveChat from "@/components/WrapperLiveChat";

export const metadata = {
	title: "Stage Chats",
	description: "Welcome to our stage chats",
};

export default function page() {
	return (
		<>
			<Header />
			<BurgerMenu />
			<main className="container mx-auto max-w-6xl px-6 mt-40 flex flex-col items-center gap-8">
				<div className="max-w-[600px]">
					<h1 className="text-3xl capitalize mb-4">
						Welcome To Our{" "}
						<span className="text-primary uppercase">stage chats</span>
					</h1>
					<p className="text-lg">
						We have three stage chats, one for each of our stages. Feel free to
						chat with other attendees, or ask questions to the organizers!
					</p>
				</div>
				<WrapperLiveChat />
			</main>
			<Footer />
		</>
	);
}
