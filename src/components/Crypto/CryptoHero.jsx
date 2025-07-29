import { Star } from "lucide-react";
import cryptoCoinsBg from "../../assets/crypto-coins-background.webp";

const CryptoHero = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-[-50] bg-black">
        <div
          className="absolute inset-0  bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${cryptoCoinsBg})`,
          }}
        ></div>
        <div
          className="absolute inset-0 scale-x-[-1] opacity-60 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${cryptoCoinsBg})`,
          }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-20 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-50">
              Trusted by 50M+ traders worldwide
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="block text-white">The future of</span>
            <span className="block text-white">Crypto trading</span>
          </h1>

          <p className="text-lg text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Trade Bitcoin, Ethereum, and 500+ cryptocurrencies with zero fees.
            Advanced charts, real-time data, and institutional-grade security.
          </p>
        </div>
      </div>
    </>
  );
};

export default CryptoHero;
