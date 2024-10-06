import soilMoistureData from '@/articles/soil-moisture-data.json';
import Screen from '@/components/Screen';
import LearnArticleCard from '@/components/cards/LearnArticleCard';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
// Hacky solution, might fix in the future
export default function LearnTab() {
	return (
		<Screen
			style={{
				gap: 12
			}}
		>
			<View>
				<Text variant="headlineLarge">Farming Wisdom</Text>
				<Text variant={'bodyMedium'}>
					Expert tips and strategies for smarter, more efficient farming.
				</Text>
			</View>
			<ScrollView>
				<View style={{ gap: 24, marginBottom: 64 }}>
					<LearnArticleCard article={soilMoistureData} />
				</View>
			</ScrollView>
		</Screen>
	);
}
