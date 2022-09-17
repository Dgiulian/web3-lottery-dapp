import { useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import Marquee from "react-fast-marquee";

type Props = { contract: any };

const LastWinnerMarquee = ({ contract }: Props) => {
  const { data: lastWinner } = useContractRead(contract, "lastWinner");
  const { data: lastWinnerAmmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );
  return (
    <Marquee className="bg-[#0a0b1f]/30 p-5 mb-5" gradient={false} speed={50}>
      <div className="flex space-x-2 mx-10 items-center">
        <h4 className="text-white font-bold">
          Last winner {lastWinner?.toString()}
        </h4>
        <h4 className="text-white font-bold">
          Previous winnings&nbsp;
          {lastWinnerAmmount && (
            <span className="font-bold text-xl">
              {ethers.utils.formatEther(lastWinnerAmmount.toString())}
              &nbsp;MATIC
            </span>
          )}
        </h4>
      </div>
    </Marquee>
  );
};

export default LastWinnerMarquee;
