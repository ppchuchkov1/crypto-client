import { useState } from "react";
import useCryptoStore from "../../zustang/useCryptoStore";
import useAuthStore from "../../zustang/useAuthStore";

const SellCryptoModal = ({
  openSellCryptoModal,
  setOpenSellCryptoModal,
  selectedCryptoToSell,
}) => {
  const selectedCrypto = useCryptoStore((state) => state.selectedCrypto);
  const crypto = useCryptoStore((state) => state.crypto);
  const sellCrypto = useCryptoStore((state) => state.sellCrypto);
  const token = useAuthStore((state) => state.token);
  const selling = useCryptoStore((state) => state.selling);
  const [cryptoAmount, setCryptoAmount] = useState("");

  const availableAmount = selectedCryptoToSell?.amount;

  const getCrptoBySymbol = (symbol) =>
    crypto.find((item) => item.symbol === symbol?.toLowerCase());

  const usdAmount = (symbol) =>
    cryptoAmount * getCrptoBySymbol(symbol)?.current_price;

  const handleSell = async (sellObject) => {
    sellCrypto(token, sellObject);
  };

  const onCloseSellModal = () => {
    setCryptoAmount("");
    setOpenSellCryptoModal(false);
  };

  if (!openSellCryptoModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm"
      onClick={onCloseSellModal}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1750490970730-493c7ea3fdf2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
          }}
          className="p-6 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <h2 className="text-2xl font-bold">
                  Sell {selectedCrypto?.name}
                </h2>
              </div>
              <button
                onClick={onCloseSellModal}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <img
                  src={selectedCryptoToSell?.image}
                  className={`w-20 h-20 rounded-full`}
                />
              </div>
              <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400 text-center">
                {selectedCryptoToSell?.symbol}
              </p>

              <div className="text-center mb-6">
                <div className="text-lg text-gray-600 mb-1">
                  Current price:{" "}
                  <span className="font-semibold text-gray-800">
                    $
                    {
                      getCrptoBySymbol(selectedCryptoToSell?.name)
                        ?.current_price
                    }
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Available:{" "}
                  <span className="font-semibold text-gray-700">
                    {availableAmount.toFixed(5)}{" "}
                    {selectedCryptoToSell?.symbol?.toUpperCase()}
                  </span>
                </div>

                {cryptoAmount && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="text-center">
                      <div className="text-sm text-green-600 mb-1">
                        You will receive
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        ${usdAmount(selectedCryptoToSell?.name).toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to sell (
                    {selectedCryptoToSell?.symbol?.toUpperCase()})
                  </label>
                  <div className="relative">
                    <input
                      value={cryptoAmount}
                      onChange={(e) => setCryptoAmount(e.target.value)}
                      placeholder="0.00000"
                      max={availableAmount}
                      step="0.00001"
                      className="w-full px-4 py-3 text-lg border-2  rounded-xl focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        setCryptoAmount(availableAmount.toString())
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      MAX
                    </button>
                  </div>
                  {cryptoAmount &&
                    parseFloat(cryptoAmount) > availableAmount && (
                      <p className="text-red-500 text-sm mt-1">
                        Insufficient balance. You only have{" "}
                        {availableAmount.toFixed(5)}{" "}
                        {selectedCryptoToSell?.symbol?.toUpperCase()}
                      </p>
                    )}
                </div>

                <button
                  onClick={() =>
                    handleSell({
                      currency: selectedCryptoToSell?.name,
                      amount: cryptoAmount,
                      pricePerUnit: getCrptoBySymbol(selectedCryptoToSell?.name)
                        ?.current_price,
                    })
                  }
                  disabled={
                    !cryptoAmount ||
                    parseFloat(cryptoAmount) <= 0 ||
                    parseFloat(cryptoAmount) > availableAmount ||
                    selling
                  }
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    !cryptoAmount ||
                    parseFloat(cryptoAmount) <= 0 ||
                    parseFloat(cryptoAmount) > availableAmount ||
                    selling
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-600 text-white shadow-lg hover:shadow-xl hover:bg-red-700 transform hover:-translate-y-1"
                  }`}
                >
                  {selling ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Sell ${selectedCryptoToSell?.name?.toUpperCase()}`
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center leading-relaxed mt-6">
            Cryptocurrencies are a risky investment. Prices can change
            dramatically. Consider the tax implications of selling your crypto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellCryptoModal;
