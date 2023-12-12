import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

function About() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-6 mt-40 min-h-screen">
        <h1 className="text-3xl font-bold text-center">About FooFest</h1>
        <p className="text-md mt-16">
          Welcome to the biggest EDM festival in the world! Get ready for an
          unforgettable experience filled with electrifying music, mind-blowing
          performances, and an incredible atmosphere that will leave you wanting
          more.
        </p>
        <Image
          src="https://source.unsplash.com/random/?concert"
          alt="Random Unsplash Image"
          width={500}
          height={500}
          className=" aspect-video object-cover object-center w-full mt-8"
        />
        <p className="text-md mt-16">
          Our festival brings together the most talented DJs, producers, and
          artists from around the globe. With multiple stages, each showcasing
          different genres of electronic music, you'll have the opportunity to
          dance to your favorite beats all night long.
        </p>
        <Image
          src="https://source.unsplash.com/random/?festival"
          alt="Random Unsplash Image"
          width={500}
          height={500}
          className=" aspect-video object-cover object-center w-full mt-8"
        />
        <p className="text-md mt-16">
          In addition to the incredible music, we offer a wide range of
          amenities and activities to enhance your festival experience. From
          food vendors serving delicious cuisine to interactive art
          installations and immersive light shows, there's something for
          everyone to enjoy.
        </p>
        <Image
          src="https://source.unsplash.com/random/?edm"
          alt="Random Unsplash Image"
          width={500}
          height={500}
          className=" aspect-video object-cover object-center w-full mt-8"
        />
        <p className="text-md mt-16">
          Join us for an unforgettable weekend of music, dancing, and pure
          euphoria. Get your tickets now and be a part of the ultimate EDM
          festival experience!
        </p>
      </main>
      <Footer />
    </>
  );
}

export default About;
