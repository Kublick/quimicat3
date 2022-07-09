import { uiContext } from '../store/uiSlice';

export const useMenuToggle = () => {
	const { menuFeatures } = uiContext();

	const isMenuEnabled = (menuFeatureName: string) => {
		if (menuFeatures.includes('manage')) {
			return true;
		}
		return menuFeatures.includes(menuFeatureName);
	};

	return [isMenuEnabled];
};
