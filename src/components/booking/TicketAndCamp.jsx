import { IconMinus, IconPlus, IconTicket } from "@tabler/icons-react";
import CampMap from "../CampMap";
import { useState } from "react";

const TicketOption = ({
  ticketType,
  ticketPrice,
  ticketCount,
  updateTickets,
  totalTickets,
}) => (
  <div className="flex items-center gap-6 w-60 justify-end">
    <div className="font-medium text-end">
      <h2 className="text-gray-400">{ticketType}</h2>
      <p>{ticketPrice}</p>
    </div>
    <div className="flex items-center w-32 justify-between font-medium">
      <button
        className="bg-neutral text-gray-100 font-medium text-base p-2 rounded-full w-fit border border-gray-500 hover:bg-gray-600 hover:border-gray-500 transition-colors"
        onClick={() => updateTickets(ticketType.toLowerCase(), "decrease")}
      >
        <IconMinus />
      </button>
      <p>{ticketCount}</p>
      <button
        className={`  font-medium text-base p-2 rounded-full w-fit border transition-colors ${
          totalTickets >= 8
            ? "btn-disabled bg-gray-800 border-gray-800 stroke-gray-800"
            : "bg-primary text-emerald-100 border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 "
        }`}
        onClick={() =>
          totalTickets < 8 &&
          updateTickets(ticketType.toLowerCase(), "increase")
        }
      >
        <IconPlus />
      </button>
    </div>
  </div>
);

function TicketAndCamp({
  regularTickets,
  vipTickets,
  totalTickets,
  spots,
  selectedSpot,
  setSelectedSpot,
  updateTickets,
  setSelectedCamp,
  selectedCamp,
  mapHandleModal,
  reservationId,
  warningCamp,
}) {
  function chooseSpot(selectedCamp) {
    const selectedSpotDetails = spots.find(
      (spot) => spot.area === selectedCamp
    );

    if (reservationId) {
      return;
    } else if (
      selectedSpotDetails.available === 0 ||
      totalTickets > selectedSpotDetails.available
    ) {
      console.log(selectedCamp);
      setSelectedSpot(null);
      setSelectedCamp(null);
    } else {
      setSelectedSpot(selectedCamp);
    }
  }

  return (
    <div className=" h-full flex flex-col justify-between">
      <div className="flex gap-2 items-center mt-4 md:mt-0">
        <IconTicket />
        <h1 className="font-medium text-lg">Tickets & Camp</h1>
      </div>
      <div className="flex flex-col justify-evenly flex-grow">
        <div className="place-self-center flex flex-col gap-4">
          <div className="space-y-12">
            <TicketOption
              ticketType="Regular"
              ticketPrice="799 DKK"
              ticketCount={regularTickets}
              updateTickets={updateTickets}
              totalTickets={totalTickets}
            />
            <TicketOption
              ticketType="VIP"
              ticketPrice="1299 DKK"
              ticketCount={vipTickets}
              updateTickets={updateTickets}
              totalTickets={totalTickets}
            />
          </div>
          <div className="font-medium text-sm text-gray-500 place-self-end flex flex-col items-end">
            <p>Total Tickets</p>
            <p>{totalTickets}</p>
          </div>
        </div>
        {warningCamp && (
          <div role="alert" className="alert shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold">Not enough available spots!</h3>
              <div className="text-xs">Please choose a new camp area</div>
            </div>
          </div>
        )}
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
            className="aspect-[3/2] w-full md:col-start-2 md:col-end-4 md:aspect-[2.25/1]"
            mapHandleModal={mapHandleModal}
            reservationId={reservationId}
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
