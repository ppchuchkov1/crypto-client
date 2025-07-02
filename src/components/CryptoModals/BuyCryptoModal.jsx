import { useState } from "react";
import useCryptoStore from "../../zustang/useCryptoStore";
import useAuthStore from "../../zustang/useAuthStore";

const BuyCryptoModal = ({ openBuyCryptoModal, setOpenBuyCryptoModal }) => {
  const selectedCrypto = useCryptoStore((state) => state.selectedCrypto);
  const buyCrypto = useCryptoStore((state) => state.buyCrypto);
  const token = useAuthStore((state) => state.token);
  const buying = useCryptoStore((state) => state.buying);
  const [amount, setAmount] = useState("");

  const cryptoAmount = amount ? amount / selectedCrypto?.current_price : 0;

  const handleBuy = async () => {
    buyCrypto(token, {
      currency: selectedCrypto?.symbol?.toUpperCase(),
      amount: Number(cryptoAmount),
      pricePerUnit: selectedCrypto?.current_price,
      image: selectedCrypto?.image,
    });
  };

  const closeBuyCryptoModal = () => {
    setOpenBuyCryptoModal(false);
  };

  if (!openBuyCryptoModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm"
      onClick={closeBuyCryptoModal}
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
                  Buy {selectedCrypto?.name}
                </h2>
              </div>
              <button
                onClick={closeBuyCryptoModal}
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
                  src={selectedCrypto?.image}
                  className={`w-20 h-20 rounded-full`}
                />
              </div>
              <p class="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400 text-center">
                {selectedCrypto?.name}
              </p>

              <div className="text-center mb-6">
                <div className="text-lg text-gray-600 mb-1">
                  Current price:{" "}
                  <span className="font-semibold text-gray-800">
                    ${selectedCrypto?.current_price}
                  </span>
                </div>

                {amount && (
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        You will receive
                      </div>
                      <div className="text-2xl font-bold text-ftx">
                        {cryptoAmount.toFixed(5)}{" "}
                        {selectedCrypto?.symbol?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                )}
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
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="100"
                      className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl  focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={!amount || parseFloat(amount) <= 0 || buying}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    !amount || parseFloat(amount) <= 0 || buying
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-black text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  }`}
                >
                  {buying ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Buy ${selectedCrypto?.symbol?.toUpperCase()}`
                  )}
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
    </div>
  );
};

export default BuyCryptoModal;
