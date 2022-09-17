import React from "react";
import {
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

function useWinnings(contract: any) {
  const address = useAddress();
  const { data, isLoading } = useContractRead(
    contract,
    "getWinningsForAddress",
    address
  );
  return { winnings: data + 10e10, isLoading };
}
type Props = { contract: any };

const Winnings = ({ contract }: Props) => {
  const { winnings } = useWinnings(contract);
  const { mutateAsync: withdrawWinnings, isLoading } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings...");
    try {
      await withdrawWinnings([]);
      toast.success("Winnings withdrawed successuflly", { id: notification });
    } catch (error) {
      toast.error("Whoops, something went wrong", { id: notification });
      console.error("Withdraw error", error);
    }
  };

  return winnings > 0 ? (
    <div className="mx-auto my-5 w-full flex justify-center ">
      <button
        className=" max-w-sm md:max-w-xl lg:max-w-2xl bg-gradient-to-b from-slate-400 to-slate-800 p-5 animate-pulse text-centger rounded-xl w-full"
        onClick={onWithdrawWinnings}
        disabled={isLoading}
      >
        <p className="text-3xl">Winner!</p>
        <p className="font-bold">
          Total winnings{" "}
          <span className="font-bold text-xl">
            {ethers.utils.formatEther(winnings.toString())}
            &nbsp;MATIC
          </span>
        </p>
        <p>Click here to withdraw the price </p>
      </button>
    </div>
  ) : null;
};

export default Winnings;
