"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [pages1, setPages1] = useState([]);
  const [pages2, setPages2] = useState([]);
  // ------------- manual override for local dev ------------- //
  const url = "http://localhost:8080";
  // const url = "http://foofest.glitch.me";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url}/bands`);
      const data = await res.json();
      const bands1 = data.slice(60, 68);
      const bands2 = data.slice(31, 50);

      setPages1(bands1);
      setPages2(bands2);
    };

    fetchData();
  }, []);
  return (
    <div className="hero flex flex-col lg:mt-10 lg:mt-16">
      <div className="hero-content text-center">
        <div>
          <h2 className="flex flex-wrap font-sans justify-center gap-4 text-4xl lg:text-6xl w-fit font-extrabold text-transparent tracking-tight lg:tracking-tighter lg:leading-58 ">
            {pages1.map((band) => {
              return (
                <Link href={`/artist/${band.slug}`} key={band.id} className="hover:text-gray-300 text-stroke-1">
                  {band.name}
                </Link>
              );
            })}
          </h2>
        </div>
      </div>
      <div className="hero-content px-2 mt-2">
        <nav className="">
          <ul className="flex grow">
            <li className="flex flex-wrap font-sans text-gray-300 justify-center gap-2 font-semibold text-xs lg:text-lg lg:text-xl font-light ">
              {pages2.map((band) => {
                return (
                  <Link href={`/artist/${band.slug}`} key={band.id}>
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
