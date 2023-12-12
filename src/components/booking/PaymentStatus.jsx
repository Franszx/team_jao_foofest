import React from "react";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";

const PaymentStatus = ({ paymentSuccess }) => (
  <div className="h-full flex flex-col justify-between">
    <div className="flex flex-col justify-evenly flex-grow">
      <div className="place-self-center flex flex-col gap-4 items-center text-center">
        {paymentSuccess ? (
          <>
            <IconCheck className="text-emerald-500 animate-bounce" size={64} />
            <h1 className="font-medium text-lg">Order Complete!</h1>
            <p className="text-gray-400 font-medium max-w-xs">
              Your order has been placed and you will receive a confirmation
              email shortly.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-medium text-lg">Payment Failed!</h1>
            <p className="text-gray-400 font-medium max-w-xs">
              There was an issue with your payment. Please try again.
            </p>
            <Link
              href="/booking"
              className="btn btn-primary font-medium text-emerald-100 text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
);

export default PaymentStatus;
