import { useState } from "react";
import useCryptoStore from "../../zustang/useCryptoStore";
import BuyCryptoModal from "../CryptoModals/BuyCryptoModal";

const CryptoTable = () => {
  const crypto = useCryptoStore((state) => state.crypto);
  const setSelectedCrypto = useCryptoStore((state) => state.setSelectedCrypto);
  const [openBuyCryptoModal, setOpenBuyCryptoModal] = useState(false);

  const getCryptoAndOpenModal = (crypto) => {
    setSelectedCrypto(crypto);
    setOpenBuyCryptoModal(true);
  };

  return (
    <>
      <BuyCryptoModal
        openBuyCryptoModal={openBuyCryptoModal}
        setOpenBuyCryptoModal={setOpenBuyCryptoModal}
      />

      <div className="max-w-7xl mx-auto px-6 pb-12 pt-3 bg-white">
        <div className="overflow-x-auto w-full">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="font-semibold text-gray-900">Digital Asset</div>
              <div className="font-semibold text-gray-900">Price</div>
              <div className="font-semibold text-gray-900">Change 24h</div>
              <div className="font-semibold text-gray-900">Volume</div>
              <div className="font-semibold text-gray-900">Market Cap</div>
              <div className="font-semibold text-gray-900">Action</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-200">
              {crypto?.slice(0, 10)?.map((crypto) => (
                <div
                  key={crypto.id}
                  className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10"
                      src={crypto.image}
                      alt={crypto.name}
                    />

                    <div>
                      <div className="font-semibold text-gray-900">
                        {crypto.symbol.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-600">{crypto.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center font-semibold text-gray-900">
                    ${crypto.current_price}
                  </div>

                  <div
                    className={`${
                      crypto.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex items-center font-semibold`}
                  >
                    {crypto.price_change_percentage_24h > 0 && "+"}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </div>

                  <div className="flex items-center font-semibold text-gray-900">
                    {Math.round(crypto.total_supply)}
                  </div>

                  <div className="flex items-center font-semibold text-gray-900">
                    #{crypto.market_cap_rank}
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => getCryptoAndOpenModal(crypto)}
                      className="bg-ftx cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoTable;
