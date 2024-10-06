import deleteArea from '@/actions/deleteArea';
import { router } from 'expo-router';
import { Button, Card, Text, useTheme } from 'react-native-paper';

export default function ShortAreaCard(props: {
	areaName: string;
	areaLocation: string;
	areaImage: string;
	areaId: number;
}) {
	const theme = useTheme();
	return (
		<Card>
			<Card.Content>
				<Text variant="titleLarge">{props.areaName}</Text>
				<Text variant="bodyMedium">{props.areaLocation}</Text>
			</Card.Content>
			<Card.Cover source={{ uri: props.areaImage }} style={{ margin: 12 }} />
			<Card.Actions>
				{/* TODO: make more dangerous lol */}
				<Button
					mode={'contained-tonal'}
					buttonColor={theme.colors.errorContainer}
					onPress={() => {
						deleteArea(props.areaId).then((res) => {
							console.log(res);
						});
					}}
				>
					Delete
				</Button>
				<Button
					onPress={() => {
						router.push(`/main/terrain?id=${props.areaId}`);
					}}
				>
					Check
				</Button>
			</Card.Actions>
		</Card>
	);
}
