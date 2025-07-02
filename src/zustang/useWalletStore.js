import { create } from "zustand";
import { apiURl } from "../configuration/apiconfig";

const useWalletStore = create((set) => ({
  wallet: [],
  showBalance: true,

  setShowBalance: (showBalance) => set({ showBalance: showBalance }),

  getUserWallet: async (token) => {
    try {
      const res = await fetch(`${apiURl}/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch Wallet");

      const data = await res.json();
      set({ wallet: data });
    } catch (error) {
      console.error("Fetch Wallet error:", error);
    }
  },
}));

export default useWalletStore;
