import useNFTStore from "../../zustang/useNFTStore";
import NFTCard from "../Home/NFTCard";

const NFTMarket = ({ searchTerm }) => {
  const nfts = useNFTStore((state) => state.nfts);

  const filteredNFTs = nfts?.filter((nft) =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-6 relative">
      <div className="w-full max-w-2xl lg:max-w-7xl px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredNFTs?.map((item) => (
            <NFTCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NFTMarket;
