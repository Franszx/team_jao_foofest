import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const Payment = ({ email, setEmail }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    let newValue = value;

    // Add spaces every 4 digits if the input is the card number
    if (name === "number") {
      newValue = value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
    }

    // Add slash after 2 digits if the input is the expiry date
    if (name === "expiry") {
      newValue = value.replace(/\W/gi, "").replace(/(.{2})/, "$1/");
    }

    setState((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className=" h-full flex flex-col justify-between w-full">
      <h1 className="font-medium text-lg">Payment</h1>
      <div className="flex flex-col justify-evenly flex-grow">
        <div className="flex flex-col items-center gap-8 ">
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
          <form className=" flex flex-col gap-3 justify-center max-w-sm w-full">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered input-sm bg-gray-800 w-full"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
            <input
              type="tel"
              pattern="\d{4} \d{4} \d{4} \d{4}"
              name="number"
              placeholder="Card Number"
              className="input input-bordered input-sm bg-gray-800 w-full"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="19"
              required
            />
            <input
              type="text"
              pattern="\d{2}/\d{2}"
              name="expiry"
              placeholder="MM/YY"
              className="input input-bordered input-sm bg-gray-800 w-full"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="5"
              required
            />

            <input
              type="tel"
              pattern="\d{3}"
              name="cvc"
              placeholder="CVC"
              className="input input-bordered input-sm bg-gray-800 w-full"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="3"
              required
            />
          </form>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered input-sm bg-gray-800 w-full max-w-sm"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
