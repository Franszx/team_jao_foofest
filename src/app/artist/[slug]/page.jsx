import Image from "next/image";

// Function to generate static paths for each band
export async function generateStaticParams() {
  const bands = await fetch("http://localhost:8080/bands").then((res) =>
    res.json()
  );

  return bands.map((band) => ({
    slug: band.slug,
  }));
}

// Function to generate metadata for each band, to be used in the <head> of the page
export async function generateMetadata({ params }) {
  const bands = await fetch("http://localhost:8080/bands").then((res) =>
    res.json()
  );

  const { slug } = params;
  const band = bands.find((band) => band.slug === slug);

  return {
    title: band ? band.name : "Band not found",
    description: band ? band.bio : "No description available",
  };
}

// Function to generate the page itself
export default async function Page({ params }) {
  const bands = await fetch("http://localhost:8080/bands").then((res) =>
    res.json()
  );
  const { slug } = params;

  return (
    <>
      {bands
        .filter((band) => band.slug === slug)
        .map((band) => (
          <div key={band.slug}>
            <div className="w-fit h-fit relative">
              <Image
                src="https://source.unsplash.com/random?band"
                alt="Random Unsplash Image"
                width={2000}
                height={2000}
                className="w-screen h-[40vh] overflow-hidden object-cover object-center opacity-30"
              />

              <div className="container mx-auto max-w-4xl px-6 relative">
                <h1 className="absolute bottom-6 z-50 text-3xl font-medium">
                  {band.name}
                </h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row container mx-auto max-w-4xl px-6 mt-6 md:mt-12">
              <div className="space-y-6  w-full order-2 md:order-1">
                <div className="badge badge-outline border-gray-700 text-gray-300  rounded-lg  h-fit py-1">
                  {band.genre}
                </div>
                <p className="max-w-xl">{band.bio}</p>
                <ul className="list-none space-y-1">
                  <span className="mb-1">Members</span>
                  {band.members.map((member) => (
                    <li key={member} className="text-sm text-gray-300">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex md:justify-end md:w-2/5 order-1 md:order-2 mb-6 md:mb-0 ">
                <div className="badge badge-accent text-rose-200 rounded-lg h-fit py-1 whitespace-nowrap">
                  Tuesday at 8:00 PM on Vanaheim
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
