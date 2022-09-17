import { useContractRead } from "@thirdweb-dev/react";

function useExpiration(contract: any): number | undefined {
  const { data } = useContractRead(contract, "expiration");
  return data;
}

export default useExpiration;
