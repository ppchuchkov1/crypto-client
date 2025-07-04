import React from "react";
import NFTHero from "../components/NFT/NFTHero";
import NFTMarket from "../components/NFT/NFTMarket";
import Header from "../components/Header";
import NFTSearch from "../components/NFT/NFTSearch";
import Footer from "../components/Footer";

const NFT = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-[-50] bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://madebydesignesia.com/themes/gigaland/images/background/7.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <Header />
      <NFTHero />
      <div className="bg-gray-50">
        <NFTSearch />
        <NFTMarket />
      </div>
      <Footer />
    </>
  );
};

export default NFT;
