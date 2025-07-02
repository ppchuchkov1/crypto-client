import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiURl } from "../configuration/apiconfig";

const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      userId: "",
      email: "",

      login: async (email, password) => {
        try {
          const res = await fetch(`${apiURl}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) throw new Error("Login failed");

          const data = await res.json();

          set({
            token: data.token,
            userId: data.userId,
            email: data.email,
          });
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
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
