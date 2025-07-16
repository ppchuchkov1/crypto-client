import { create } from "zustand";
import { apiURl } from "../configuration/apiconfig";
import useAuthStore from "./useAuthStore";

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

      if (res.status === 403) {
        useAuthStore.setState({ isExpireToken: true });
        return;
      }

      const data = await res.json();
      set({ wallet: data });
    } catch (error) {
      console.error("Fetch Wallet error:", error);
    }
  },

  depositeToWalletWithStripe: async (token, amount) => {
    try {
      const res = await fetch(
        "https://ppchu.com/api/wallet/create-deposit-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      );

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Fetch Wallet error:", error);
    }
  },
}));

export default useWalletStore;
