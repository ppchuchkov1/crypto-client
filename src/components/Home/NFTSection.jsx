import { Link } from "react-router-dom";
import useNFTStore from "../../zustang/useNFTStore";
import ethImg from "../../assets/nft-section-eth.png";
import nftFirstMonkeyImg from "../../assets/nft-monkey-1.png";
import nftSecondMonkeyImg from "../../assets/nft-monkey-2.png";
import NFTCard from "./NFTCard";

const NFTSection = () => {
  const nfts = useNFTStore((state) => state.nfts);

  return (
    <>
      <section className="pb-4 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
            <div className="relative w-full h-auto md:col-span-2">
              <div className="bg-gray-800 rounded-lg flex  justify-between flex-row flex-wrap">
                <div className="p-5  xl:p-8 w-full md:w-1/2 ">
                  <h3 className="text-lg font-bold xl:text-xl text-white py-5 w-full xl:w-64 text-center xl:text-left">
                    Accomplish tasks swiftly with online tools.
                  </h3>
                  <p className="text-xs font-normal text-gray-300 w-full mb-8 xl:w-64 text-center xl:text-left">
                    Get quoted and covered in under 10 minutes online. no
                    paperwork or waiting any more
                  </p>

                  <Link to="/nft">
                    <div className="flex justify-center sm:justify-start">
                      <button className="cursor-pointer py-2 px-5 border border-solid border-gray-300 rounded-lg gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
                        View More
                      </button>
                    </div>
                  </Link>
                </div>
                <div className="relative h-auto md:w-1/2">
                  <img
                    src={ethImg}
                    alt="Etherium"
                    className="h-full ml-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="relative w-full h-auto sm:block hidden">
              <div
                style={{
                  backgroundImage: `url(${nftFirstMonkeyImg})`,
                }}
                className="bg-ftx bg-cover rounded-lg p-5 xl:p-8 h-full"
              >
                <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
                  Build wealth with insurance planning
                </h3>
              </div>
            </div>
            <div className="relative w-full h-auto sm:block hidden">
              <div
                style={{
                  backgroundImage: `url(${nftSecondMonkeyImg})`,
                }}
                className="bg-ftx bg-cover rounded-lg p-5 xl:p-8 h-full"
              >
                <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
                  Build wealth with insurance planning
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 relative">
        <div className="w-full max-w-2xl lg:max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {nfts?.map((item) => {
              return <NFTCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default NFTSection;
