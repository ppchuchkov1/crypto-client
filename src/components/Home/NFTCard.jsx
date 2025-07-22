import { useState } from "react";
import useNFTStore from "../../zustang/useNFTStore";
import useAuthStore from "../../zustang/useAuthStore";
import Modal from "../../UI/Modal";

const NFTCard = ({ item }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const buyNft = useNFTStore((state) => state.buyNft);

  const isOwner = userId === item.ownerId;

  const handleBuyClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmBuy = () => {
    buyNft({
      token: token,
      nftId: item.id,
    });
    setShowConfirmModal(false);
  };

  const handleCancelBuy = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
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
            onClick={handleBuyClick}
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

      <Modal
        isOpen={showConfirmModal}
        onClose={handleCancelBuy}
        className="bg-white max-w-md w-full shadow-xl text-center"
      >
        <div className="mb-6">
          <img
            className="w-100 h-100 rounded-lg object-cover mx-auto"
            src={item.image}
            alt={item.name}
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Confirm Purchase
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to buy{" "}
          <span className="font-lg text-black font-bold">"{item.name}"</span>{" "}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleCancelBuy}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmBuy}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Buy ${item.usdPrice?.toFixed(2)}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NFTCard;
