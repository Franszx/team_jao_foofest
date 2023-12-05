"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Booking() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [regularTickets, setRegularTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(99);
  const [allChoices, setAllChoices] = useState({});

  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const updateTickets = (type, operation) => {
    const isVip = type === "vip";
    const currentTickets = isVip ? vipTickets : regularTickets;
    const price = isVip ? 1299 : 799;

    if (
      operation === "increment" ||
      (operation === "decrement" && currentTickets > 0)
    ) {
      const newTickets =
        operation === "increment" ? currentTickets + 1 : currentTickets - 1;
      const setTickets = isVip ? setVipTickets : setRegularTickets;
      setTickets(newTickets);
      const newTotalTickets =
        totalTickets + (operation === "increment" ? 1 : -1);
      setTotalTickets(newTotalTickets);
      setAllChoices({
        ...allChoices,
        [type + "Tickets"]: newTickets,
        totalTickets: newTotalTickets,
      });
      if (totalPrice > 99 || operation === "increment") {
        setTotalPrice(
          totalPrice + (operation === "increment" ? price : -price)
        );
      }
    }
  };

  function changeSlide(direction) {
    if (direction === "next") {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === "prev" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }

  function selectSpot(spot) {
    setSelectedSpot(spot);
    setAllChoices({ ...allChoices, spot });
  }

  useEffect(() => {
    const selectedSpotDetails = spots.find(
      (spot) => spot.area === selectedSpot
    );
    if (
      (selectedSpotDetails && totalTickets > selectedSpotDetails.available) ||
      totalTickets === 0
    ) {
      setSelectedSpot(null);
      setAllChoices((prevChoices) => {
        const newChoices = { ...prevChoices };
        delete newChoices.spot;
        return newChoices;
      });
    }
  }, [totalTickets, selectedSpot, spots]);

  useEffect(() => {
    console.log(allChoices);
  }, [allChoices]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchSpots = () => {
      fetch("http://localhost:8080/available-spots")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSpots(data);
        });
    };
    fetchSpots();
    const interval = setInterval(fetchSpots, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="md:container mx-auto  flex flex-col justify-center items-center h-screen w-screen">
      <section
        className="w-full h-full md:h-5/6 bg-gray-900 max-w-7xl flex flex-col md:flex-row md:rounded-xl overflow-hidden md:border border-gray-700 border-opacity-60"
        data-aos="fade-up"
      >
        <div className="bg-gray-900 w-full md:w-7/12 h-full order-2 md:order-1 p-6 md:p-12 flex flex-col justify-between">
          <h1 className="font-medium text-lg">Tickets & Camp</h1>
          <div className="place-self-center flex flex-col gap-4">
            <div className="space-y-12">
              <div className="flex items-center gap-6 w-60 justify-end">
                <div className="font-medium text-end">
                  <h2 className="text-gray-400">Regular</h2>
                  <p>799 DKK</p>
                </div>
                <div className="flex items-center w-32 justify-between font-medium">
                  <button
                    className="bg-primary text-emerald-100 font-medium text-base p-2 rounded-full w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 transition-colors"
                    onClick={() => updateTickets("regular", "decrement")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-minus"
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
                  <button
                    className="bg-primary text-emerald-100 font-medium text-base p-2 rounded-full w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 transition-colors"
                    onClick={() => updateTickets("regular", "increment")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-plus"
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
              <div className="flex items-center gap-6 w-60 justify-end">
                <div className="font-medium text-end">
                  <h2 className="text-gray-400">VIP</h2>
                  <p>1299 DKK</p>
                </div>
                <div className="flex items-center w-32 justify-between font-medium">
                  <button
                    className="bg-primary text-emerald-100 font-medium text-base p-2 rounded-full w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 transition-colors"
                    onClick={() => updateTickets("vip", "decrement")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-minus"
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
                  <button
                    className="bg-primary text-emerald-100 font-medium text-base p-2 rounded-full w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 transition-colors"
                    onClick={() => updateTickets("vip", "increment")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-plus"
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
            <div className="font-medium text-sm text-gray-500 place-self-end flex flex-col items-end">
              <p>Total Tickets</p>
              <p>{totalTickets}</p>
            </div>
          </div>
          <div>
            <ul className="flex flex-wrap items-center justify-around gap-4">
              {spots.map((spot) => (
                <li key={spot.area}>
                  <div className="flex flex-col justify-start gap-1">
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
          <div className="place-self-end space-x-6">
            <button
              className="text-gray-500 hover:text-gray-400 transition-colors font-medium"
              onClick={() => changeSlide("prev")}
            >
              Back
            </button>
            <button
              className={`btn ${
                totalTickets > 0 && selectedSpot
                  ? "bg-primary text-emerald-100"
                  : "btn-disabled"
              } font-medium text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 `}
              onClick={() => {
                if (totalTickets > 0 && selectedSpot) {
                  changeSlide("next");
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-70 h-24 md:h-full w-full md:w-5/12 flex flex-row md:flex-col justify-start items-center md:items-start gap-6 order-1 md:order-2 md:border-l border-l-gray-700 border-opacity-60 p-6 md:p-12">
          <h1 className="font-medium text-lg">Order Summary</h1>
          <div className="space-y-6 font-medium hidden md:block">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-600 border border-gray-500 p-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-cash"
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
                  <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                  <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-400">Booking Fee</p>
                <p className="text-gray-50">
                  <span>99</span> DKK
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-600 border border-gray-500 p-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-ticket"
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
                  <path d="M15 5l0 2" />
                  <path d="M15 11l0 2" />
                  <path d="M15 17l0 2" />
                  <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-400">Regular Tickets</p>
                <p className="text-gray-50">
                  <span>
                    799 DKK{" "}
                    <span className="text-gray-400">* {regularTickets}</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-600 border border-gray-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-vip"
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
                  <path d="M3 5h18" />
                  <path d="M3 19h18" />
                  <path d="M4 9l2 6h1l2 -6" />
                  <path d="M12 9v6" />
                  <path d="M16 15v-6h2a2 2 0 1 1 0 4h-2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-400">VIP Tickets</p>
                <p className="text-gray-50">
                  <span>
                    1299 DKK{" "}
                    <span className="text-gray-400">* {vipTickets}</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-600 border border-gray-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-tent"
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
                  <path d="M11 14l4 6h6l-9 -16l-9 16h6l4 -6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-400">Selected Camp</p>
                <p className="text-gray-50">
                  <span>
                    {selectedSpot ? selectedSpot : "No camp selected"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className=" divider hidden md:flex "></div>
          <div className="font-medium flex flex-row md:flex-col gap-2 md:gap-0">
            <p className="text-gray-400">Total</p>
            <p>{totalPrice} DKK</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Booking;
