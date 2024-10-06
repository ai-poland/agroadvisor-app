import { api } from '@/api';
import { useEffect, useState } from 'react';

export default function useTemperatureOn2Meters(
	longitude: number,
	latitude: number,
	startDate: string,
	endDate: string
) {
	const [temperatureOn2Meters, setTemperatureOn2Meters] = useState();
	useEffect(() => {
		api
			.get(`/temperatureOn2Meters`, {
				params: {
					longitude,
					latitude,
					startDate,
					endDate
				}
			})
			.then((res) => {
				setTemperatureOn2Meters(res.data);
			})
			.catch((e) => {
				return null;
			});
	}, [temperatureOn2Meters]);
	return temperatureOn2Meters;
}
