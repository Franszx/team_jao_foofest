"use client";
import { useState, useEffect } from "react";
import { url } from "/config";
import Link from "next/link";

export default function Hero() {
  const [pages1, setPages1] = useState([]);
  const [pages2, setPages2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url}/bands`);
      const data = await res.json();
      const bands1 = data.slice(0, 10);
      const bands2 = data.slice(30, 42);

      setPages1(bands1);
      setPages2(bands2);
    };

    fetchData();
  }, []);
  return (
    <div className="hero flex flex-col -mt-12 lg:my-4 ">
      <div className="hero-content text-center">
        <ul className="flex flex-wrap font-sans justify-center lg:gap-4 text-3xl lg:text-6xl w-fit font-extrabold tracking-tight lg:tracking-normal">
          {pages1.map((band, index, array) => {
            return (
              <>
                <li key={band.slug}>
                  <Link
                    href={`/artist/${band.slug}`}
                    className=" text-gray-950  hover:text-gray-50 transition text-stroke-1 hover:text-stroke-0"
                  >
                    {band.name}
                  </Link>
                </li>
                {index !== array.length - 1 && (
                  <li className=" text-gray-400 font-extralight"> / </li>
                )}
              </>
            );
          })}
        </ul>
      </div>
      <div className="hero-content px-2 mt-2">
        <nav className="">
          <ul className="flex grow flex-wrap font-sans justify-center gap-2 text-xs lg:text-xl font-regular">
            {pages2.map((band, index, array) => {
              return (
                <>
                  <li
                    className="text-gray-400 hover:text-gray-50 transition-colors"
                    key={band.slug}
                  >
                    <Link href={`/artist/${band.slug}`} key={band.slug}>
                      {band.name}
                    </Link>
                  </li>
                  {index !== array.length - 1 && (
                    <li className="text-gray-400"> / </li>
                  )}
                </>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
