"use client";
import { useState, useEffect } from "react";
import TicketAndCamp from "@/components/TicketAndCamp";
import Link from "next/link";
import {
  IconCash,
  IconFlag,
  IconInfoCircle,
  IconTicket,
  IconVip,
} from "@tabler/icons-react";

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

  const [greenCamping, setGreenCamping] = useState(false);

  const [countdown, setCountdown] = useState(300);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  const [ticketsReserved, setTicketsReserved] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to update the number of tickets
  const updateTickets = (type, operation) => {
    if (ticketsReserved === true) {
      setIsModalOpen(true);
      return;
    }
    // Check if the ticket type is VIP
    const isVip = type === "vip";
    // Get the current number of tickets based on the type
    const currentTickets = isVip ? vipTickets : regularTickets;
    // Set the price based on the ticket type

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
    } else {
      changeSlide("next");
    }
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalConfirm() {
    resetCountdown();
    setIsModalOpen(false);
  }

  function selectSpot(spot) {
    if (ticketsReserved === true) {
      setIsModalOpen(true);
    } else {
      setSelectedSpot(spot);
    }
  }

  // This function is used to reserve a spot.
  function reserveSpot() {
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
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 4000);
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

  function resetCountdown() {
    setCountdown(300);
    setMinutes(5);
    setSeconds(0);
    clearInterval(countdownInterval);
    setCountdownInterval(null);
    setTicketsReserved(false);
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
    }
  }, [totalTickets, selectedSpot, spots]);

  useEffect(() => {
    const fetchSpots = () => {
      fetch(`${url}/available-spots`)
        .then((res) => res.json())
        .then((data) => {
          setSpots(data);
        });
    };
    fetchSpots();
    const interval = setInterval(fetchSpots, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let totalPrice = regularTickets * 799 + vipTickets * 1299;
    setTotalTickets(regularTickets + vipTickets);
    if (greenCamping) {
      totalPrice += 249;
    }
    setTotalPrice(totalPrice);
    setAllChoices({
      regularTickets: regularTickets,
      vipTickets: vipTickets,
      totalTickets: totalTickets,
      area: selectedSpot,
      greenCamping: greenCamping,
      totalPrice: totalPrice,
    });
  }, [regularTickets, vipTickets, selectedSpot, greenCamping, totalTickets]);

  useEffect(() => {
    console.log(allChoices);
  }, [allChoices]);

  return (
    <main className="md:container mx-auto  flex flex-col justify-center items-center h-screen w-screen">
      <dialog
        id="my_modal_1"
        className={isModalOpen ? "modal modal-open" : "modal"}
      >
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">
            Changing this will reset your reservation. Are you sure you want to
            continue?
          </p>
          <div className="modal-action font-medium">
            <button className="btn btn-neutral" onClick={handleModalClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleModalConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </dialog>
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
                <h1 className="font-medium text-lg">Tents & Options</h1>
                <div className="flex flex-col justify-evenly flex-grow">
                  <div className="place-self-center flex flex-col gap-4">
                    <div className="flex items-center gap-6 w-60 justify-end">
                      <div className="font-medium text-end space-y-1">
                        <div className="flex gap-1">
                          <h2 className="text-gray-400">Green Camping</h2>
                          <div
                            className="tooltip"
                            data-tip="
                        Support the environment by choosing a green camping spot.
                        "
                          >
                            <IconInfoCircle color="rgb(156 163 175)" />
                          </div>
                        </div>
                        <p>249 DKK</p>
                      </div>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        onChange={() => setGreenCamping(!greenCamping)}
                        checked={greenCamping}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )) ||
            (currentSlide === 2 && (
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
                <IconCash />
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
                <IconTicket />
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
                <IconVip />
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
                <IconFlag />
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
            <div className={`font-medium ${isPulsing ? " animate-pulse" : ""}`}>
              <p className="text-gray-400">
                {totalTickets > 1 ? "Tickets Reserved" : "Ticket Reserved"}
              </p>
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
