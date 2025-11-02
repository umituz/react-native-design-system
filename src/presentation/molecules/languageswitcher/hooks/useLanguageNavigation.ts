import { useNavigation } from '@react-navigation/native';
import { useLocalization, getLanguageByCode, getDefaultLanguage } from '@umituz/react-native-localization';

export const useLanguageNavigation = (navigationScreen: string) => {
  const navigation = useNavigation();
  const { currentLanguage } = useLocalization();
  const currentLang = getLanguageByCode(currentLanguage) || getDefaultLanguage();

  const navigateToLanguageSelection = () => {
    navigation.navigate(navigationScreen as never);
  };

  return { currentLang, navigateToLanguageSelection };
};
