import { useEffect, useState } from "react";
import { ListedNfts } from "../web3/ListedNfts";
import { useAccount, useQuery } from "wagmi";
import { subgraphQuery } from "../utils/query";
import { FETCH_Listed_NFT } from "../queries";
export const NftListing = () => {
  const { address, isConnected } = useAccount();
  const [length, setLength] = useState<Number>();
  const {
    data: NFTs,
    isLoading,
    isError,
    refetch,
  } = useQuery(["ListedNFTs"], Query, {
    refetchInterval: 100,
    cacheTime: 0,
  });
  async function Query() {
    const Query = await subgraphQuery(FETCH_Listed_NFT(address?.toLowerCase()));
    return Query;
  }

  useEffect(() => {
    console.log(address?.toLowerCase());
    console.log(NFTs);
    if (NFTs) {
      const check = (NFTs as any).tokens.length;
      setLength(check);
      console.log((NFTs as any).tokens);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-2xl text-red-500 rounded-lg">
        Loading .....
      </div>
    );
  }

  if (isError) {
    return (
      <div className="justify-center items-center flex flex-col">
        <img src="error.png" alt="Error" />
        <p className="text-3xl font-bold italic text-purple-500">
          You don't have NFTs!
        </p>
        <p className="text-3xl font-bold italic text-purple-500">Mint First!</p>
      </div>
    );
  }
  if (!address) {
    return (
      <>
        {isConnected ? (
          <div className="justify-center items-center flex flex-col">
            <img src="error.png" />
            <p className="text-3xl font-bold italic text-purple-500">
              Nothing to show
            </p>
          </div>
        ) : (
          <p className="justify-center items-center text-5xl flex flex-col text-purple-500">
            Connect First
          </p>
        )}
      </>
    );
  }

  return (
    <div>
      {isConnected ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          {length === 0 ? (
            <div className="col-span-8 flex items-center justify-center">
              <p className="text-red-500 text-2xl flex justify-center items-center">
                You haven't Listed Any NFT
              </p>
            </div>
          ) : (
            (NFTs as any).tokens.map((nft: any, index: any) => (
              <ListedNfts
                key={nft.tokenId} // Make sure to provide a unique key for each element in the array
                image={nft.ImageUrl}
                description={nft.Description}
                name={nft.Name}
                nftTokenId={nft.tokenID}
                price={nft.price}
                myFunction={refetch}
              />
            ))
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
