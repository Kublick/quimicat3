import create from 'zustand';

type IUi = {
	enabledFeatures: string[];
	setFeatures: (features: string[]) => void;
	menuFeatures: string[];
	setMenuFeatures: (features: string[]) => void;
};

export const uiContext = create<IUi>((set) => ({
	enabledFeatures: [],
	menuFeatures: [],
	setMenuFeatures: (features: string[]) =>
		set((state) => ({ ...state, menuFeatures: features })),
	setFeatures: (features: string[]) =>
		set((state) => ({ ...state, enabledFeatures: features })),
}));
