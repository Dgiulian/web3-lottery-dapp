import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { ConnectMetamaskButton } from "./connect-metamask-button";
type Props = {};

const Navbar = (props: Props) => {
  const address = useAddress();
  return (
    <div className="p-4 flex items-center">
      <div className="w-16 h-16 rounded-full bg-cyan-800"></div>
      <div className="flex align-center justify-between w-full">
        <div className="flex flex-col justify-center ml-4">
          <span className="text-xl capitalize">Next Generation Lottery </span>

          <p className="text-xs">
            {address ? address : "Login with metamask to start winning"}
          </p>
        </div>
        <ConnectMetamaskButton />
      </div>
    </div>
  );
};

export default Navbar;
