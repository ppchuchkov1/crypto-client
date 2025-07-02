import { create } from "zustand";
import { apiURl } from "../configuration/apiconfig";
import useWalletStore from "./useWalletStore";

const useCryptoStore = create((set) => ({
  crypto: [],
  selectedCrypto: {},
  buying: false,
  selling: false,

  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),

  fetchCrypto: async () => {
    try {
      const res = await fetch(`${apiURl}/crypto`);
      if (!res.ok) throw new Error("Failed to fetch Crypto");

      const data = await res.json();
      set({ crypto: data });
    } catch (error) {
      console.error("Fetch Cryptos error:", error);
    }
  },

  buyCrypto: async (token, cryptoObject) => {
    const { getUserWallet } = useWalletStore.getState();
    set({ buying: true });

    try {
      const res = await fetch(`${apiURl}/crypto/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cryptoObject),
      });

      if (!res.ok) throw new Error("Failed to buy crypto");

      const data = await res.json();
      console.log("Buy response:", data);

      await getUserWallet(token);
    } catch (error) {
      console.error("Buy Crypto error:", error);
    } finally {
      set({ buying: false });
    }
  },

  sellCrypto: async (token, cryptoObject) => {
    const { getUserWallet } = useWalletStore.getState();
    set({ selling: true });

    try {
      const res = await fetch(`${apiURl}/crypto/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cryptoObject),
      });

      if (!res.ok) throw new Error("Failed to buy crypto");

      const data = await res.json();
      console.log("Buy response:", data);

      await getUserWallet(token);
    } catch (error) {
      console.error("Buy Crypto error:", error);
    } finally {
      set({ selling: false });
    }
  },
}));

export default useCryptoStore;
