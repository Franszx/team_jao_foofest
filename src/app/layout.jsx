import "./globals.css";

export const metadata = {
  title: "FooFest 2024",
  description: "The best festival in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="foofest">
      <body className=" bg-gray-950 text-gray-50">{children}</body>
    </html>
  );
}
