import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { useEffect, useMemo } from "react";

function useUserTickets(contract: any) {
  const address = useAddress();
  const { data: tickets } = useContractRead(contract, "getTickets");

  const userTickets = useMemo(
    () =>
      tickets?.reduce(
        (acc: any[], item: string, index: number) =>
          item === address ? [...acc, index + 1] : [...acc],
        []
      ) ?? [],
    [address, tickets]
  );
  console.log(userTickets);
  return userTickets;
}

export default useUserTickets;
