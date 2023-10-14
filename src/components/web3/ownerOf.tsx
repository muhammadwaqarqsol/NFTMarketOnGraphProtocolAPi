import { useAccount } from "wagmi";
import { Modal } from "../ui/Modal";
import { ListModal } from "../ui/ListModal";

interface ListedNftsProps {
  image: string;
  name: string;
  description: string;
  nftTokenId: string;
  Listed: Boolean;
  myFunction: () => void;
}

export const OwnedListedNfts: React.FC<ListedNftsProps> = ({
  image,
  name,
  description,
  nftTokenId,
  Listed,
  myFunction,
}) => {
  const { address } = useAccount();

  if (!address) {
    return null;
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
                  className="mb-3 h-40 w-full rounded-xl 3xl:h-full 3xl:w-full"
                  alt=""
                />
              </div>
              <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                <div className="mb-2">
                  <p className="text-lg font-bold text-navy-700"> {name} </p>
                  <p className="text-lg mt-1 font-medium text-gray-600 md:mt-2">
                    {description}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                    By You
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between md:items-center lg:justify-between ">
                <Modal tokenId={nftTokenId} myFunction={myFunction} />
                {Listed ? (
                  <></>
                ) : (
                  <div className="flex items-center justify-between md:items-center lg:justify-between ">
                    <ListModal tokenId={nftTokenId} myFunction={myFunction} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
