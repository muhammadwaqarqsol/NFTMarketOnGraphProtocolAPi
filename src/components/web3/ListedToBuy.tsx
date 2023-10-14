import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNFTFunctionReader, useNFTFunctionwriter } from "../utils/hook";
import Debug from "../utils/constant";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import Abi from "../../abis/0x6B2EF908155Cab2Fab7eC2775B79A6ac27f7A8bA.json";
interface ListedNftsProps {
  image: string;
  name: string;
  description: string;
  nftTokenId: string;
  price: string;
  Address: String;
  myFunction: () => void;
}

export const ListedToBuy: React.FC<ListedNftsProps> = ({
  image,
  name,
  description,
  nftTokenId,
  price,
  Address,
  myFunction,
}) => {
  const { address } = useAccount();
  // Write contract Function
  const priceinwei = BigInt(price);
  const { config } = usePrepareContractWrite({
    address: "0x6B2EF908155Cab2Fab7eC2775B79A6ac27f7A8bA",
    abi: Abi,
    functionName: "buy",
    args: [nftTokenId],
    value: priceinwei,
  });
  const { writeAsync, data: Buy } = useContractWrite(config);
  let {
    isLoading,
    isSuccess,
    isError: Errormessage,
  } = useWaitForTransaction({
    hash: Buy?.hash,
  });

  async function BuyNFT() {
    Debug && console.log("called");
    try {
      const tx = await writeAsync?.();
      Debug && console.log("Transaction", tx?.hash);
    } catch (error: any) {
      Debug && console.log("Error >>>", error.message);
    }
  }
  useEffect(() => {
    if (isSuccess) {
      myFunction();
      isSuccess = false;
      Debug && console.log(Buy, "Data");
    }
  }, [isSuccess]);

  if (!address) {
    return <h1>Connect First</h1>;
  }

  return (
    <>
      {
        <div className="flex flex-col justify-center items-center m-4">
          <div className="!z-5 relative rounded-[20px] max-w-[500px] max-h-[500px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white outline-dashed undefined">
            <div className="h-full w-full">
              <div className="relative w-full">
                <img
                  src={image}
                  className="mb-3 h-40 w-full rounded-xl 3xl:h-full 3xl:w-full "
                  alt=""
                />
              </div>
              <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                <div className="mb-2">
                  <p className="text-lg font-bold text-navy-700"> {name} </p>
                  <p className="text-lg mt-1 font-medium text-gray-600 md:mt-2">
                    {description}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 ">
                    Owned By {Address.toString().slice(0, 8)}...
                  </p>
                  <p>Price: {ethers.formatEther(price)}</p>
                </div>
              </div>
            </div>
            {address.toLowerCase() !== Address ? (
              <button
                className="text-xl justify-center items-center bg-purple-300 rounded-3xl p-2"
                onClick={() => BuyNFT()}
              >
                {isSuccess ? "Buy" : "Please Wait"}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      }
    </>
  );
};
