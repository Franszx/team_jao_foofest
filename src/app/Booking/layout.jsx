export const metadata = {
  title: "FooFest Billetter",
  description: "Køb billetter til FooFest 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="foofest">
      <body className="bg-gray-950 text-gray-50">{children}</body>
    </html>
  );
}
