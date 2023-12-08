"use client";
import Header from "@/components/Header";
import ScheduleCard from "@/components/ScheduleCard";

import BuyButton from "@/components/BuyButton";
import Footer from "@/components/Footer";

import { useEffect, useState } from "react";

export default function Schedule() {
  const [dataSchedule, setDataSchedule] = useState(null);
  const [dataBands, setDataBands] = useState(null);
  const [selectedScene, showSelectedScene] = useState("All stages");
  // const url = "http://foofest.glitch.me";

  // Manual override for testing, comment out when done:
  const url = "http://localhost:8080";

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
      <div className="container mx-auto max-w-6xl mt-40 flex flex-col gap-16">
        <h2 className="font-sans font-black text-3xl lg:text-5xl">Schedule</h2>
        <h3 className="font-sans font-black text-2xl lg:text-4xl text-stroke-1 text-transparent">Stage</h3>
        <div className="flex gap-2">
          <button className="btn ml-4 px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border border-gray-500 hover:bg-gray-900 hover:border-emerald-400" onClick={() => showSelectedScene(`Midgard`)}>
            Midgard
          </button>
          <button className="btn ml-4 px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border border-gray-500 hover:bg-gray-900 hover:border-emerald-400" onClick={() => showSelectedScene(`Vanaheim`)}>
            Vanaheim
          </button>
          <button className="btn ml-4 px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border border-gray-500 hover:bg-gray-900 hover:border-emerald-400" onClick={() => showSelectedScene(`Jotunheim`)}>
            Jotunheim
          </button>
          <button className="btn ml-4 px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border border-gray-500 hover:bg-gray-900 hover:border-emerald-400" onClick={() => showSelectedScene(`All stages`)}>
            All stages
          </button>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((dayName) => (
            <div key={dayName} className="flex flex-col items-center">
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
