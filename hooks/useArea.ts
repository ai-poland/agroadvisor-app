import { api } from '@/api';
import { Area } from '@/types/area';
import { useEffect, useState } from 'react';

export default function useArea(areaId: number) {
	const [area, setArea] = useState<Area>();
	useEffect(() => {
		api
			.get(`/api/db/area/${areaId}`)
			.then((res) => {
				setArea(res.data);
			})
			.catch((e) => {
				return null;
			});
	}, [areaId]);
	return area;
}
