import React, { useState } from "react";

import { IconInfoCircle, IconMinus, IconPlus } from "@tabler/icons-react";

export const TentOptions = ({
  updateTents,
  twoPersonTents,
  threePersonTents,
  totalTickets,
  greenCamping,
  setGreenCamping,
  totalSelectedCapacity,
  setTotalSelectedCapacity,
}) => {
  return (
    <div className=" h-full flex flex-col justify-between">
      <h1 className="font-medium text-lg">Tents & Options</h1>
      <div className="flex flex-col justify-evenly flex-grow">
        <div className="place-self-center flex flex-col gap-12">
          <TentOption
            tentType="two"
            tentPrice="299 DKK"
            tentCount={twoPersonTents}
            updateTents={updateTents}
            totalTickets={totalTickets}
            totalSelectedCapacity={totalSelectedCapacity}
          />
          <TentOption
            tentType="three"
            tentPrice="399 DKK"
            tentCount={threePersonTents}
            updateTents={updateTents}
            totalTickets={totalTickets}
            totalSelectedCapacity={totalSelectedCapacity}
          />
          <GreenCampingOption
            greenCamping={greenCamping}
            setGreenCamping={setGreenCamping}
          />
        </div>
      </div>
    </div>
  );
};

const TentOption = ({
  tentType,
  tentPrice,
  tentCount,
  updateTents,
  totalTickets,
  totalSelectedCapacity,
}) => (
  <div className="flex items-center gap-5 justify-end">
    <div className="font-medium text-end">
      <h2 className="text-gray-400 whitespace-nowrap">
        {tentType.charAt(0).toUpperCase() + tentType.slice(1)} Person Tent
      </h2>
      <p>{tentPrice}</p>
    </div>
    <div className="flex items-center w-32 justify-between font-medium">
      <button
        className="bg-neutral text-gray-100 font-medium text-base p-2 rounded-full w-fit border border-gray-500 hover:bg-gray-600 hover:border-gray-500 transition-colors"
        onClick={() => updateTents(tentType, "decrease")}
      >
        <IconMinus />
      </button>
      <p>{tentCount}</p>
      <button
        className={`font-medium text-base p-2 rounded-full w-fit border transition-colors ${
          totalSelectedCapacity + (tentType === "two" ? 2 : 3) > totalTickets
            ? "btn-disabled bg-gray-800 border-gray-800 stroke-gray-800"
            : "bg-primary text-emerald-100 border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400 "
        }`}
        onClick={() => {
          const tentCapacity = tentType === "two" ? 2 : 3;
          if (totalSelectedCapacity + tentCapacity <= totalTickets) {
            updateTents(tentType, "increase");
          }
        }}
        disabled={
          totalSelectedCapacity + (tentType === "two" ? 2 : 3) > totalTickets
        }
      >
        <IconPlus />
      </button>
    </div>
  </div>
);

const GreenCampingOption = ({ greenCamping, setGreenCamping }) => (
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
);
