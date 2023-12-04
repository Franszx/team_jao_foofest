"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  //   const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080/bands/");
      const data = await res.json();
      const bands = data.slice(0, 10);
      console.log(bands);
      //   setPages(bands);
    };

    fetchData();
  }, []);
  return (
    <div className="hero bg-gray-900 mt-10 lg:mt-32">
      <div className="hero-content text-center">
        {/* <div className="max-w-md lg:max-w-3xl">
          <h2 className="text-3xl lg:text-6xl font-bold flex flex-row">
            {bands.map(() => {
              return (
                <Link href="/" key={band.id}>
                  {band.name}
                </Link>
              );
            })}
          </h2>
          <p className="py-6 flex flex-row text-md lg:text-xl">{band.name}</p>
        </div> */}
      </div>
      <div>
        <h1>hej ole</h1>
        {/* <nav className="">
          <ul className="">
            <li className=""></li>
            <li className="">
              {bands.map(() => {
                return (
                  <Link href="/" key={band.id}>
                    {band.name}
                  </Link>
                );
              })}
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
}
