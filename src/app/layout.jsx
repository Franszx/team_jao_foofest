import "./globals.css";

export const metadata = {
	title: "FooFest",
	description: "The biggest music festival in the world",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="foofest">
			<head>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
					rel="stylesheet"
				/>

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/favicon/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#059669" />
			</head>
			<body className="bg-gray-950 text-gray-50">{children}</body>
		</html>
	);
}
