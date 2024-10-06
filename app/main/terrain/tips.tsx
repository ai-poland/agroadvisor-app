import Screen from '@/components/Screen';
import Tip from '@/components/Tip';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function TerrainTipsTab() {
	return (
		<Screen style={{ gap: 12 }}>
			<View>
				<Text variant="headlineLarge">Tips</Text>
				<Text variant={'bodyMedium'}>
					Machine learning powered tips that help you adjust to the current environmental situation
				</Text>
			</View>
			<Tip>
				Prepare for dry conditions next month: Irrigate your crops twice weekly to maintain soil
				moisture and avoid heat stress during high temperatures.
			</Tip>
			<Tip>
				Soil nutrient levels dropping: Apply a balanced fertilizer early next month to boost plant
				growth and compensate for the nutrient loss caused by dry conditions.
			</Tip>
			<Tip>
				Increased pest activity expected due to dry weather: Monitor your crops closely for signs of
				infestation and consider using organic pest control measures to prevent damage.
			</Tip>
		</Screen>
	);
}
