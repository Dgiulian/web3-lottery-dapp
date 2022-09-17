import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useState } from "react";

type Props = { contract: any };

function useTicketPrice(contract: any): number {
  const { data } = useContractRead(contract, "ticketPrice");
  return data as number;
}
function useTicketCommission(contract: any): number {
  const { data } = useContractRead(contract, "ticketCommission");
  return data as number;
}

function useExpiration(contract: any): number | undefined {
  const { data } = useContractRead(contract, "expiration");
  return data;
}

const BuyTickets = ({ contract }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const ticketPrice = useTicketPrice(contract);
  const ticketCommission = useTicketCommission(contract);
  const address = useAddress();
  const totalTicketCommission = ticketCommission * quantity;
  const expiration = useExpiration(contract);

  const isExpired = false; // expiration && expiration.toString() < Date.now().toString();

  return (
    <div className="w-full bg-slate-700 p-4">
      <div className="flex justify-between my-2">
        <span className="text-lg">Price per tickets</span>
        {ticketPrice && (
          <span className="font-bold text-xl">
            {ethers.utils.formatEther(ticketPrice.toString())}
            &nbsp;MATIC
          </span>
        )}
      </div>
      <div className="relative h-10 bg-slate-900 border-slate-700 px-2  text-xl">
        <label
          htmlFor="tickets"
          className="absolute top-1/2 -translate-y-1/2 text-slate-200 uppercase"
        >
          Tickets
        </label>
        <input
          id="tickets"
          type="number"
          // style={{ direction: "rtl" }}
          className="h-full w-full bg-transparent text-right outline-none "
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        ></input>
      </div>
      <div className="my-4">
        <div className="flex justify-between text-xl mt-2 text-bold">
          <span>Total cost of tickets</span>
          {ticketCommission && (
            <span>
              {ethers.utils.formatEther(totalTicketCommission.toString())}
              &nbsp;MATIC
            </span>
          )}
        </div>
        <div className="flex justify-between text-md">
          <span>Service fees</span>
          {ticketCommission && (
            <span>
              {ethers.utils.formatEther(ticketCommission.toString())}&nbsp;MATIC
            </span>
          )}
        </div>
        <div className="flex justify-between text-md">
          <span>+ Network fees</span>
          <span>0.999</span>
        </div>
      </div>
      <button
        className="py-4 w-full bg-cyan-800 rounded-md text-xl mt-4 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
        disabled={!address || isExpired}
      >
        Buy Tickets
      </button>
    </div>
  );
};

export default BuyTickets;
