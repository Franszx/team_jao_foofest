"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function PlayingWhen({ band }) {
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/schedule")
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
            }
          }
        }
      });
  }, [band]);

  return (
    <Link href={`/schedule`}>
      <div className="badge badge-accent text-rose-200 rounded-lg h-fit py-1 whitespace-nowrap">
        {schedule ? <p>{schedule}</p> : <p>Loading...</p>}
      </div>
    </Link>
  );
}

export default PlayingWhen;
