import Screen from '@/components/Screen';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function AddTerrainIntroduction() {
	return (
		<Screen style={{ justifyContent: 'space-between' }}>
			<View>
				<Text variant="headlineLarge">You're about to add a terrain to your account</Text>
				<Text variant={'bodyMedium'}>Read the following tips to continue</Text>
			</View>
			<View style={{ gap: 12 }}>
				<Text style={{ marginBottom: 'auto', marginTop: 'auto' }} variant={'bodyLarge'}>
					🧠 Configure a friendly name for your terrain, one that you can easily remember.
				</Text>
				<Text style={{ marginBottom: 'auto', marginTop: 'auto' }} variant={'bodyLarge'}>
					📐 Select the center of your terrain on the map for most optimal performance.
				</Text>
				<Text style={{ marginBottom: 'auto', marginTop: 'auto' }} variant={'bodyLarge'}>
					💡 You can later access the terrain's satellite data on the profile tab.
				</Text>
			</View>
			<View>
				<Button
					mode={'contained'}
					onPress={() => {
						router.push('/main/add-area/set-name');
					}}
				>
					Continue
				</Button>
			</View>
		</Screen>
	);
}
