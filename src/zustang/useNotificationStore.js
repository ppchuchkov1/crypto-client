import { create } from "zustand";

const useNotificationStore = create((set) => ({
  isVisible: false,
  message: "",
  type: "info",

  showNotification: (type, message) => {
    set({ type, message, isVisible: true });

    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
}));

export default useNotificationStore;
