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

              <div className="container mx-auto max-w-4xl px-6">
                <h1 className="absolute bottom-6 z-50 text-3xl font-medium">
                  {band.name}
                </h1>
              </div>
            </div>
            <div className="container mx-auto max-w-4xl px-6 mt-12 space-y-6">
              <p className="badge badge-accent rounded-md text-rose-200">
                {band.genre}
              </p>
              <p className="max-w-xl">{band.bio}</p>
              <ul className="list-none space-y-1">
                <span className="mb-1">Members</span>
                {band.members.map((member) => (
                  <li key={member} className="text-sm text-gray-400">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </>
  );
}
