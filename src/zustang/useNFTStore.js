import { create } from "zustand";
import { apiURl } from "../configuration/apiconfig";

const useNFTStore = create((set) => ({
  nfts: [],

  fetchNfts: async () => {
    try {
      const res = await fetch(`${apiURl}/nfts`);
      if (!res.ok) throw new Error("Failed to fetch NFTs");

      const data = await res.json();
      set({ nfts: data });
    } catch (error) {
      console.error("Fetch NFTs error:", error);
    }
  },
}));

export default useNFTStore;
