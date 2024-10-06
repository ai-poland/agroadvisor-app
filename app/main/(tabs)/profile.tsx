import Screen from '@/components/Screen';
import ShortAreaCard from '@/components/cards/ShortAreaCard';
import useSecureStoreUser from '@/hooks/useSecureStoreUser';
import useUserAreas from '@/hooks/useUserAreas';
import absoluteFab from '@/styles/absoluteFab';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Avatar, FAB, Text } from 'react-native-paper';

export default function ProfileScreen() {
	const user = useSecureStoreUser();
	const userAreas = useUserAreas(user?.username || '');
	if (!user) {
		return null;
	}
	return (
		<Screen>
			<View style={{ marginLeft: 'auto', marginRight: 'auto', gap: 6 }}>
				<Avatar.Icon size={84} icon="human" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
				<Text variant="displayMedium">{user.name}</Text>
			</View>
			<ScrollView>
				<View style={{ gap: 24, marginBottom: 64 }}>
					{userAreas.map((area) => {
						return (
							<ShortAreaCard
								key={area.id}
								areaImage={
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV5EStohg45PEtcRX8rCvwddqRajVdeY4Ujg&s'
								}
								areaLocation={area.location}
								areaName={area.name}
								areaId={area.id}
							/>
						);
					})}
				</View>
			</ScrollView>
			<FAB
				icon="plus"
				style={absoluteFab.fab}
				onPress={() => router.push('/main/add-area')}
				label={'New terrain'}
			/>
		</Screen>
	);
}
