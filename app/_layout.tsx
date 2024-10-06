import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';

import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
	});
	const { theme } = useMaterial3Theme({ sourceColor: '#A0D57B' });
	const colorScheme = useColorScheme();

	const paperTheme = useMemo(
		() =>
			colorScheme === 'dark'
				? { ...MD3DarkTheme, colors: theme.dark }
				: { ...MD3LightTheme, colors: theme.light },
		[colorScheme, theme]
	);
	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<PaperProvider theme={paperTheme}>
			<Slot />
		</PaperProvider>
	);
}
