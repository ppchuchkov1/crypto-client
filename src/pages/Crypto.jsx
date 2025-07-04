import Header from "../components/Header";
import CryptoHero from "../components/Crypto/CryptoHero";
import CryptoSearch from "../components/Crypto/CryptoSearch";
import CryptoBuyTable from "../components/Crypto/CryptoBuyTable";
import Footer from "../components/Footer";
const Crypto = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-[-50] bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://enfty.tophivetheme.com/wp-content/uploads/2025/04/coin-isomatic.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="absolute inset-0 scale-x-[-1] opacity-60"
          style={{
            backgroundImage:
              "url(https://enfty.tophivetheme.com/wp-content/uploads/2025/04/coin-isomatic.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <Header />
      <CryptoHero />
      <div className="bg-gray-50">
        <CryptoSearch />

        <CryptoBuyTable />
        {/* <div className="bg-ftx w-full h-1"></div> */}
      </div>
      <Footer />
    </>
  );
};

export default Crypto;
