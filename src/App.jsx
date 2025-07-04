import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useWalletStore from "./zustang/useWalletStore";
import useAuthStore from "./zustang/useAuthStore";
import useCryptoStore from "./zustang/useCryptoStore";
import useNFTStore from "./zustang/useNFTStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SBF from "./pages/SBF";
import Profile from "./pages/Profile";
import Crypto from "./pages/Crypto";
import NFT from "./pages/NFT";
import DepositeAdd from "./components/AddDeposite/DepositeAdd";
import DepositeSuccess from "./components/AddDeposite/DepositeSuccess";
import DepositeCancel from "./components/AddDeposite/DepositeCancel";

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
    if (token.length > 0 && Object.keys(wallet).length === 0) {
      getUserWallet(token);
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sbf" element={<SBF />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deposite" element={<DepositeAdd />} />
        <Route path="/deposite/success" element={<DepositeSuccess />} />
        <Route path="/deposite/cancel" element={<DepositeCancel />} />
      </Routes>
    </>
  );
};

export default App;
