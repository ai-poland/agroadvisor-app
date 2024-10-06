import Screen from '@/components/Screen';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function ChatScreen() {
	return (
		<Screen>
			<Text variant="headlineLarge">Chat</Text>
			<Text variant={'bodyMedium'}>
				Meet Ben, your new farming assistant. He's here to help you with any questions you might have
				regarding the data provided by the app as well as other farming-related topics.
			</Text>
			<View
				style={{
					alignItems: 'center',
					marginTop: 24
				}}
			>
				<Text
					style={{
						fontSize: 96
					}}
				>
					🤓
				</Text>
				<Text variant={'headlineLarge'}>Ben</Text>
				<Button icon={'chat'}>Chat</Button>
			</View>
		</Screen>
	);
}
