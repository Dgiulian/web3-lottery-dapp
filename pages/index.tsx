import { useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";
import AdminControls from "../components/admin-controls";
import BuyTickets from "../components/buy-tickets";
import Footer from "../components/footer";
import LastWinnerMarquee from "../components/last-winner-marquee";

import Loading from "../components/loading";
import Navbar from "../components/navbar";
import NextDraw from "../components/next-draw";
import UserTickets from "../components/user-tickets";
import Winnings from "../components/winnings";
import { useIsLotteryOperator } from "../hooks";

const Home: NextPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const isLotteryOperator = useIsLotteryOperator(contract);

  return (
    <div className="bg-slate-900 w-full min-h-[100vh] text-gray-100 flex flex-col p-4">
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <LastWinnerMarquee contract={contract} />
          {isLotteryOperator && <AdminControls contract={contract} />}
          <Winnings contract={contract} />
          <div className="mt-4 mx-auto w-full lg:max-w-6xl flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0  items-start">
            <NextDraw contract={contract} />
            <div className="space-y-2 sm:space-y-0  lg:space-y-2 md:space-x-2 lg:space-x-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              <BuyTickets contract={contract} />
              <UserTickets contract={contract} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
