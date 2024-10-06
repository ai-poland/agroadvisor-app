import Screen from '@/components/Screen';
import SimpleActionCard from '@/components/cards/SimpleActionCard';
import useSecureStoreUser from '@/hooks/useSecureStoreUser';
import { User } from '@/types/user';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
	const user: User | null = useSecureStoreUser();
	const theme = useTheme();
	if (!user) {
		return null;
	}
	return (
		<Screen>
			<Text variant="displayMedium">Welcome, {user.name}</Text>
			<Text variant="bodyMedium">Great to see you again, take a look at your notifications.</Text>
			<View style={{ gap: 24, marginTop: 12 }}>
				<SimpleActionCard
					title="New: Chat with Ben 🤓"
					description="Meet Ben, your farming-related questions assistant. He is there to help you with all the concerns you might have!"
					icon="chat"
					onPress={() => router.push('/main/chat')}
					action="Chat with Ben"
				/>
				<SimpleActionCard
					title="New: ML Tips"
					description="Machine-learning powered tips on how to adjust your farming practices to the current environmental conditions. Now available in area view."
					icon="account"
					onPress={() => router.push('/main/chat')}
					action="Visit your profile"
				/>
			</View>
		</Screen>
	);
}
