import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNFTFunctionReader } from "../utils/hook";
import Debug from "../utils/constant";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
interface ListedNftsProps {
  image: string;
  name: string;
  description: string;
  Address: string;
  Price: string;
}

export const RecentBought: React.FC<ListedNftsProps> = ({
  image,
  name,
  description,
  Address,
  Price,
}) => {
  const { address } = useAccount();

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
                  <p>Price:{ethers.formatEther(Price)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
