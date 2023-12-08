"use client";
import { useState, useEffect } from "react";
import TicketAndCamp from "@/components/TicketAndCamp";
import Link from "next/link";
import {
  IconCash,
  IconFlag,
  IconInfoCircle,
  IconTicket,
  IconTrees,
  IconVip,
  IconMinus,
  IconPlus,
  IconTent,
  IconBuildingCircus,
} from "@tabler/icons-react";
import Payment from "@/components/Payment";
import { url } from "/config";

function Booking() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [regularTickets, setRegularTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [ticketHolders, setTicketHolders] = useState({
    regular: new Array(regularTickets).fill(""),
    vip: new Array(vipTickets).fill(""),
  });

  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [allChoices, setAllChoices] = useState({});

  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const [twoPersonTents, setTwoPersonTents] = useState(0);
  const [threePersonTents, setThreePersonTents] = useState(0);
  const [greenCamping, setGreenCamping] = useState(false);

  const [reservationId, setReservationId] = useState(null);

  const [countdown, setCountdown] = useState(300);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  const [ticketsReserved, setTicketsReserved] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [displayToast, setDisplayToast] = useState(false);

  const updateTickets = (type, operation) => {
    if (ticketsReserved === true) {
      setIsModalOpen(true);
      return;
    }
    const isVip = type === "vip";
    const currentTickets = isVip ? vipTickets : regularTickets;
    if (
      operation === "increase" ||
      (operation === "decrease" && currentTickets > 0)
    ) {
      const newTickets =
        operation === "increase" ? currentTickets + 1 : currentTickets - 1;
      const setTickets = isVip ? setVipTickets : setRegularTickets;
      setTickets(newTickets);
    }
  };

  function updateTents(type, operation) {
    const currentTents = type === "two" ? twoPersonTents : threePersonTents;
    if (
      operation === "increase" ||
      (operation === "decrease" && currentTents > 0)
    ) {
      const newTents =
        operation === "increase" ? currentTents + 1 : currentTents - 1;
      const setTents = type === "two" ? setTwoPersonTents : setThreePersonTents;
      setTents(newTents);
    }
  }

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
        console.log("Success:", data);
        setTicketsReserved(true);
        setReservationId(data.id);
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 3800);
        setCountdownInterval(
          setInterval(() => {
            setCountdown((prevCountdown) => {
              if (prevCountdown > 0) {
                let minutes = Math.floor(prevCountdown / 60);
                let seconds = prevCountdown % 60;
                setMinutes(minutes);
                setSeconds(seconds);
                return prevCountdown - 1;
              } else {
                setTicketsReserved(false);
                setSelectedSpot(null);
                setTicketHolders({ regular: [], vip: [] });
                clearInterval(countdownInterval);
                setMinutes(5);
                setSeconds(0);
                window.location.reload();
                return 0;
              }
            });
          }, 1000)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fulfillReservation() {
    fetch(`${url}/fullfill-reservation`, {
      method: "POST",
      body: {
        id: reservationId,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setPaymentSuccess(true);
        resetCountdown();
      })
      .catch((error) => {
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
    setSelectedSpot(null);
    setTicketHolders({ regular: [], vip: [] });
  }

  useEffect(() => {
    const selectedSpotDetails = spots.find(
      (spot) => spot.area === selectedSpot
    );

    if (
      (selectedSpotDetails && totalTickets > selectedSpotDetails.available) ||
      totalTickets === 0
    ) {
      if (!reservationId) {
        setSelectedSpot(null);
      }
      if (totalTickets > 0) {
        setDisplayToast(true); // Show the toast
      } else {
        setDisplayToast(false); // Hide the toast
      }
    }
  }, [totalTickets, selectedSpot, spots, reservationId]);

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

  // Update the choices object whenever the user changes their choices
  useEffect(() => {
    let bookingFee = 99;
    let totalPrice =
      regularTickets * 799 +
      vipTickets * 1299 +
      bookingFee +
      twoPersonTents * 299 +
      threePersonTents * 399;
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
      twoPersonTents: twoPersonTents,
      threePersonTents: threePersonTents,
      ticketHolders: ticketHolders,
      reservationId: reservationId,
    });
  }, [
    regularTickets,
    vipTickets,
    selectedSpot,
    greenCamping,
    totalTickets,
    twoPersonTents,
    threePersonTents,
    ticketHolders,
    reservationId,
  ]);

  useEffect(() => {
    console.log(allChoices);
  }, [allChoices]);

  return (
    <main className="md:container mx-auto  flex flex-col justify-center items-center h-screen w-screen">
      {displayToast === true && (
        <div class="toast toast-center">
          <div class="alert alert-error">
            <span>Not enough available spots! Please select a new camp.</span>
          </div>
        </div>
      )}
      <dialog
        id="my_modal_1"
        className={isModalOpen ? "modal modal-open " : "modal"}
      >
        <div className="modal-box bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">
            Changing your order will reset your reservation. <br></br>Are you
            sure you want to continue?
          </p>
          <div className="modal-action font-medium">
            <button
              className="btn btn-neutral font-medium text-base rounded py-1 px-4 w-fit"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary font-medium text-emerald-100 text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400"
              onClick={handleModalConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
      <section className="w-full h-full md:h-5/6 bg-gray-900 max-w-7xl flex flex-col md:flex-row md:rounded-xl overflow-hidden md:border border-gray-700 border-opacity-60 relative">
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
              setSelectedSpot={setSelectedSpot}
              ticketsReserved={ticketsReserved}
            />
          )) ||
            (currentSlide === 1 && (
              <div className=" h-full flex flex-col justify-between">
                <h1 className="font-medium text-lg">Tents & Options</h1>
                <div className="flex flex-col justify-evenly flex-grow">
                  <div className="place-self-center flex flex-col gap-12">
                    <div className="flex items-center gap-5 justify-end">
                      <div className="font-medium text-end">
                        <h2 className="text-gray-400 whitespace-nowrap">
                          2 Person Tent
                        </h2>
                        <p>299 DKK</p>
                      </div>
                      <div className="flex items-center w-32 justify-between font-medium">
                        <button
                          className="bg-neutral text-gray-100 font-medium text-base p-2 rounded-full w-fit border border-gray-500 hover:bg-gray-600 hover:border-gray-500 transition-colors"
                          onClick={() => updateTents("two", "decrease")}
                        >
                          <IconMinus />
                        </button>
                        <p>{twoPersonTents}</p>

                        <button
                          className={`  font-medium text-base p-2 rounded-full w-fit border transition-colors ${
                            totalTickets >= 8
                              ? "btn-disabled bg-gray-800 border-gray-800 stroke-gray-800"
                              : "bg-primary text-emerald-100 border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 "
                          }`}
                          onClick={() => updateTents("two", "increase")}
                        >
                          <IconPlus />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 justify-end">
                      <div className="font-medium text-end">
                        <h2 className="text-gray-400 whitespace-nowrap">
                          3 Person Tent
                        </h2>
                        <p>399 DKK</p>
                      </div>
                      <div className="flex items-center w-32 justify-between font-medium">
                        <button
                          className="bg-neutral text-gray-100 font-medium text-base p-2 rounded-full w-fit border border-gray-500 hover:bg-gray-600 hover:border-gray-500 transition-colors"
                          onClick={() => updateTents("three", "decrease")}
                        >
                          <IconMinus />
                        </button>
                        <p>{threePersonTents}</p>

                        <button
                          className={`  font-medium text-base p-2 rounded-full w-fit border transition-colors ${
                            totalTickets >= 8
                              ? "btn-disabled bg-gray-800 border-gray-800 stroke-gray-800"
                              : "bg-primary text-emerald-100 border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 "
                          }`}
                          onClick={() => updateTents("three", "increase")}
                        >
                          <IconPlus />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-5  justify-end">
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
                    <form className=" w-full space-y-5">
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
                                onChange={(e) => {
                                  let newRegularTicketHolders = [
                                    ...ticketHolders.regular,
                                  ];
                                  newRegularTicketHolders[i] = e.target.value;
                                  const newTicketHolders = {
                                    ...ticketHolders,
                                    regular: newRegularTicketHolders,
                                  };
                                  setTicketHolders(newTicketHolders);
                                }}
                                value={ticketHolders.regular[i] || ""}
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
                                onChange={(e) => {
                                  let newVipTicketHolders = [
                                    ...ticketHolders.vip,
                                  ];
                                  newVipTicketHolders[i] = e.target.value;
                                  const newTicketHolders = {
                                    ...ticketHolders,
                                    vip: newVipTicketHolders,
                                  };
                                  setTicketHolders(newTicketHolders);
                                }}
                                value={ticketHolders.vip[i] || ""}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )) ||
            (currentSlide === 3 && <Payment />)}

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
                totalTickets > 0 &&
                selectedSpot &&
                !(
                  currentSlide === 2 &&
                  ticketHolders.regular.filter(Boolean).length +
                    ticketHolders.vip.filter(Boolean).length !==
                    totalTickets
                )
                  ? "bg-primary text-emerald-100"
                  : "btn-disabled"
              } font-medium text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 `}
              onClick={() => {
                if (
                  totalTickets > 0 &&
                  selectedSpot &&
                  !(
                    currentSlide === 2 &&
                    ticketHolders.regular.filter(Boolean).length +
                      ticketHolders.vip.filter(Boolean).length !==
                      totalTickets
                  )
                ) {
                  if (currentSlide === 3) {
                    fulfillReservation();
                  }
                  handleContinue();
                }
              }}
            >
              {currentSlide === 3 ? "Finish Payment" : "Continue"}
            </button>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-70 h-24 md:h-full w-full md:w-5/12 flex flex-row md:flex-col justify-between items-baseline md:items-start gap-5 order-1 md:order-2 md:border-l border-l-gray-700 border-opacity-60 p-6 md:p-12">
          <div className="space-y-5">
            <h1 className="font-medium text-lg whitespace-nowrap">
              Order Summary
            </h1>
            <div className="space-y-5 font-medium hidden md:block">
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
              {regularTickets > 0 && (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-600 border border-gray-500 p-2 ">
                    <IconTicket />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400">Regular Tickets</p>
                    <p className="text-gray-50">
                      <span>
                        799 DKK{" "}
                        <span className="text-gray-400">
                          * {regularTickets}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              )}
              {vipTickets > 0 && (
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
              )}

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
              {greenCamping && (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-600 border border-gray-500 p-2">
                    <IconTrees />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400">Green Camping</p>
                    <p className="text-gray-50">
                      <span>249 DKK</span>
                    </p>
                  </div>
                </div>
              )}
              {twoPersonTents > 0 && (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-600 border border-gray-500 p-2">
                    <IconTent />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400">2 Person Tents</p>
                    <p className="text-gray-50">
                      <span>
                        299 DKK{" "}
                        <span className="text-gray-400">
                          * {twoPersonTents}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              )}
              {threePersonTents > 0 && (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-600 border border-gray-500 p-2">
                    <IconBuildingCircus />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400">3 Person Tents</p>
                    <p className="text-gray-50">
                      <span>
                        399 DKK{" "}
                        <span className="text-gray-400">
                          * {threePersonTents}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-fit space-y-5 ">
            <div className=" divider mt-0 hidden md:flex "></div>

            {ticketsReserved && (
              <div
                className={`hidden md:block font-medium ${
                  isPulsing ? " animate-pulse" : ""
                }`}
              >
                <p className="text-gray-400">
                  {totalTickets > 1 ? "Tickets Reserved" : "Ticket Reserved"}
                </p>
                <span className="countdown">
                  <span style={{ "--value": minutes }}> :</span>
                </span>
                <span>:</span>
                <span className="countdown">
                  <span style={{ "--value": seconds }}></span>
                </span>
              </div>
            )}
            <div className="font-medium flex flex-row md:flex-col gap-2 md:gap-0">
              <p className="text-gray-400">Total</p>
              <p>{totalPrice} DKK</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Booking;
