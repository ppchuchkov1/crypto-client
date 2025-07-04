import { Link } from "react-router-dom";
import { Wallet, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import useAuthStore from "../zustang/useAuthStore";
import useWalletStore from "../zustang/useWalletStore";
import ProfileAvatar from "./Profile/ProfileAvatarMenu";

const Header = () => {
  const token = useAuthStore((state) => state.token);
  const wallet = useWalletStore((state) => state.wallet);
  const showBalance = useWalletStore((state) => state.showBalance);
  const setShowBalance = useWalletStore((state) => state.setShowBalance);

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-7" alt="FTX" />
          </Link>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-800 font-bold transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/crypto"
              className="text-gray-800 font-bold transition-colors duration-200"
            >
              Crypto
            </Link>
            <Link
              to="/nft"
              className="text-gray-800 font-bold transition-colors duration-200"
            >
              NFT
            </Link>
            <Link
              to="/profile"
              className="text-gray-800 font-bold transition-colors duration-200"
            >
              My collections
            </Link>
            <Link
              to="/sbf"
              className="text-gray-800 font-bold transition-colors duration-200"
            >
              SBF
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-5">
            {token?.length > 0 && (
              <div className="flex gap-2">
                {/* Wallet */}
                <div className="flex items-center gap-2 text-black">
                  <Wallet className="w-5 h-5 text-ftx" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {showBalance
                        ? `$${wallet?.wallet?.usdBalance?.toFixed(2)}`
                        : "••••••"}
                    </span>
                  </div>
                </div>

                {/* Toggle visibility */}
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  {showBalance ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            {token?.length === 0 ? (
              <>
                <Link
                  to="/login"
                  className="text-black hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-ftx hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Register
                </Link>
              </>
            ) : (
              <ProfileAvatar />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
