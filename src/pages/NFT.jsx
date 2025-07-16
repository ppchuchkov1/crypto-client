import { useState } from "react";
import NFTHero from "../components/NFT/NFTHero";
import NFTMarket from "../components/NFT/NFTMarket";
import Header from "../components/Header/Header";
import NFTSearch from "../components/NFT/NFTSearch";
import Footer from "../components/Footer/Footer";

const NFT = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header />
      <NFTHero />
      <div className="bg-gray-50">
        <NFTSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <NFTMarket searchTerm={searchTerm} />
      </div>
      <Footer />
    </>
  );
};

export default NFT;
