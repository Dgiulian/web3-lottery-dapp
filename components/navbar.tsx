import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { ConnectMetamaskButton } from "./connect-metamask-button";
type Props = {};

const Navbar = (props: Props) => {
  const address = useAddress();
  return (
    <div className="p-4 flex items-center">
      <div className="w-16 h-16 rounded-full bg-amber-500"></div>
      <div className="flex align-center justify-between w-full">
        <div className="flex flex-col ml-4">
          <span className="text-xl capitalize">Next Generation Lottery </span>
          {address && <span className="text-xs">{address}</span>}
        </div>
        <ConnectMetamaskButton />
      </div>
    </div>
  );
};

export default Navbar;
