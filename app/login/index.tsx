import Screen from '@/components/Screen';
import { Link, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function LoginScreen() {
	const theme = useTheme();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({
		username: false,
		password: false
	});
	useEffect(() => {
		if (username !== '') {
			setError((prev) => ({ ...prev, username: false }));
		}
		if (password !== '') {
			setError((prev) => ({ ...prev, password: false }));
		}
	}, [username, password]);
	return (
		<Screen
			style={{
				paddingTop: 40,
				justifyContent: 'space-between'
			}}
		>
			<View>
				<Text variant={'headlineLarge'} style={{}}>
					Welcome Back
				</Text>
				<Text variant={'bodyMedium'} style={{}}>
					Enter your credentials to continue
				</Text>
				<Text variant={'bodyMedium'} style={{}}>
					Don't have an account yet?{' '}
					<Link
						// TODO: register
						href={'/register'}
						style={{
							fontWeight: 'bold',
							color: theme.colors.primary
						}}
					>
						Sign Up
					</Link>
				</Text>
			</View>
			<View
				style={{
					gap: 12
				}}
			>
				<TextInput
					error={error.username}
					label="Login"
					mode={'outlined'}
					value={username}
					onChangeText={setUsername}
				/>
				<TextInput
					error={error.password}
					label="Password"
					mode={'outlined'}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
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
						if (username === '') {
							setError((prev) => ({ ...prev, username: true }));
						}
						if (password === '') {
							setError((prev) => ({ ...prev, password: true }));
						}
						// TODO change to real functionality
						SecureStore.setItem(
							'user',
							JSON.stringify({
								username: 'string',
								password: 'string',
								name: 'John'
							})
						);
						router.push('/main');
					}}
				>
					Log In
				</Button>
			</View>
		</Screen>
	);
}
