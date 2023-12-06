"use client";
import { useState, useEffect } from "react";
import TicketAndCamp from "@/components/TicketAndCamp";
import Link from "next/link";

function Booking() {
  const url = "http://localhost:8080";
  const [currentSlide, setCurrentSlide] = useState(0);

  const [regularTickets, setRegularTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(99);

  const [allChoices, setAllChoices] = useState({});

  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const [countdown, setCountdown] = useState(300);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const [ticketsReserved, setTicketsReserved] = useState(false);

  // Function to update the number of tickets
  const updateTickets = (type, operation) => {
    // Check if the ticket type is VIP
    const isVip = type === "vip";
    // Get the current number of tickets based on the type
    const currentTickets = isVip ? vipTickets : regularTickets;
    // Set the price based on the ticket type
    const price = isVip ? 1299 : 799;

    // Check if the operation is to increase the number of tickets or decrease when there are tickets
    if (
      operation === "increase" ||
      (operation === "decrease" && currentTickets > 0)
    ) {
      // Calculate the new number of tickets based on the operation
      const newTickets =
        operation === "increase" ? currentTickets + 1 : currentTickets - 1;
      // Get the function to set the number of tickets based on the type
      const setTickets = isVip ? setVipTickets : setRegularTickets;
      // Update the number of tickets
      setTickets(newTickets);
      // Calculate the new total number of tickets based on the operation
      const newTotalTickets =
        totalTickets + (operation === "increase" ? 1 : -1);
      // Update the total number of tickets
      setTotalTickets(newTotalTickets);
      // Update the choices with the new number of tickets
      setAllChoices({
        ...allChoices,
        [type + "Tickets"]: newTickets,
        totalTickets: newTotalTickets,
      });
      // Check if the total price is greater than 99 or the operation is to increase the number of tickets
      if (totalPrice > 99 || operation === "increase") {
        // Update the total price based on the operation and the price of the ticket
        setTotalPrice(totalPrice + (operation === "increase" ? price : -price));
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

  function handleContinue() {
    if (currentSlide === 0) {
      changeSlide("next");
      reserveSpot();
    }
  }

  function selectSpot(spot) {
    setSelectedSpot(spot);
    setAllChoices({ ...allChoices, spot });
  }

  // This function is used to reserve a spot.
  function reserveSpot() {
    // It sends a PUT request to the server with the selected spot and the total number of tickets.
    if (ticketsReserved) {
      return;
    }

    fetch(`${url}/reserve-spot`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: selectedSpot,
        amount: totalTickets,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the request is successful, it logs the response data,
        // sets the ticketsReserved state to true,
        // and starts a countdown interval.
        console.log("Success:", data);
        setTicketsReserved(true);
        setCountdownInterval(
          setInterval(() => {
            // The countdown interval decreases the countdown state by 1 every second.
            // When the countdown reaches 0, it clears the interval.
            // It also updates the 'minutes' and 'seconds' states.
            setCountdown((prevCountdown) => {
              if (prevCountdown > 0) {
                let minutes = Math.floor(prevCountdown / 60);
                let seconds = prevCountdown % 60;
                setMinutes(minutes);
                setSeconds(seconds);
                return prevCountdown - 1;
              } else {
                clearInterval(countdownInterval);
                setMinutes(5);
                setSeconds(0);
                return 0;
              }
            });
          }, 1000)
        );
      })
      .catch((error) => {
        // If there is an error, it logs the error.
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    console.log(countdown);
  }, [countdown]);

  // This effect hook is used to check if the selected spot can accommodate the total tickets.
  // If the selected spot cannot accommodate the total tickets or if the total tickets is zero,
  // it will reset the selected spot and remove the spot from all choices.
  useEffect(() => {
    // Find the details of the selected spot from the spots array.
    const selectedSpotDetails = spots.find(
      (spot) => spot.area === selectedSpot
    );
    // Check if the selected spot can accommodate the total tickets or if the total tickets is zero.
    if (
      (selectedSpotDetails && totalTickets > selectedSpotDetails.available) ||
      totalTickets === 0
    ) {
      // If the selected spot cannot accommodate the total tickets or if the total tickets is zero,
      // reset the selected spot and remove the spot from all choices.
      setSelectedSpot(null);
      setAllChoices((prevChoices) => {
        const newChoices = { ...prevChoices };
        delete newChoices.spot;
        return newChoices;
      });
    }
  }, [totalTickets, selectedSpot, spots]);

  // This effect hook is used to fetch the available spots from the server.
  // It runs once when the component mounts and then every 30 seconds.
  useEffect(() => {
    // Define a function to fetch the available spots from the server.
    const fetchSpots = () => {
      fetch(`${url}/available-spots`)
        .then((res) => res.json())
        .then((data) => {
          // Update the state with the fetched spots.
          setSpots(data);
        });
    };
    // Call the fetchSpots function immediately when the component mounts.
    fetchSpots();
    // Set an interval to call the fetchSpots function every 30 seconds.
    const interval = setInterval(fetchSpots, 30);
    // Clean up the interval when the component unmounts.
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="md:container mx-auto  flex flex-col justify-center items-center h-screen w-screen">
      <section className="w-full h-full md:h-5/6 bg-gray-900 max-w-7xl flex flex-col md:flex-row md:rounded-xl overflow-hidden md:border border-gray-700 border-opacity-60">
        <div className="bg-gray-900 w-full md:w-7/12 h-full order-2 md:order-1 p-6 md:p-12 flex flex-col justify-between">
          {(currentSlide === 0 && (
            <TicketAndCamp
              regularTickets={regularTickets}
              vipTickets={vipTickets}
              totalTickets={totalTickets}
              spots={spots}
              selectedSpot={selectedSpot}
              updateTickets={updateTickets}
              selectSpot={selectSpot}
              ticketsReserved={ticketsReserved}
            />
          )) ||
            (currentSlide === 1 && (
              <div className=" h-full flex flex-col justify-between">
                <h1 className="font-medium text-lg">Tickets Holders</h1>
                <div className="flex flex-col justify-evenly flex-grow">
                  <div className="place-self-center flex flex-col gap-4">
                    <form className=" w-full space-y-6">
                      {regularTickets > 0 && (
                        <div>
                          <h2 className="mb-3 font-medium text-lg">
                            Regular Ticket Holders
                          </h2>
                          <div className="flex flex-col gap-3">
                            {[...Array(regularTickets)].map((_, i) => (
                              <input
                                key={i}
                                type="text"
                                placeholder={`Regular Ticket ${i + 1}`}
                                className="input input-bordered bg-neutral w-full"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {vipTickets > 0 && (
                        <div>
                          <h2 className="mb-3 font-medium text-lg">
                            VIP Ticket Holders
                          </h2>
                          <div className="flex flex-col gap-3">
                            {[...Array(vipTickets)].map((_, i) => (
                              <input
                                key={i}
                                type="text"
                                placeholder={`VIP Ticket ${i + 1}`}
                                className="input input-bordered bg-neutral w-full"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            ))}
          <div className="place-self-end space-x-6">
            {currentSlide === 0 ? (
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-400 transition-colors font-medium"
              >
                Back
              </Link>
            ) : (
              <button
                className="text-gray-500 hover:text-gray-400 transition-colors font-medium"
                onClick={() => changeSlide("prev")}
              >
                Back
              </button>
            )}
            <button
              className={`btn ${
                totalTickets > 0 && selectedSpot
                  ? "bg-primary text-emerald-100"
                  : "btn-disabled"
              } font-medium text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 `}
              onClick={() => {
                if (totalTickets > 0 && selectedSpot) {
                  handleContinue();
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
                  class="icon icon-tabler icon-tabler-flag"
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
                  <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
                  <path d="M5 21v-7" />
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
          <div className=" divider hidden md:flex"></div>
          <div className="font-medium flex flex-row md:flex-col gap-2 md:gap-0">
            <p className="text-gray-400">Total</p>
            <p>{totalPrice} DKK</p>
          </div>
          {ticketsReserved && (
            <div className="font-medium">
              <p className="text-gray-400">Tickets Reserved</p>
              <span class="countdown">
                <span style={{ "--value": minutes }}> :</span>
              </span>
              <span>:</span>
              <span class="countdown">
                <span style={{ "--value": seconds }}></span>
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Booking;
