import Link from "next/link";
import React from "react";

function BackButton({ currentSlide, changeSlide }) {
  if (currentSlide === 0) {
    return (
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-400 transition-colors font-medium"
      >
        Back
      </Link>
    );
  }

  if (currentSlide > 0 && currentSlide < 4) {
    return (
      <button
        className="text-gray-500 hover:text-gray-400 transition-colors font-medium"
        onClick={() => changeSlide("prev")}
      >
        Back
      </button>
    );
  }

  return null;
}

function ContinueButton({
  currentSlide,
  totalTickets,
  ticketHolders,
  selectedSpot,
  fulfillReservation,
  sendMailToCustomer,
  dataToSupabase,
  email,
  termsAccepted,
  handleContinue,
}) {
  const isContinueButtonEnabled = () => {
    const isTicketHolderValid =
      ticketHolders.regular.filter(Boolean).length +
        ticketHolders.vip.filter(Boolean).length ===
      totalTickets;

    const isEmailValid = email && email.includes("@");

    const isTermsAccepted = termsAccepted;

    return (
      totalTickets > 0 &&
      selectedSpot &&
      !(currentSlide === 2 && !isTicketHolderValid) &&
      !(currentSlide === 3 && (!isEmailValid || !isTermsAccepted))
    );
  };

  const handleButtonClick = () => {
    if (isContinueButtonEnabled()) {
      if (currentSlide === 3) {
        fulfillReservation();
        sendMailToCustomer();
        dataToSupabase();
      }
      handleContinue();
    }
  };

  return (
    <button
      className={`btn ${
        isContinueButtonEnabled()
          ? "bg-primary text-emerald-100"
          : "btn-disabled"
      } font-medium text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 `}
      onClick={handleButtonClick}
    >
      {currentSlide === 3 ? "Finish Payment" : "Continue"}
    </button>
  );
}

function BackAndContinueButtons(props) {
  return (
    <div className="place-self-end space-x-6 z-50">
      <BackButton {...props} />
      <ContinueButton {...props} />
    </div>
  );
}

export default BackAndContinueButtons;
