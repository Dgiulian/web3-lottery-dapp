import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { useMemo } from "react";

function useIsLotteryOperator(contract: any) {
  const address = useAddress();
  const { data, isLoading } = useContractRead(contract, "lotteryOperator");

  const isOperator = useMemo(
    () => !!address && data?.toString() === address?.toString(),
    [address, data]
  );

  return isOperator;
}

export default useIsLotteryOperator;
