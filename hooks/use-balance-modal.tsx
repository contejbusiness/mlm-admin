import { create } from "zustand";

interface useBalanceModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBalanceModal = create<useBalanceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
