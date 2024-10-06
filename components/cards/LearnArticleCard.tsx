import { router } from 'expo-router';
import { Button, Card, Text } from 'react-native-paper';

export default function LearnArticleCard(props: {
	article: {
		id: string;
		title: string;
		subtitle: string;
		image: string;
	};
}) {
	return (
		<Card>
			<Card.Content>
				<Text variant="titleLarge">{props.article.title}</Text>
				<Text variant="bodyMedium">{props.article.subtitle} </Text>
			</Card.Content>
			<Card.Cover source={{ uri: props.article.image }} style={{ margin: 12 }} />
			<Card.Actions>
				{/* TODO: make more dangerous lol */}
				<Button
					mode={'contained'}
					onPress={() => {
						router.push(`/main/learn/article?id=${props.article.id}`);
					}}
				>
					Read more
				</Button>
			</Card.Actions>
		</Card>
	);
}
