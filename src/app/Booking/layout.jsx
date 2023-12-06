export const metadata = {
  title: "FooFest Tickets",
  description: "Buy tickets for FooFest 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="foofest">
      <body className="bg-gray-950 text-gray-50">{children}</body>
    </html>
  );
}
