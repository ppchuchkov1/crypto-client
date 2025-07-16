import { useState } from "react";
import useWalletStore from "../../zustang/useWalletStore";
import ProfileNFTCard from "./ProfileNFTCard";
import ProfileNFTSellModal from "./ProfileNFTSellModal";

const ProfileNFT = () => {
  const wallet = useWalletStore((state) => state.wallet);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [openSellNFTModal, setOpenNFTModal] = useState(false);

  const closeSellNFTModal = () => {
    setOpenNFTModal(false);
  };

  return (
    <>
      <ProfileNFTSellModal
        isOpen={openSellNFTModal}
        onClose={closeSellNFTModal}
        selectedNFT={selectedNFT}
      />
      <section className="py-6 relative">
        <div className="w-full max-w-2xl lg:max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {wallet?.wallet?.nfts?.map((item) => {
              return (
                <ProfileNFTCard
                  setOpenNFTModal={setOpenNFTModal}
                  setSelectedNFT={setSelectedNFT}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileNFT;
