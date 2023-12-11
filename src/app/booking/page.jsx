"use client";
import { useState, useEffect } from "react";
import { sendMail } from "@/utils/sendMail";

import { TentOptions } from "@/components/booking/TentOptions";
import TicketAndCamp from "@/components/booking/TicketAndCamp";
import TicketHolders from "@/components/booking/TicketHolders";
import Payment from "@/components/booking/Payment";
import PaymentStatus from "@/components/booking/PaymentStatus";
import OrderSummary from "@/components/booking/OrderSummary";
import BackAndContinueButtons from "@/components/booking/BackAndContinueButtons";

import { url } from "/config";

function Page() {
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
	const [selectedCamp, setSelectedCamp] = useState(null);

	const [twoPersonTents, setTwoPersonTents] = useState(0);
	const [threePersonTents, setThreePersonTents] = useState(0);
	const [greenCamping, setGreenCamping] = useState(false);
	const [totalSelectedCapacity, setTotalSelectedCapacity] = useState(0);

	const [email, setEmail] = useState("");

	const [reservationId, setReservationId] = useState(null);

	const [countdown, setCountdown] = useState(300);
	const [countdownInterval, setCountdownInterval] = useState(null);
	const [minutes, setMinutes] = useState(5);
	const [seconds, setSeconds] = useState(0);
	const [isPulsing, setIsPulsing] = useState(false);

	const [ticketsReserved, setTicketsReserved] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [paymentSuccess, setPaymentSuccess] = useState(false);

	function sendMailToCustomer() {
		const mailContent = {
			to: email,
			subject: "Order confirmation",
			html: {
				numRegular: allChoices.regularTickets,
				numVip: allChoices.vipTickets,
				campArea: allChoices.area,
				numTwoTent: allChoices.twoPersonTents,
				numThreeTent: allChoices.threePersonTents,
				greenCamping: allChoices.greenCamping ? "Yes" : "No",
				totalPrice: allChoices.totalPrice,
			},
			company: "FooFest - Festival",
			sendername: "FooFest Customer Support",
			template: "foofest-template",
		};
		sendMail(mailContent);
	}

	// Function to update the number of tickets
	const updateTickets = (type, operation) => {
		// Check if tickets are already reserved
		if (ticketsReserved) {
			setIsModalOpen(true);
			return;
		}
		// Determine if the ticket type is VIP
		const isVip = type === "vip";
		const currentTickets = isVip ? vipTickets : regularTickets;
		// Check if operation is valid
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

	// Function to update the number of tents
	const updateTents = (tentType, operation) => {
		const tentCapacity = tentType === "two" ? 2 : 3;
		const currentTents = tentType === "two" ? twoPersonTents : threePersonTents;
		// Check if operation is valid
		if (
			operation === "increase" &&
			totalSelectedCapacity + tentCapacity <= totalTickets
		) {
			const newTents = currentTents + 1;
			const setTents =
				tentType === "two" ? setTwoPersonTents : setThreePersonTents;
			setTents(newTents);
			setTotalSelectedCapacity((prevCapacity) => prevCapacity + tentCapacity);
		} else if (operation === "decrease" && currentTents > 0) {
			const newTents = currentTents - 1;
			const setTents =
				tentType === "two" ? setTwoPersonTents : setThreePersonTents;
			setTents(newTents);
			setTotalSelectedCapacity((prevCapacity) => prevCapacity - tentCapacity);
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

	function handleModalConfirm() {
		resetCountdown();
		setIsModalOpen(false);
		setSelectedCamp(null);
	}

	function mapHandleModal() {
		if (ticketsReserved === true) {
			setIsModalOpen(true);
		} else {
			return;
		}
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
				setSelectedCamp(null);
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
		const interval = setInterval(fetchSpots, 30000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const bookingFee = 99;
		const ticketPrice = regularTickets * 799 + vipTickets * 1299;
		const tentPrice = twoPersonTents * 299 + threePersonTents * 399;
		const greenCampingPrice = greenCamping ? 249 : 0;
		const totalPrice = ticketPrice + tentPrice + bookingFee + greenCampingPrice;

		setTotalTickets(regularTickets + vipTickets);
		setTotalPrice(totalPrice);

		setAllChoices({
			regularTickets,
			vipTickets,
			totalTickets,
			area: selectedSpot,
			greenCamping,
			totalPrice,
			twoPersonTents,
			threePersonTents,
			ticketHolders,
			reservationId,
			email,
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
		email,
		,
	]);

	return (
		<main className="md:container mx-auto  flex flex-col justify-center items-center h-screen w-screen">
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
							onClick={() => setIsModalOpen(false)}
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
				<div className="bg-gray-900 w-full  h-full order-2 md:order-1 p-6 md:p-12 flex flex-col justify-between">
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
							selectedCamp={selectedCamp}
							setSelectedCamp={setSelectedCamp}
							mapHandleModal={mapHandleModal}
						/>
					)) ||
						(currentSlide === 1 && (
							<TentOptions
								updateTents={updateTents}
								twoPersonTents={twoPersonTents}
								threePersonTents={threePersonTents}
								totalTickets={totalTickets}
								greenCamping={greenCamping}
								setGreenCamping={setGreenCamping}
								totalSelectedCapacity={totalSelectedCapacity}
								setTotalSelectedCapacity={setTotalSelectedCapacity}
							/>
						)) ||
						(currentSlide === 2 && (
							<TicketHolders
								regularTickets={regularTickets}
								vipTickets={vipTickets}
								ticketHolders={ticketHolders}
								setTicketHolders={setTicketHolders}
							/>
						)) ||
						(currentSlide === 3 && (
							<Payment email={email} setEmail={setEmail} />
						)) ||
						(currentSlide === 4 && (
							<PaymentStatus paymentSuccess={paymentSuccess} />
						))}

					<BackAndContinueButtons
						currentSlide={currentSlide}
						changeSlide={changeSlide}
						handleContinue={handleContinue}
						totalTickets={totalTickets}
						selectedSpot={selectedSpot}
						ticketHolders={ticketHolders}
						fulfillReservation={fulfillReservation}
						sendMailToCustomer={sendMailToCustomer}
						email={email}
					/>
				</div>
				{currentSlide !== 4 && (
					<OrderSummary
						allChoices={allChoices}
						currentSlide={currentSlide}
						countdown={countdown}
						minutes={minutes}
						seconds={seconds}
						isPulsing={isPulsing}
						ticketsReserved={ticketsReserved}
						totalPrice={totalPrice}
						regularTickets={regularTickets}
						vipTickets={vipTickets}
						selectedSpot={selectedSpot}
						greenCamping={greenCamping}
						twoPersonTents={twoPersonTents}
						threePersonTents={threePersonTents}
						totalTickets={totalTickets}
					/>
				)}
			</section>
		</main>
	);
}

export default Page;
