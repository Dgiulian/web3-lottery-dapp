import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

type Props = { contract: any };

export function useRemainingTickets(contract: any) {
  const { data } = useContractRead(contract, "RemainingTickets");
  return data;
}
export function useCurrentWinningReward(contract: any) {
  const { data } = useContractRead(contract, "CurrentWinningReward");
  return data;
}

const NextDraw = ({ contract }: Props) => {
  const remainingTickets = useRemainingTickets(contract);
  const currentWinningReward = useCurrentWinningReward(contract);

  return (
    <div className="border-gray-500 w-full bg-slate-700 p-6 rounded-md ">
      <h1 className="text-5xl text-center">The Next Draw</h1>

      <div className="flex justify-center space-x-4 mt-4">
        <div className="bg-slate-900 w-1/2 p-4 border border-slate-500 flex flex-col rounded-md">
          <div className="">Total Pool </div>
          {currentWinningReward && (
            <div className="font-bold text-xl">
              {ethers.utils.formatEther(currentWinningReward.toString())}
              &nbsp;MATIC
            </div>
          )}
        </div>
        <div className="bg-slate-900 w-1/2 p-4 border border-slate-500 flex flex-col rounded-md">
          <div className="">Tickets Remaining</div>
          {remainingTickets && (
            <div className="font-bold text-xl">
              {remainingTickets.toNumber()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextDraw;
