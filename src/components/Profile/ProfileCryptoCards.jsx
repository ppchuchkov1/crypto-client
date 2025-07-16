import { useState } from "react";
import { BanknoteArrowDown } from "lucide-react";
import useWalletStore from "../../zustang/useWalletStore";
import useCryptoStore from "../../zustang/useCryptoStore";
import SellCryptoModal from "../CryptoModals/SellCryptoModal";

const ProfileCryptoCards = () => {
  const wallet = useWalletStore((state) => state.wallet);
  const crypto = useCryptoStore((state) => state.crypto);
  const [selectedCryptoToSell, setSelectedCryptoToSell] = useState({});
  const [openSellCryptoModal, setOpenSellCryptoModal] = useState(false);

  const getCrptoBySymbol = (symbol) =>
    crypto.find((item) => item.symbol === symbol);

  const formatAmount = (amount) => {
    return amount < 1 ? amount.toFixed(4) : amount.toLocaleString();
  };

  const formatTotal = (amount, price) => {
    const total = amount * price;
    return `$${total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <>
      <SellCryptoModal
        selectedCryptoToSell={selectedCryptoToSell}
        openSellCryptoModal={openSellCryptoModal}
        setOpenSellCryptoModal={setOpenSellCryptoModal}
      />
      <section className="py-6 relative">
        <div className="w-full max-w-2xl lg:max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {wallet?.wallet?.currencies?.map((crypto, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={crypto.image}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {crypto.name}
                    </h3>
                    <p className="text-sm text-gray-500">{crypto.name}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="text-sm font-bold text-gray-900">
                      $
                      {
                        getCrptoBySymbol(crypto.name.toLowerCase())
                          ?.current_price
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last 24h:</span>

                    {getCrptoBySymbol(crypto.name.toLowerCase())
                      ?.price_change_percentage_24h > 0 ? (
                      <span className="text-sm font-bold text-green-500">
                        {
                          getCrptoBySymbol(crypto.name.toLowerCase())
                            ?.price_change_percentage_24h
                        }
                        %
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-red-500">
                        {
                          getCrptoBySymbol(crypto.name.toLowerCase())
                            ?.price_change_percentage_24h
                        }
                        %
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-sm  font-bold text-gray-900">
                      {formatAmount(crypto.amount)}
                    </span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Total:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatTotal(
                        crypto.amount,
                        getCrptoBySymbol(crypto.name.toLowerCase())
                          ?.current_price
                      )}
                    </span>
                  </div>{" "}
                  <button
                    onClick={() => {
                      setSelectedCryptoToSell(crypto);
                      setOpenSellCryptoModal(true);
                    }}
                    className="bg-ftx flex gap-2 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <BanknoteArrowDown color="white" />
                    Sell
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileCryptoCards;
