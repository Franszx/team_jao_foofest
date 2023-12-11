import React from "react";

const TicketHolders = ({
  regularTickets,
  vipTickets,
  ticketHolders,
  setTicketHolders,
}) => {
  const handleInputChange = (type, index, value) => {
    let newTicketHolders = [...ticketHolders[type]];
    newTicketHolders[index] = value;
    setTicketHolders({
      ...ticketHolders,
      [type]: newTicketHolders,
    });
  };

  return (
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
                      onChange={(e) =>
                        handleInputChange("regular", i, e.target.value)
                      }
                      value={ticketHolders.regular[i] || ""}
                    />
                  ))}
                </div>
              </div>
            )}
            {vipTickets > 0 && (
              <div>
                <h2 className="mb-3 font-medium text-lg">VIP Ticket Holders</h2>
                <div className="flex flex-col gap-3">
                  {[...Array(vipTickets)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`VIP Ticket ${i + 1}`}
                      className="input input-bordered bg-neutral w-full"
                      onChange={(e) =>
                        handleInputChange("vip", i, e.target.value)
                      }
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
  );
};

export default TicketHolders;
