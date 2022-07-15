import create from "zustand";

type IUi = {
  enabledFeatures: string[];
  setFeatures: (features: string[]) => void;
  menuFeatures: string[];
  setMenuFeatures: (features: string[]) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

export const uiContext = create<IUi>((set) => ({
  showModal: false,
  enabledFeatures: [],
  menuFeatures: [],
  setShowModal: (showModal: boolean) =>
    set((state) => ({ ...state, showModal })),
  setMenuFeatures: (features: string[]) =>
    set((state) => ({ ...state, menuFeatures: features })),
  setFeatures: (features: string[]) =>
    set((state) => ({ ...state, enabledFeatures: features })),
}));
