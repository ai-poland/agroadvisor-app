import Screen from '@/components/Screen';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function AddTerrainSetName() {
	const [areaName, setAreaName] = useState('');
	return (
		<Screen
			style={{
				justifyContent: 'space-between'
			}}
		>
			<View>
				<Text variant="headlineLarge">Set terrain name</Text>
				<Text variant={'bodyMedium'}>Set a friendly, short and descriptive name for this terrain.</Text>
			</View>
			<View style={{ gap: 12 }}>
				<TextInput label={'Terrain name'} mode={'flat'} value={areaName} onChangeText={setAreaName} />
			</View>
			<View>
				<Button
					disabled={areaName.length === 0}
					mode={'contained'}
					onPress={() => {
						router.push(`/main/add-area/set-boundaries?name=${areaName}`);
					}}
				>
					Continue
				</Button>
			</View>
		</Screen>
	);
}
