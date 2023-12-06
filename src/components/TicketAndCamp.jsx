function TicketAndCamp({
  regularTickets,
  vipTickets,
  totalTickets,
  spots,
  selectedSpot,
  updateTickets,
  selectSpot,
}) {
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-minus"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                  </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`icon icon-tabler icon-tabler-plus ${
                        totalTickets >= 8 ? "stroke-gray-600" : "stroke-gray-50"
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-minus"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                  </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`icon icon-tabler icon-tabler-plus ${
                        totalTickets >= 8 ? "stroke-gray-600" : "stroke-gray-50"
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
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
          <div className="w-full flex justify-center items-center h-24">
            <div className="loading loading-ring loading-xl"></div>
          </div>
        ) : (
          <div>
            <ul className="flex flex-wrap items-center justify-around gap-4 h-24">
              {spots.map((spot) => (
                <li key={spot.area}>
                  <div className="flex flex-col justify-start gap-1 mb-4">
                    <div
                      className={`${
                        totalTickets > 0 &&
                        (spot.available === 0 || totalTickets > spot.available)
                          ? "tooltip tooltip-accent"
                          : ""
                      }`}
                      data-tip={
                        spot.available === 0
                          ? "No more spots"
                          : totalTickets > spot.available
                          ? "Not enough room"
                          : ""
                      }
                    >
                      <button
                        className={`btn ${
                          totalTickets > 0 && totalTickets <= spot.available
                            ? selectedSpot === spot.area
                              ? "bg-gray-500 text-gray-50 border-gray-400 hover:bg-gray-500 hover:border-gray-400"
                              : "bg-neutral text-gray-50 border-gray-600 hover:bg-gray-600 hover:border-gray-500"
                            : "btn-disabled"
                        } font-medium text-base rounded py-1 px-4 w-fit border  `}
                        onClick={() => selectSpot(spot.area)}
                      >
                        {spot.area}
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">
                      {spot.available === 1
                        ? "1 Spot"
                        : `${spot.available} Spots`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketAndCamp;
