import { uiContext } from '../store/uiSlice';

export const useFeatureToggle = () => {
	const { enabledFeatures } = uiContext();

	// console.log('enabledFeatures', enabledFeatures);

	const isEnabled = (featureName: string) => {
		if (enabledFeatures.includes('manage')) {
			return true;
		}
		return enabledFeatures.includes(featureName);
	};

	return [isEnabled];
};
