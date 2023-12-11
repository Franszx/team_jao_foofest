"use client";
import Header from "@/components/Header";
import ScheduleCard from "@/components/ScheduleCard";
import { url } from "/config";
import BuyButton from "@/components/BuyButton";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/BurgerMenu";

import { useEffect, useState } from "react";

export default function Schedule() {
  const [dataSchedule, setDataSchedule] = useState(null);
  const [dataBands, setDataBands] = useState(null);
  const [selectedScene, showSelectedScene] = useState("All stages");
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resSchedule = await fetch(`${url}/schedule`);
      const dataSchedule = await resSchedule.json();
      setDataSchedule(dataSchedule);

      const resBands = await fetch(`${url}/bands`);
      const dataBandsInfo = await resBands.json();
      setDataBands(dataBandsInfo);
    };

    fetchData();
  }, []);

  if (!dataSchedule || !dataBands) {
    return (
      <>
        <h2 className="text-xl mb-3">Loading...</h2>
        <div className="flex flex-wrap justify-center"></div>
      </>
    );
  }

  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const date = new Date();
  const dayName = days[date.getDay()];
  const currentHour = date.getHours();

  // Manual override for testing, comment out when done:
  // const dayName = "fri";
  //   const currentHour = 23;

  const getCurrentAct = (schedule) => {
    return schedule.find((act) => {
      const startHour = parseInt(act.start.split(":")[0]);
      const endHour = parseInt(act.end.split(":")[0]);
      return currentHour >= startHour && currentHour < endHour;
    });
  };

  const getBandInfo = (bandName) => {
    if (bandName === "break") {
      return { name: "break", logo: "break.jpg" };
    }
    return dataBands.find((band) => band.name === bandName);
  };

  const getBandLogo = (bandInfo) => {
    if (bandInfo.logo && bandInfo.logo.startsWith("https")) {
      return bandInfo.logo;
    } else if (bandInfo.name === "break") {
      return `/img/${bandInfo.logo}`;
    } else {
      return `${url}/logos/${bandInfo.logo}`;
    }
  };

  const getnextActlink = (nextAct, schedule) => {
    if (nextAct) {
      if (nextAct.act === "break") {
        return "/schedule";
      } else {
        return `/artist/${getBandInfo(nextAct.act).slug}`;
      }
    } else {
      return "/schedule";
    }
  };
  const dayNames = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  return (
    <>
      <Header />
      <BurgerMenu />
      <div className="container mx-auto max-w-6xl px-6 mt-40 flex flex-col gap-4">
        <h2 className="font-sans font-black text-3xl lg:text-5xl">Schedule</h2>
        <h3 className="font-sans font-black text-2xl lg:text-4xl text-stroke-1 text-transparent">Stage</h3>
        <div className="grid grid-cols-2 lg:flex flex-col lg:flex-row gap-2">
          <button
            style={{ backgroundColor: selectedButton === "Midgard" ? "rgb(245, 158, 11)" : "rgb(17 24 39)" }}
            className={`btn btn-block px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border ${selectedButton === "Midgard" ? "border-amber-500" : "border-gray-500"} hover:bg-gray-900 hover:border-amber-500`}
            onClick={() => {
              showSelectedScene(`Midgard`);
              setSelectedButton(`Midgard`);
            }}
          >
            Midgard
          </button>
          <button
            style={{ backgroundColor: selectedButton === "Vanaheim" ? "rgb(16, 185, 129)" : "rgb(17 24 39)" }}
            className={`btn px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border ${selectedButton === "Vanaheim" ? "border-emerald-500" : "border-gray-500"} hover:bg-gray-900 hover:border-emerald-500`}
            onClick={() => {
              showSelectedScene(`Vanaheim`);
              setSelectedButton(`Vanaheim`);
            }}
          >
            Vanaheim
          </button>
          <button
            style={{ backgroundColor: selectedButton === "Jotunheim" ? "rgb(219, 39, 119)" : "rgb(17 24 39)" }}
            className={`btn px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border ${selectedButton === "Jotunheim" ? "border-pink-600" : "border-gray-500"} hover:bg-gray-900 hover:border-pink-600`}
            onClick={() => {
              showSelectedScene(`Jotunheim`);
              setSelectedButton(`Jotunheim`);
            }}
          >
            Jotunheim
          </button>
          <button
            style={{ backgroundColor: selectedButton === "All stages" ? "rgb(17 24 39)" : "rgb(17 24 39)" }}
            className="btn px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border border-gray-500 hover:bg-gray-900 hover:border-gray-300"
            onClick={() => {
              showSelectedScene(`All stages`);
              setSelectedButton(`All stages`);
            }}
          >
            All stages
          </button>
        </div>

        <div className="flex flex-row lg:grid lg:grid-cols-7 lg:gap-4 md:justify-around overflow-y-auto h-screen gap-x-9 scrollbar-hide p-4 mb-20">
          {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((dayName) => (
            <div key={dayName} className="flex flex-col items-start">
              <h2 className="text-xl font-bold mb-3 text-center">{dayNames[dayName].toUpperCase()}</h2>

              {Object.keys(dataSchedule).map((scene) => {
                const schedule = dataSchedule[scene][dayName];
                return schedule.map((slot, index) => {
                  if (selectedScene !== "All stages" && scene !== selectedScene) {
                    return null;
                  }
                  const bandName = slot.act;
                  if (bandName === "break") return null;
                  const bandInfo = getBandInfo(bandName);
                  const bandLogo = getBandLogo(bandInfo);
                  const nextAct = schedule[index + 1];
                  4;
                  const nextActLink = getnextActlink(nextAct, schedule);

                  if (bandName) {
                    return (
                      <ScheduleCard
                        key={index}
                        slug={bandName === "break" ? "/schedule" : `/artist/${bandInfo.slug}`}
                        scene={scene}
                        artist={slot.act}
                        time={slot.start}
                        src={bandLogo}
                        logoCredits={bandInfo.logoCredits}
                        nextTime={nextAct ? nextAct.start : "tomorrow"}
                        nextBand={nextAct ? nextAct.act : "check schedule"}
                        nextSlug={nextActLink}
                      />
                    );
                  }

                  return null;
                });
              })}
            </div>
          ))}
        </div>
        <div className="grid place-content-center">
          <BuyButton />
        </div>
      </div>
      <Footer />
    </>
  );
}
