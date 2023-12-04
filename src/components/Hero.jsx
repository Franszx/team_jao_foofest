"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080/bands/");
      const data = await res.json();
      const bands = data.slice(0, 10);

      setPages(bands);
    };

    fetchData();
  }, []);
  return (
    <div className="hero flex flex-col bg-gray-900 mt-10 lg:mt-32">
      <div className="hero-content">
        <div className="grid ">
          <h2 className="grid gap-2 auto-rows-auto text-3xl lg:text-6xl text-stroke-1 font-bold text-transparent ">
            {pages.map((band) => {
              return (
                <Link href={`/artist/${band.slug}`} key={band.id}>
                  {band.name}
                </Link>
              );
            })}
          </h2>
        </div>
      </div>
      <div className="">
        <nav className="">
          <ul className="flex grow">
            <li className="grid text-base font-light">
              {pages.map((band) => {
                return (
                  <Link href="/" key={band.id}>
                    {band.name}
                  </Link>
                );
              })}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
