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
			</head>
			<body className="bg-gray-950 text-gray-50">{children}</body>
		</html>
	);
}
