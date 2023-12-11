import { IconMinus, IconPlus } from "@tabler/icons-react";
import CampMap from "./CampMap";
import { useState } from "react";

function TicketAndCamp({
  regularTickets,
  vipTickets,
  totalTickets,
  spots,
  selectedSpot,
  setSelectedSpot,
  updateTickets,
}) {
  const [selectedCamp, setSelectedCamp] = useState(null);

  function chooseSpot(selectedCamp) {
    setSelectedSpot(selectedCamp);
  }

  return (
    <div className=" h-full flex flex-col justify-between">
      <h1 className="font-medium text-lg">Tickets & Camp</h1>
      <div className="flex flex-col justify-evenly flex-grow">
        <div className="place-self-center flex flex-col gap-4">
          <div className="space-y-12">
            <div className="flex items-center gap-6 w-60 justify-end">
              <div className="font-medium text-end">
                <h2 className="text-gray-400">Regular</h2>
                <p>799 DKK</p>
              </div>
              <div className="flex items-center w-32 justify-between font-medium">
                <button
                  className="bg-neutral text-gray-100 font-medium text-base p-2 rounded-full w-fit border border-gray-500 hover:bg-gray-600 hover:border-gray-500 transition-colors"
                  onClick={() => updateTickets("regular", "decrease")}
                >
                  <IconMinus />
                </button>
                <p>{regularTickets}</p>
                <div
                  className={`${
                    totalTickets >= 8
                      ? "tooltip tooltip-right tooltip-accent"
                      : ""
                  }`}
                  data-tip="Max 8 Tickets"
                >
                  <button
                    className={`  font-medium text-base p-2 rounded-full w-fit border transition-colors ${
                      totalTickets >= 8
                        ? "btn-disabled bg-gray-800 border-gray-800 stroke-gray-800"
                        : "bg-primary text-emerald-100 border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 "
                    }`}
                    onClick={() =>
                      totalTickets < 8 && updateTickets("regular", "increase")
                    }
                  >
                    <IconPlus
                      color={totalTickets >= 8 ? "#4b5563" : "#f9fafb"}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 w-60 justify-end">
              <div className="font-medium text-end">
                <h2 className="text-gray-400">VIP</h2>
                <p>1299 DKK</p>
              </div>
              <div className="flex items-center w-32 justify-between font-medium">
                <button
                  className="bg-neutral text-gray-100 font-medium text-base p-2 rounded-full w-fit border border-gray-500 hover:bg-gray-600 hover:border-gray-500 transition-colors"
                  onClick={() => updateTickets("vip", "decrease")}
                >
                  <IconMinus />
                </button>
                <p>{vipTickets}</p>
                <div
                  className={`${
                    totalTickets >= 8
                      ? "tooltip tooltip-right tooltip-accent"
                      : ""
                  }`}
                  data-tip="Max 8 Tickets"
                >
                  <button
                    className={`  font-medium text-base p-2 rounded-full w-fit border transition-colors ${
                      totalTickets >= 8
                        ? "btn-disabled bg-gray-800 border-gray-800 stroke-gray-800"
                        : "bg-primary text-emerald-100 border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 "
                    }`}
                    onClick={() =>
                      totalTickets < 8 && updateTickets("vip", "increase")
                    }
                  >
                    <IconPlus
                      color={totalTickets >= 8 ? "#4b5563" : "#f9fafb"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="font-medium text-sm text-gray-500 place-self-end flex flex-col items-end">
            <p>Total Tickets</p>
            <p>{totalTickets}</p>
          </div>
        </div>
        {spots.length === 0 ? (
          <div className="w-full flex justify-center items-center h-64">
            <div className="loading loading-ring loading-xl"></div>
          </div>
        ) : (
          <CampMap
            selectedCamp={selectedCamp}
            setSelectedCamp={setSelectedCamp}
            chooseSpot={chooseSpot}
            totalTickets={totalTickets}
            className="aspect-[3/2] w-full md:col-start-2 md:col-end-4 md:aspect-[2/1]"
          />
          // <div>
          //   <ul className="flex flex-wrap items-center gap-12 justify-center h-48 max-w-md mx-auto ">
          //     {spots.map((spot) => (
          //       <li
          //         key={spot.area}
          //         className="flex flex-col justify-center items-center gap-1 "
          //       >
          //         <div
          //           className={`${
          //             totalTickets > 0 &&
          //             (spot.available === 0 || totalTickets > spot.available)
          //               ? "tooltip tooltip-accent"
          //               : ""
          //           }`}
          //           data-tip={
          //             spot.available === 0
          //               ? "No more spots"
          //               : totalTickets > spot.available
          //               ? "Not enough room"
          //               : ""
          //           }
          //         >
          //           <button
          //             className={`btn ${
          //               totalTickets > 0 && totalTickets <= spot.available
          //                 ? selectedSpot === spot.area
          //                   ? "bg-gray-500 text-gray-50 border-gray-400 hover:bg-gray-500 hover:border-gray-400"
          //                   : "bg-neutral text-gray-50 border-gray-600 hover:bg-gray-600 hover:border-gray-500"
          //                 : "btn-disabled"
          //             } font-medium text-base rounded py-1 px-4 w-fit border  `}
          //             onClick={() => selectSpot(spot.area)}
          //           >
          //             {spot.area}
          //           </button>
          //         </div>
          //         <p className="text-gray-400 text-sm font-medium">
          //           {spot.available === 1
          //             ? "1 Spot"
          //             : `${spot.available} Spots`}
          //         </p>
          //       </li>
          //     ))}
          //   </ul>
          // </div>
        )}
      </div>
    </div>
  );
}

export default TicketAndCamp;
