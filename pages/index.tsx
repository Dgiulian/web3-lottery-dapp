import { useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";
import BuyTickets from "../components/buy-tickets";

import Loading from "../components/loading";
import Navbar from "../components/navbar";
import NextDraw from "../components/next-draw";

const Home: NextPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  return (
    <div className="bg-slate-900 w-full min-h-[100vh] text-gray-100 flex flex-col p-4">
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-4 space-y-4 mx-auto w-full lg:max-w-6xl">
          <NextDraw contract={contract} />
          <BuyTickets contract={contract} />
        </div>
      )}
    </div>
  );
};

export default Home;
