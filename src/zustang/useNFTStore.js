import { create } from "zustand";
import { apiURl } from "../configuration/apiconfig";
import useWalletStore from "./useWalletStore";
import useNotificationStore from "./useNotificationStore";

const useNFTStore = create((set, get) => ({
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

  buyNft: async ({ nftId, token }) => {
    try {
      const res = await fetch(`${apiURl}/nfts/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nftId }),
      });

      if (res.status === 401) {
        useNotificationStore
          .getState()
          .showNotification(
            "error",
            "You are not logged in. Please login to continue."
          );
        return;
      }

      if (res.status === 400) {
        useNotificationStore
          .getState()
          .showNotification(
            "error",
            "Not enough funds in your wallet. Please add more to continue"
          );
      }

      if (!res.ok) throw new Error("Failed to buy NFT");

      const data = await res.json();
      console.log("Buy NFT response:", data);
      useNotificationStore
        .getState()
        .showNotification("success", "Purchase successful");

      await get().fetchNfts();
      useWalletStore.getState().getUserWallet(token);
    } catch (error) {
      console.error("Buy NFT error:", error);
    }
  },

  listNft: async ({ nftId, price, token }) => {
    try {
      const res = await fetch(`${apiURl}/nfts/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nftId, price }),
      });

      if (res.status === 401) {
        useNotificationStore
          .getState()
          .showNotification(
            "error",
            "You are not logged in. Please login to continue."
          );
        return;
      }

      if (!res.ok) throw new Error("Failed to list NFT");

      const data = await res.json();
      console.log("List NFT response:", data);
      useNotificationStore
        .getState()
        .showNotification("success", "NFT listed for sale successfully");

      await get().fetchNfts();
      useWalletStore.getState().getUserWallet(token);
    } catch (error) {
      console.error("List NFT error:", error);
      useNotificationStore
        .getState()
        .showNotification("error", "Error listing NFT for sale.");
    }
  },

  unlistNft: async ({ nftId, token }) => {
    try {
      const res = await fetch(`${apiURl}/nfts/unlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nftId }),
      });

      if (res.status === 401) {
        useNotificationStore
          .getState()
          .showNotification(
            "error",
            "You are not logged in. Please login to continue."
          );
        return;
      }

      if (!res.ok) throw new Error("Failed to unlist NFT");

      const data = await res.json();
      console.log("Unlist NFT response:", data);
      useNotificationStore
        .getState()
        .showNotification("success", "NFT unlisted successfully");

      await get().fetchNfts();
      useWalletStore.getState().getUserWallet(token);
    } catch (error) {
      console.error("Unlist NFT error:", error);
      useNotificationStore
        .getState()
        .showNotification("error", "Error unlisting NFT.");
    }
  },
}));

export default useNFTStore;
