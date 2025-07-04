import NFTCard from "../Home/NFTCard";
import useNFTStore from "../../zustang/useNFTStore";

const NFTMarket = () => {
  const nfts = useNFTStore((state) => state.nfts);

  return (
    <>
      <section className="py-6 relative">
        <div className="w-full max-w-2xl lg:max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {nfts?.azuki?.map((item) => {
              return <NFTCard key={item.id} item={item} />;
            })}
            {nfts?.doodles?.map((item) => {
              return <NFTCard key={item.id} item={item} />;
            })}
            {nfts?.cryptopunks?.map((item) => {
              return <NFTCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default NFTMarket;
