import { useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";

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
        <div>
          <NextDraw contract={contract} />
        </div>
      )}
    </div>
  );
};

export default Home;
