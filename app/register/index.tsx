import Screen from '@/components/Screen';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function RegisterScreen() {
	const theme = useTheme();
	return (
		<Screen
			style={{
				paddingTop: 40,
				justifyContent: 'space-between'
			}}
		>
			<View>
				<Text variant={'headlineLarge'} style={{}}>
					Register to AgroAdviser
				</Text>
				<Text variant={'bodyMedium'} style={{}}>
					Create an account to access satellite information in your area and expand your farming
					knowledge.
				</Text>
			</View>
			<View
				style={{
					gap: 12
				}}
			>
				<TextInput label="First Name" mode={'outlined'} />
				<TextInput label="Login" mode={'outlined'} />
				<TextInput label="Password" mode={'outlined'} secureTextEntry />
			</View>
			<View
				style={{
					gap: 12,
					flexDirection: 'row'
				}}
			>
				<Button
					mode={'contained'}
					onPress={() => {
						// TODO change to real functionality
						router.push('/main');
					}}
				>
					Sign up
				</Button>
			</View>
		</Screen>
	);
}
