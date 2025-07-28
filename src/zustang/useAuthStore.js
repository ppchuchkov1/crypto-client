import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiURl } from "../configuration/apiconfig";
import useWalletStore from "./useWalletStore";
import useNotificationStore from "./useNotificationStore";

const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      userId: "",
      email: "",
      isExpireToken: false,
      unathorized: false,

      setIsExpireToken: (value) => set({ isExpireToken: value }),

      login: async (email, password) => {
        try {
          const res = await fetch(`${apiURl}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            useNotificationStore
              .getState()
              .showNotification("error", "Wrong email or password");
            return;
          }

          const data = await res.json();

          set({
            token: data.token,
            userId: data.userId,
            email: data.email,
          });

          useWalletStore.getState().getUserWallet(data.token);

          set({ isExpireToken: false });
        } catch (error) {
          console.error("Login error:", error);
        }
      },

      register: async (email, password) => {
        try {
          const res = await fetch(`${apiURl}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) throw new Error("Registration failed");

          const data = await res.json();

          set({
            token: data.token,
            userId: data.userId,
            email: data.email,
          });
          useWalletStore.getState().getUserWallet(data.token);
          set({ isExpireToken: false });
        } catch (error) {
          console.error("Registration error:", error);
          throw error;
        }
      },

      logout: () => {
        set({
          token: "",
          userId: "",
          email: "",
        });
        set({ isExpireToken: false });

        window.location.reload();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
