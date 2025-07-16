import { useState } from "react";
import useAuthStore from "../../zustang/useAuthStore";
import useWalletStore from "../../zustang/useWalletStore";
import depositeBackground from "../../assets/deposite-bg.png";
import profileAvatarImage from "../../assets/profile-avatar.jpg";

const DepositeAdd = () => {
  const token = useAuthStore((state) => state.token);
  const wallet = useWalletStore((state) => state.wallet);
  const depositeToWalletWithStripe = useWalletStore(
    (state) => state.depositeToWalletWithStripe
  );

  const [amount, setAmount] = useState("");

  const quickAmounts = [50, 100, 500, 1000, 2000, 5000];

  const handleDeposit = async () => {
    depositeToWalletWithStripe(token, amount);
  };

  return (
    <div
      className="h-screen pt-20 text-black bg-cover bg-fixed"
      style={{ backgroundImage: `url(${depositeBackground})` }}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className=" gap-8">
          <p className="text-xl text-gray-100 text-center mb-5 max-w-3xl mx-auto leading-relaxed">
            Trade Bitcoin, Ethereum, and 500+ cryptocurrencies with zero fees.
            Advanced charts, real-time data, and institutional-grade security.
          </p>
          <div className="space-y-6">
            <div
              style={{ backgroundImage: `url(${depositeBackground})` }}
              className="bg-black text-white rounded-2xl p-7 shadow-lg  border-1 border-white bg-cover bg-fixed"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={profileAvatarImage}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-300 text-sm">Current balance</p>
                    <p className="text-2xl font-bold">
                      ${wallet?.wallet?.usdBalance?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Minimum</p>
                  <p className="text-lg font-semibold">$10</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-6">
                Deposite to your wallet
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Deposit amount
                </label>
                <div className="relative">
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <span className="absolute right-4 top-3 text-gray-500">
                    $
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="py-2 px-3 text-sm border border-gray-300 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) <= 0}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  !amount || parseFloat(amount) <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Deposite {amount ? `$${amount}` : ""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositeAdd;
