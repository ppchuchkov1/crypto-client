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

  updateSlotBalance: async (token, betAmount, winAmount, isWin) => {
    try {
      const res = await fetch(`${apiURl}/wallet/slot-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ betAmount, winAmount, isWin }),
      });

      if (res.status === 403) {
        useAuthStore.setState({ isExpireToken: true });
        return null;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update balance");
      }

      const data = await res.json();

      // Обновяваме локалния wallet state
      set((state) => ({
        wallet: {
          ...state.wallet,
          usdBalance: data.newBalance,
        },
      }));

      return data;
    } catch (error) {
      console.error("Update slot balance error:", error);
      throw error;
    }
  },
}));

export default useWalletStore;
