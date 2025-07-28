import { Link } from "react-router-dom";
import { Wallet, Eye, EyeOff, BanknoteArrowUp } from "lucide-react";
import useAuthStore from "../../zustang/useAuthStore";
import useWalletStore from "../../zustang/useWalletStore";
import ProfileAvatar from "../Profile/ProfileAvatarMenu";

const MobileNavigation = ({ setIsMenuOpen }) => {
  const token = useAuthStore((state) => state.token);
  const wallet = useWalletStore((state) => state.wallet);
  const setShowBalance = useWalletStore((state) => state.setShowBalance);
  const showBalance = useWalletStore((state) => state.showBalance);

  return (
    <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
      <div className="flex flex-col space-y-3 mt-4">
        <Link
          to="/"
          className="text-gray-800 font-bold py-2 px-4 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/crypto"
          className="text-gray-800 font-bold py-2 px-4 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          Crypto
        </Link>
        <Link
          to="/nft"
          className="text-gray-800 font-bold py-2 px-4 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          NFT
        </Link>
        <Link
          to="/profile"
          className="text-gray-800 font-bold py-2 px-4 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          Wallet
        </Link>
        <Link
          to="/slot"
          className="text-gray-800 font-bold py-2 px-4 hover:bg-gray-100 rounded-lg flex group justify-start  gap-1.5"
        >
          Casino
          <span className="relative flex w-2 h-2 -mr-2">
            <span className="absolute inline-flex w-full h-full bg-ftx rounded-full opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 bg-ftx rounded-full" />
          </span>
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        {token?.length > 0 ? (
          <>
            <div className="py-2 px-4">
              <ProfileAvatar />
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center text-black">
                  <Wallet className="w-5 h-5 text-ftx" />
                  <span className="text-sm font-medium w-16 text-right">
                    {showBalance
                      ? `$${wallet?.wallet?.usdBalance?.toFixed(2)}`
                      : "••••••"}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                {showBalance ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <Link
              to="/deposite"
              className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <BanknoteArrowUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-black">Deposite</span>
            </Link>
          </>
        ) : (
          <div className="space-y-2">
            <Link
              to="/login"
              className="block w-full text-center text-black hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-4 py-2.5"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="block w-full text-center text-white bg-ftx hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-4 py-2.5"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;
