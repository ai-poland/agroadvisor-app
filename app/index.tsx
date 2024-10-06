import Screen from '@/components/Screen';
import { router } from 'expo-router';
import { Image, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
export default function HomeScreen() {
	const theme = useTheme();
	console.log(theme.colors.primary);
	return (
		<Screen
			style={{
				padding: 20,
				paddingTop: 40,
				justifyContent: 'space-between'
			}}
		>
			<View>
				<Text variant={'headlineLarge'} style={{}}>
					{`Everything starts\nwith a seed`}
				</Text>
				<Text variant={'bodyMedium'} style={{}}>
					Easy access to satellite data and weather information in your area, right in your pocket.
				</Text>
			</View>
			<Image
				source={{
					uri: 'https://media.discordapp.net/attachments/1284255588586487861/1292400327592509481/logo.png?ex=67039919&is=67024799&hm=1dda1f75ac375a7bbf9a72555008b1c0c33d6f90345f8a9dff91cd4ab3993e63&=&format=webp&quality=lossless&width=770&height=770'
				}}
				style={{ width: 300, height: 300, marginLeft: 'auto', marginRight: 'auto' }}
			/>
			<View
				style={{
					gap: 12,
					flexDirection: 'row'
				}}
			>
				<Button
					mode={'outlined'}
					onPress={() => {
						router.push('/login');
					}}
				>
					Log In
				</Button>
				<Button
					mode={'contained'}
					onPress={() => {
						// TODO: register
						router.push('/register');
					}}
				>
					Get Started
				</Button>
			</View>
		</Screen>
	);
}
