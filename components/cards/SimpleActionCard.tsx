import { Button, Card, Text } from 'react-native-paper';

export default function SimpleActionCard(props: {
	title: string;
	description: string;
	icon: string;
	onPress: () => void;
	action: string;
}) {
	return (
		<Card>
			<Card.Content>
				<Text variant="titleLarge">{props.title}</Text>
				<Text variant="bodyMedium">{props.description}</Text>
			</Card.Content>
			<Card.Actions>
				<Button icon={props.icon} onPress={props.onPress}>
					{props.action}
				</Button>
			</Card.Actions>
		</Card>
	);
}
