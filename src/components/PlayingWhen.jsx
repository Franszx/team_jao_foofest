"use client";
import { url } from "/config";
import Link from "next/link";
import { useEffect, useState } from "react";

function PlayingWhen({ band }) {
  const [schedule, setSchedule] = useState("");
  const [stage, setStage] = useState("");

  useEffect(() => {
    fetch(`${url}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        // Iterate over each stage
        for (let stage in data) {
          // Iterate over each day in the current stage
          for (let day in data[stage]) {
            // Find the time slot where the band is playing
            const timeSlot = data[stage][day].find(
              (slot) => slot.act === band.name
            );
            // Convert day from "thu" etc, to "Thursday" etc.
            const days = {
              mon: "Monday",
              tue: "Tuesday",
              wed: "Wednesday",
              thu: "Thursday",
              fri: "Friday",
              sat: "Saturday",
              sun: "Sunday",
            };
            const fullDay = days[day];

            if (timeSlot) {
              setSchedule(
                `Playing on ${stage}, ${fullDay} at ${timeSlot.start}`
                //    to ${timeSlot.end}
              );
              setStage(stage);
            }
          }
        }
      });
  }, [band]);

  return (
    <Link href={`/schedule`}>
      <div
        className={`badge ${
          stage === "Midgard"
            ? "bg-amber-600 border-amber-500 text-amber-100"
            : stage === "Vanaheim"
            ? "bg-emerald-700 border-emerald-600 text-emerald-100"
            : stage === "Jotunheim"
            ? "bg-rose-600 border-rose-500 text-rose-100"
            : "bg-gray-600 border-gray-500 text-gray-100"
        }  rounded-lg h-fit py-1 md:whitespace-nowrap`}
      >
        {schedule ? <p>{schedule}</p> : <p>Loading...</p>}
      </div>
    </Link>
  );
}

export default PlayingWhen;
