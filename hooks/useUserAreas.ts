import { api } from '@/api';
import { Area } from '@/types/area';
import { useEffect, useState } from 'react';

export default function useUserAreas(username: string) {
	const [userAreas, setUserAreas] = useState<Area[]>([]);
	useEffect(() => {
		api
			.get(`/api/db/area/user/${username}`)
			.then((res) => {
				setUserAreas(res.data);
			})
			.catch((e) => {
				return null;
			});
	}, [username]);
	return userAreas;
}
