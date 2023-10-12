import { useContractRead, useContractWrite } from "wagmi";
import { NFTV1} from "../../contract-types";
import abi from "../../abis/0x6B2EF908155Cab2Fab7eC2775B79A6ac27f7A8bA.json";
const address = "0x6B2EF908155Cab2Fab7eC2775B79A6ac27f7A8bA";

export function useNFTcontract(): NFTV1 {
  const contract = useContractWrite({
    address: address,
    abi: abi,
  });
  return contract as unknown as NFTV1;
}

export function useNFTFunctionwriter(
  functionName: string,
  args?: any[]
): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    address: address,
    abi: abi,
    functionName: functionName,
    args: args,
  });

  return contractWrite;
}

export interface UseNFTFunctionReaderProps {
  functionName: string;
  args?: String[];
}
// create a generic hook to access read functions of contract
export function useNFTFunctionReader({
  functionName,
  args, // Default to an empty array if 'args' is not provided
}: UseNFTFunctionReaderProps): ReturnType<typeof useContractRead> {
  const contractRead = useContractRead({
    address: address,
    abi: abi,
    functionName: functionName,
    args: args,
    watch: true,
    onError(error) {},
  });

  return contractRead;
}
