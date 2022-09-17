import React from "react";
import { useUserTickets } from "../hooks";

type Props = { contract: any };

const UserTickets = ({ contract }: Props) => {
  const tickets = useUserTickets(contract);
  return (
    <div className="stats">
      {tickets.length && (
        <p className="my-4 text-xl">You have {tickets.length} tickets</p>
      )}
      <div className="flex max-w-sm flex-wrap lg:flex-wrap flex-1 gap-2 w-full ">
        {tickets.map((item: number) => (
          <div
            key={item}
            className="h-12 w-12 text-slate-300
          bg-slate-600 rounded-lg flex-shrink-0 flex items-center justify-center text-xs italic  "
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTickets;
