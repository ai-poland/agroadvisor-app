import { api } from '@/api';
import * as SecureStore from 'expo-secure-store';

export default async function deleteArea(areaId: number) {
	const user = await SecureStore.getItemAsync('user')
		.then((user) => {
			if (user) {
				return JSON.parse(user);
			}
		})
		.catch((e) => {
			return null;
		});
	if (!user) {
		return null;
	}
	const res = await api.delete(`/api/db/area/57`, {
		data: {
			username: user.name,
			password: user.password,
			id: areaId
		}
	});
	if (res.status === 200) {
		return true;
	} else {
		return res.status;
	}
}
