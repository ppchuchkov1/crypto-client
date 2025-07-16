import { useState } from "react";
import { ArrowDownUp, X } from "lucide-react";
import depositeBackground from "../../assets/deposite-bg.png";
import useAuthStore from "../../zustang/useAuthStore";
import useNFTStore from "../../zustang/useNFTStore";
import Modal from "../../UI/Modal";

const ProfileNFTSellModal = ({ selectedNFT, isOpen, onClose }) => {
  const token = useAuthStore((state) => state.token);
  const listNft = useNFTStore((state) => state.listNft);
  const [price, setPrice] = useState("");

  const handleSellNFT = () => {
    listNft({
      nftId: selectedNFT.id,
      price: Number(price),
      token,
    });

    setPrice("");
  };
  return (
    <Modal className="w-200" isOpen={isOpen} onClose={onClose}>
      <div className="bg-white bg-cover rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${depositeBackground})`,
          }}
          className="p-6 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ArrowDownUp className="h-6 w-6" />
                <h2 className="text-xl font-bold">Sell {selectedNFT?.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200"
              >
                <X />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <img
                  src={selectedNFT?.image}
                  className={`w-40 h-40 rounded-lg`}
                />
              </div>
              <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400 text-center">
                {selectedNFT?.name}
              </p>

              <div className="text-center mb-6">
                <div className="text-lg text-gray-600 mb-1">
                  Current price:{" "}
                  <span className="font-semibold text-gray-800">
                    ${selectedNFT?.usdPrice}
                  </span>
                </div>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                      $
                    </span>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="100"
                      className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl  focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSellNFT}
                  disabled={!price || parseFloat(price) <= 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    !price || parseFloat(price) <= 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-black text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  }`}
                >
                  Sell {price > 0 && `$${price}`}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center leading-relaxed mt-6">
            Cryptocurrencies are a risky investment. Prices can change
            dramatically. Only invest what you can afford to lose.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileNFTSellModal;
