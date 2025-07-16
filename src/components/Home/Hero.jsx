import { Link } from "react-router-dom";
import heroBackgroundVideo from "../../assets/hero-background-video.webm";

const Hero = () => {
  return (
    <div className="bg-black">
      <section className="relative min-h-screen pt-24 pb-10 sm:pt-38 sm:pb-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
          <h1 className="text-4xl text-center font-bold sm:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
              The Future of <br /> Crypto & NFT Trading
            </span>
          </h1>
          <div className="max-w-2xl mx-auto text-center">
            <p className="mt-5 text-base text-white sm:text-xl">
              Join FTX and access a world of top cryptocurrencies and unique NFT
              collections. Secure trades, low fees, and a seamless experience —
              all in one powerful platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/crypto">
              <button className="cursor-pointer bg-ftx hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Trading Now
              </button>
            </Link>
            <Link to="/nft">
              <button className="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                Explore NFTs
              </button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="cursor-pointer bg-black/20 backdrop-blur-sm rounded-lg transition-all duration-300 transform hover:scale-105 p-4">
              <div className="text-2xl font-bold text-ftx">500K+</div>
              <div className="text-sm text-gray-300">Active Users</div>
            </div>
            <div className="cursor-pointer bg-black/20 backdrop-blur-sm rounded-lg transition-all duration-300 transform hover:scale-105 p-4">
              <div className="text-2xl font-bold text-ftx">$2.5M</div>
              <div className="text-sm text-gray-300">Trading Volume</div>
            </div>
            <div className="cursor-pointer bg-black/20 backdrop-blur-sm rounded-lg transition-all duration-300 transform hover:scale-105 p-4">
              <div className="text-2xl font-bold text-ftx">200+</div>
              <div className="text-sm text-gray-300">Cryptocurrencies</div>
            </div>
            <div className="cursor-pointer bg-black/20 backdrop-blur-sm rounded-lg transition-all duration-300 transform hover:scale-105 p-4">
              <div className="text-2xl font-bold text-ftx">50K+</div>
              <div className="text-sm text-gray-300">NFT Collections</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
