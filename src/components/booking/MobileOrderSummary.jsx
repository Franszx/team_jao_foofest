"use client";

import {
	IconBuildingCircus,
	IconCash,
	IconFlag,
	IconTicket,
	IconTrees,
	IconTent,
	IconVip,
	IconShoppingCart,
	IconCaretDown,
	IconCaretUp,
} from "@tabler/icons-react";
import { useState } from "react";

export default function MobileOrderSummary({
	minutes,
	seconds,
	isPulsing,
	ticketsReserved,
	totalPrice,
	regularTickets,
	vipTickets,
	selectedSpot,
	greenCamping,
	twoPersonTents,
	threePersonTents,
	totalTickets,
}) {
	const [showOrderSummary, setShowOrderSummary] = useState(false);

	return (
		<div className="absolute w-full z-50">
			{ticketsReserved && (
				<div
					className={`font-medium flex justify-between items-center mx-8 mt-4 mb-3 text-lg ${
						isPulsing ? " animate-pulse" : ""
					}`}
				>
					<p className="text-gray-400">
						{totalTickets > 1 ? "Tickets Reserved" : "Ticket Reserved"}
					</p>
					<div>
						<span className="countdown border border-gray-700 bg-gray-900 rounded-lg p-2 mr-1 ml-2">
							<span style={{ "--value": minutes }}> :</span>
						</span>
						<span className="text-gray-400">min</span>
						<span className="countdown border border-gray-700 bg-gray-900 rounded-lg p-2 mr-1 ml-2">
							<span style={{ "--value": seconds }}></span>
						</span>
						<span className="text-gray-400">sec</span>
					</div>
				</div>
			)}
			<div className="flex items-center justify-between px-8 py-4 bg-primary bg-opacity-90">
				<div
					onClick={() => setShowOrderSummary(!showOrderSummary)}
					className="flex gap-2"
				>
					<IconShoppingCart size={35} />
					{!showOrderSummary && <IconCaretDown size={35} />}
					{showOrderSummary && <IconCaretUp size={35} />}
				</div>
				<p>{totalPrice} DKK</p>
			</div>
			{showOrderSummary && (
				<div className="bg-gray-700 px-8 py-6 flex flex-col gap-4">
					<div className="flex items-center gap-4">
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
						<div className="flex items-center gap-4">
							<div className="indicator rounded-lg bg-gray-600 border border-gray-500 p-2 ">
								<span class="indicator-item bg-emerald-600 border-emerald-500 badge badge-secondary h-5 w-5 rounded-full text-xs">
									{regularTickets}
								</span>
								<IconTicket />
							</div>
							<div className="flex flex-col">
								<p className="text-gray-400">Regular Tickets</p>
								<p className="text-gray-50">
									<span>799 DKK </span>
								</p>
							</div>
						</div>
					)}
					{vipTickets > 0 && (
						<div className="flex items-center gap-4">
							<div className="indicator rounded-lg bg-gray-600 border border-gray-500 p-2">
								<span class="indicator-item bg-emerald-600 border-emerald-500 badge badge-secondary h-5 w-5 rounded-full text-xs">
									{vipTickets}
								</span>
								<IconVip />
							</div>
							<div className="flex flex-col">
								<p className="text-gray-400">VIP Tickets</p>
								<p className="text-gray-50">
									<span>1299 DKK </span>
								</p>
							</div>
						</div>
					)}
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-gray-600 border border-gray-500 p-2">
							<IconFlag />
						</div>
						<div className="flex flex-col">
							<p className="text-gray-400">Selected Camp</p>
							<p className="text-gray-50">
								<span>{selectedSpot ? selectedSpot : "No camp selected"}</span>
							</p>
						</div>
					</div>
					{twoPersonTents > 0 && (
						<div className="flex items-center gap-4">
							<div className="indicator rounded-lg bg-gray-600 border border-gray-500 p-2">
								<span class="indicator-item bg-emerald-600 border-emerald-500 badge badge-secondary h-5 w-5 rounded-full text-xs">
									{twoPersonTents}
								</span>
								<IconTent />
							</div>
							<div className="flex flex-col">
								<p className="text-gray-400">2 Person Tents</p>
								<p className="text-gray-50">
									<span>299 DKK </span>
								</p>
							</div>
						</div>
					)}
					{threePersonTents > 0 && (
						<div className="flex items-center gap-4">
							<div className="indicator rounded-lg bg-gray-600 border border-gray-500 p-2">
								<span class="indicator-item bg-emerald-600 border-emerald-500 badge badge-secondary h-5 w-5 rounded-full text-xs">
									{threePersonTents}
								</span>
								<IconBuildingCircus />
							</div>
							<div className="flex flex-col">
								<p className="text-gray-400">3 Person Tents</p>
								<p className="text-gray-50">
									<span>399 DKK </span>
								</p>
							</div>
						</div>
					)}
					{greenCamping && (
						<div className="flex items-center gap-4">
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
					<hr className="border-gray-500" />
					<div className="flex justify-between">
						<div>
							<p className="text-lg">Total</p>
							<p className="text-gray-400 text-sm">
								Including {Number((totalPrice * 0.2).toFixed(2))} kr in taxes
							</p>
						</div>
						<p className="text-lg">{totalPrice} DKK</p>
					</div>
				</div>
			)}
		</div>
	);
}
