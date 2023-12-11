import Link from "next/link";
import React from "react";

function BackAndContinueButtons({
  currentSlide,
  changeSlide,
  handleContinue,
  totalTickets,
  ticketHolders,
  selectedSpot,
  fulfillReservation,
  sendMailToCustomer,
  email,
}) {
  return (
    <div className="place-self-end space-x-6">
      {currentSlide === 0 && (
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-400 transition-colors font-medium"
        >
          Back
        </Link>
      )}
      {currentSlide > 0 && currentSlide < 4 && (
        <button
          className="text-gray-500 hover:text-gray-400 transition-colors font-medium"
          onClick={() => changeSlide("prev")}
        >
          Back
        </button>
      )}
      {currentSlide === 4 ? (
        <Link
          href="/"
          className="btn bg-primary text-emerald-100 font-medium text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400"
        >
          Return
        </Link>
      ) : (
        <button
          className={`btn ${
            totalTickets > 0 &&
            selectedSpot &&
            !(
              currentSlide === 2 &&
              ticketHolders.regular.filter(Boolean).length +
                ticketHolders.vip.filter(Boolean).length !==
                totalTickets
            ) &&
            !(currentSlide === 3 && (!email || !email.includes("@")))
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
                sendMailToCustomer();
              }
              handleContinue();
            }
          }}
        >
          {currentSlide === 3 ? "Finish Payment" : "Continue"}
        </button>
      )}
    </div>
  );
}

export default BackAndContinueButtons;
