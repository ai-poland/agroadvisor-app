import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function AddTerrainStackLayout() {
	const { colors } = useTheme();

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.primary // Set the background color from the theme
				},
				headerTintColor: colors.onPrimary // Set the text color from the theme (if you have a color for text contrast)
			}}
		>
			<Stack.Screen
				name="introduction"
				options={{
					headerTitle: 'Add terrain'
				}}
			/>
			<Stack.Screen
				name="set-name"
				options={{
					headerTitle: 'Set terrain name'
				}}
			/>
			<Stack.Screen
				name="set-boundaries"
				options={{
					headerTitle: 'Set boundaries'
				}}
			/>
		</Stack>
	);
}
