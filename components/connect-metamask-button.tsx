import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const disconnect = useDisconnect();
  return (
    <button type="button" onClick={() => disconnect()}>
      <div className="flex flex-col items-center justify-center">
        <FiLogOut />
        Logout
      </div>
    </button>
  );
};

export const ConnectMetamaskButton = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  return (
    <div>
      {address ? (
        <LogoutButton />
      ) : (
        <button
          onClick={connectWithMetamask}
          className="bg-amber-700 p-2 rounded-md"
        >
          Connect Metamask Wallet
        </button>
      )}
    </div>
  );
};
