import { useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { ethers } from "ethers";
import Loading from "../components/loading";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  return (
    <div className="bg-slate-900 w-full min-h-[100vh] text-gray-100 flex flex-col">
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div>
            Remaining Tickets
            {remainingTickets && <div>{remainingTickets.toNumber()}</div>}
          </div>
          <div>
            Current Winning Reward:
            {currentWinningReward && (
              <div>
                {ethers.utils.formatEther(currentWinningReward.toString())}
                MATIC
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
