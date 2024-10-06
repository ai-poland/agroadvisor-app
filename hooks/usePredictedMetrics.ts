import { api } from '@/api';
import { useEffect, useState } from 'react';

export default function usePredictedMetrics(longitude: number, latitude: number, day: string) {
	const [predictedMetrics, setPredictedMetrics] = useState({
		rain: [],
		temperature: []
	});
	useEffect(() => {
		(async () => {
			const rain = await api
				.get(`/api/predictionRain`, {
					params: {
						longitude,
						latitude,
						day
					}
				})
				.catch((e) => {
					return null;
				});
			const temperature = await api
				.get(`/api/predictionTemperature`, {
					params: {
						longitude,
						latitude,
						day
					}
				})
				.catch((e) => {
					return null;
				});
			setPredictedMetrics({
				rain: rain?.data,
				temperature: temperature?.data
			});
		})();
	}, [predictedMetrics]);
	return predictedMetrics;
}
