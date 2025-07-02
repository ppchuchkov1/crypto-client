import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useWalletStore from "./zustang/useWalletStore";
import useAuthStore from "./zustang/useAuthStore";
import useCryptoStore from "./zustang/useCryptoStore";
import useNFTStore from "./zustang/useNftStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SBF from "./pages/SBF";
import Profile from "./pages/Profile";

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
        <Route path="/register" element={<Register />} />
        <Route path="/sbf" element={<SBF />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
