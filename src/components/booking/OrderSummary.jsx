import React from "react";
import {
  IconBuildingCircus,
  IconCash,
  IconFlag,
  IconTicket,
  IconTrees,
  IconTent,
  IconVip,
  IconShoppingCart,
} from "@tabler/icons-react";

function OrderSummary({
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
  return (
    <div className="bg-gray-800 bg-opacity-70 h-24 md:h-full w-full  flex flex-row md:flex-col justify-between items-baseline md:items-start gap-5 order-1 md:order-2 md:border-l border-l-gray-700 border-opacity-60 p-6 md:p-12">
      <div className="space-y-5 hidden md:block">
        <div className="flex gap-2 items-center">
          <IconShoppingCart />
          <h1 className="font-medium text-lg whitespace-nowrap">
            Order Summary
          </h1>
        </div>
        <div className="space-y-5 font-medium hidden md:block">
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
        </div>
      </div>
      <div className="w-full h-fit md:space-y-5">
        <div className=" divider mt-0 hidden md:flex"></div>
        {ticketsReserved && (
          <div
            className={`hidden md:block font-medium ${
              isPulsing ? " animate-pulse" : ""
            }`}
          >
            <p className="text-gray-400 mb-1">
              {totalTickets > 1 ? "Tickets Reserved" : "Ticket Reserved"}
            </p>
            <span className="countdown border border-gray-700 bg-gray-900 rounded-lg p-2 mr-1">
              <span style={{ "--value": minutes }}> :</span>
            </span>
            <span className="text-gray-400">min</span>
            <span className="countdown border border-gray-700 bg-gray-900 rounded-lg p-2 mr-1 ml-2">
              <span style={{ "--value": seconds }}></span>
            </span>
            <span className="text-gray-400">sec</span>
          </div>
        )}
        <div className="font-medium flex flex-row md:flex-col gap-2 md:gap-0">
          <p className="text-gray-400">Total</p>
          <p>{totalPrice} DKK</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
