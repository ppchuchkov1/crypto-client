import Modal from "../../UI/Modal";
import useAuthStore from "../../zustang/useAuthStore";
import useNFTStore from "../../zustang/useNFTStore";

const BuyNFTModal = ({ showConfirmModal, setShowConfirmModal, item }) => {
  const token = useAuthStore((state) => state.token);
  const buyNft = useNFTStore((state) => state.buyNft);

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
    <Modal
      isOpen={showConfirmModal}
      onClose={handleCancelBuy}
      className="bg-white max-w-md w-full shadow-xl text-center p-6"
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
  );
};

export default BuyNFTModal;
