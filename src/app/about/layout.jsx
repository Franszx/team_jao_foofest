export const metadata = {
  title: "About FooFest",
  description:
    "FooFest is the biggest music festival in the world. It is held every year in the city of Foo, and it attracts thousands of people from all over the world. FooFest is a non-profit organization, and all the money raised from ticket sales goes to charity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="foofest">
      <body className="bg-gray-950 text-gray-50">{children}</body>
    </html>
  );
}
