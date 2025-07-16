import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Eye, EyeOff, BanknoteArrowUp, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import useAuthStore from "../../zustang/useAuthStore";
import useWalletStore from "../../zustang/useWalletStore";
import MobileNavigation from "./MobileNavigation";
import ProfileAvatar from "../Profile/ProfileAvatarMenu";

const Header = () => {
  const token = useAuthStore((state) => state.token);
  const wallet = useWalletStore((state) => state.wallet);
  const showBalance = useWalletStore((state) => state.showBalance);
  const setShowBalance = useWalletStore((state) => state.setShowBalance);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center w-1/4">
            <Link to="/" className="flex items-center">
              <img src={logo} className="mr-3 h-7" alt="FTX" />
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center space-x-8 w-1/2">
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
              Wallet
            </Link>
            <Link
              to="/sbf"
              className="text-gray-800 font-bold transition-colors duration-200"
            >
              SBF
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end gap-5 w-1/4">
            {token?.length > 0 && (
              <div className="flex gap-2">
                <Link to="/profile">
                  <div className="flex items-center text-black">
                    <Wallet className="w-5 h-5 text-ftx" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium w-16 text-right">
                        {showBalance
                          ? `$${
                              wallet?.wallet?.usdBalance === undefined
                                ? "•••••••••"
                                : wallet?.wallet?.usdBalance?.toFixed(2)
                            }`
                          : "•••••••••"}
                      </span>
                    </div>
                  </div>
                </Link>
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
                <Link to="/deposite">
                  <div className="flex items-center gap-2 text-black">
                    <BanknoteArrowUp className="w-5 h-5 text-green-500" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Deposite</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {!token || token?.length === 0 ? (
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

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && <MobileNavigation setIsMenuOpen={setIsMenuOpen} />}
      </nav>
    </header>
  );
};

export default Header;
