import useAuthStore from "../../zustang/useAuthStore";
import useNFTStore from "../../zustang/useNFTStore";

const ProfileNFTCard = ({ item, setSelectedNFT, setOpenNFTModal }) => {
  const token = useAuthStore((state) => state.token);
  const unlistNft = useNFTStore((state) => state.unlistNft);

  const handleNFTAction = () => {
    if (item.isListed) {
      unlistNft({ nftId: item.id, token });
    } else {
      setSelectedNFT(item);
      setOpenNFTModal(true);
    }
  };

  return (
    <div className="flex items-center flex-col gap-5 w-full group relative">
      <div className="block w-full relative">
        {item.isListed && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-2 rounded-lg m-1 shadow-md z-10">
            Listed for sale
          </span>
        )}

        <img
          className="w-full h-auto rounded-lg object-cover"
          src={item.image}
          alt={item.name}
        />
      </div>

      <div className="flex items-center justify-between max-w-[406px] lg:max-w-full w-full lg:px-0">
        <div className="block">
          <h4 className="text-2xl font-manrope font-semibold text-gray-900 mb-1">
            {item.name}
          </h4>
          <p className="font-medium text-lg text-gray-400">
            Price ${item.usdPrice?.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleNFTAction}
          className={`cursor-pointer border border-black py-2 px-3.5 rounded-lg transition-all duration-300
            ${
              item.isListed
                ? "bg-red-500 text-white hover:bg-red-600 border-0"
                : "group-hover:bg-black group-hover:text-white"
            }`}
        >
          {item.isListed ? "Remove sale" : "Put for sale"}
        </button>
      </div>
    </div>
  );
};

export default ProfileNFTCard;
