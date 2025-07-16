import useNFTStore from "../../zustang/useNFTStore";
import useAuthStore from "../../zustang/useAuthStore";

const NFTCard = ({ item }) => {
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const buyNft = useNFTStore((state) => state.buyNft);

  const isOwner = userId === item.ownerId;

  const handleBuyNft = () => {
    buyNft({
      token: token,
      nftId: item.id,
    });
  };

  return (
    <div className="flex items-center flex-col gap-5 w-full group">
      <div className="block w-full">
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
          onClick={handleBuyNft}
          disabled={isOwner}
          className={`py-2 px-3.5 rounded-lg transition-all duration-300 font-semibold border ${
            isOwner
              ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300"
              : "border-black group-hover:bg-black group-hover:text-white"
          }`}
        >
          {isOwner ? "Owned" : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
