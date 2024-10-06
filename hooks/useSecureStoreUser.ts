import { User } from '@/types/user';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
export default function useSecureStoreUser() {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		SecureStore.getItemAsync('user').then((user) => {
			if (user) {
				setUser(JSON.parse(user));
			}
		});
	}, []);
	return user;
}
