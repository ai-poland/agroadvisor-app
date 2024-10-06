import { api } from '@/api';
import { useEffect, useState } from 'react';

export default function useSoilMoisture(
	longitude: number,
	latitude: number,
	startDate: string,
	endDate: string
) {
	const [soilMoisture, setSoilMoisture] = useState();
	useEffect(() => {
		api
			.get(`/SoilMoisture`, {
				params: {
					longitude,
					latitude,
					startDate,
					endDate
				}
			})
			.then((res) => {
				console.log(res.data);
				setSoilMoisture(res.data);
			})
			.catch((e) => {
				console.log(e);
				return null;
			});
	}, []);
	return soilMoisture;
}
