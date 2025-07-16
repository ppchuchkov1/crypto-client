import { useState } from "react";
import Header from "../components/Header/Header";
import CryptoHero from "../components/Crypto/CryptoHero";
import CryptoSearch from "../components/Crypto/CryptoSearch";
import CryptoBuyTable from "../components/Crypto/CryptoBuyTable";
import Footer from "../components/Footer/Footer";

const Crypto = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header />
      <CryptoHero />
      <div className="bg-gray-50">
        <CryptoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CryptoBuyTable searchTerm={searchTerm} />
      </div>
      <Footer />
    </>
  );
};

export default Crypto;
