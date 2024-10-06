import soilMoistureData from '@/articles/soil-moisture-data.json';
import Screen from '@/components/Screen';
import { router, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
export default function LearnArticle() {
	const { id } = useGlobalSearchParams();
	const [articleData, setArticleData] = useState<{
		title: string;
		subtitle: string;
		image: string;
		content: string;
	}>();
	useEffect(() => {
		if (id === 'soil-moisture-data') {
			setArticleData(soilMoistureData);
		}
	}, [id]);
	return (
		<Screen
			scrollable
			style={{
				gap: 24
			}}
		>
			{articleData && (
				<>
					<View>
						<Text variant="headlineLarge">{articleData.title || ''}</Text>
						<Text variant={'bodyLarge'}>{articleData.subtitle}</Text>
					</View>
					<Text
						variant={'bodyMedium'}
						style={{
							marginTop: 24,
							textAlign: 'justify'
						}}
					>
						{articleData.content}
					</Text>
				</>
			)}
			<Button
				mode={'contained'}
				style={{ marginTop: 24 }}
				onPress={() => {
					router.push('/main');
				}}
			>
				Go back
			</Button>
		</Screen>
	);
}
