import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useWalletStore from "./zustang/useWalletStore";
import useAuthStore from "./zustang/useAuthStore";
import useCryptoStore from "./zustang/useCryptoStore";
import useNFTStore from "./zustang/useNFTStore";
import ProtectedRoute from "./guards/ProtectedRoute";
import GuestRoute from "./guards/GuestRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SBF from "./pages/SBF";
import Profile from "./pages/Profile";
import Crypto from "./pages/Crypto";
import NFT from "./pages/NFT";
import DepositeSuccess from "./components/AddDeposite/DepositeSuccess";
import DepositeCancel from "./components/AddDeposite/DepositeCancel";
import Deposite from "./pages/Deposite";
import ExpireTokenModal from "./components/ExpireToken/ExpireTokenModal";
import Notification from "./UI/Notification";

const App = () => {
  const token = useAuthStore((state) => state.token);
  const wallet = useWalletStore((state) => state.wallet);
  const fetchCrypto = useCryptoStore((state) => state.fetchCrypto);
  const fetchNfts = useNFTStore((state) => state.fetchNfts);
  const getUserWallet = useWalletStore((state) => state.getUserWallet);

  useEffect(() => {
    fetchCrypto();
  }, []);

  useEffect(() => {
    fetchNfts();
  }, []);

  useEffect(() => {
    if (token?.length > 0 && Object.keys(wallet).length === 0) {
      getUserWallet(token);
    }
  }, [token]);

  return (
    <>
      <ExpireTokenModal />
      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/sbf" element={<SBF />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposite"
          element={
            <ProtectedRoute>
              <Deposite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposite/success"
          element={
            <ProtectedRoute>
              <DepositeSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposite/cancel"
          element={
            <ProtectedRoute>
              <DepositeCancel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
