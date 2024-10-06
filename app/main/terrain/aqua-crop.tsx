import FullMetricDisplay from '@/components/FullMetricDisplay';
import Screen from '@/components/Screen';
import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Text, useTheme } from 'react-native-paper';
const params = {
	latitude: 41.85,
	longitude: -87.65,
	hourly: ['relative_humidity_2m', 'precipitation_probability'],
	past_days: 31,
	forecast_days: 16
};
export default function AquaCrop() {
	const theme = useTheme();
	const [displayedMetric, setDisplayedMetric] = useState('humidity');
	// const [weatherData, setWeatherData] = useState<WeatherData>();
	// const url = 'https://api.open-meteo.com/v1/forecast';
	// useEffect(() => {
	// 	fetchWeatherData(params).then((data) => {
	// 		setWeatherData(processWeatherData(data, params));
	// 		console.log(data);
	// 	});
	// }, []);
	return (
		<Screen scrollable>
			<View style={{ gap: 12 }}>
				<View>
					<Text variant="headlineLarge">AquaCrop</Text>
					<Text variant={'bodyMedium'}>
						All the information you need to know about water in your area
					</Text>
				</View>
				<SegmentedButtons
					value={displayedMetric}
					onValueChange={setDisplayedMetric}
					buttons={[
						{
							value: 'humidity',
							label: 'Humidity',
							icon: 'water-percent'
						},
						{
							value: 'precipitation',
							label: 'Precipitation',
							icon: 'weather-rainy'
						}
					]}
				/>
				{displayedMetric === 'humidity' && (
					<FullMetricDisplay
						currentValue={{
							name: 'Humidity',
							value: 96,
							unit: '%'
						}}
						previousMonth={{
							labels: ['07.10', '08.10', '09.10', '10.10', '11.10', '12.10'],
							data: [95, 90, 89, 85, 92, 89],
							ySuffix: '%',
							summary: {
								icon: 'arrow-up',
								text: '50% higher than last month on average'
							}
						}}
						next16Days={{
							labels: ['13.10', '14.10', '15.10', '16.10', '17.10', '18.10'],
							data: [95, 90, 89, 85, 92, 89],
							ySuffix: ' %',
							summary: {
								icon: 'arrow-down',
								text: '38% down than last month on average'
							}
						}}
					/>
				)}
				{displayedMetric === 'precipitation' && (
					<FullMetricDisplay
						currentValue={{
							name: 'Precipitation',
							value: 11,
							unit: ' mm'
						}}
						previousMonth={{
							labels: ['07.10', '08.10', '09.10', '10.10', '11.10', '12.10'],
							data: [11, 10, 9, 0, 3, 4],
							ySuffix: ' mm',
							summary: {
								icon: 'arrow-up',
								text: '45% higher than last month on average'
							}
						}}
						next16Days={{
							labels: ['13.10', '14.10', '15.10', '16.10', '17.10', '18.10'],
							data: [3, 2, 1, 8, 6, 3],
							ySuffix: ' mm',
							summary: {
								icon: 'arrow-down',
								text: '18% down than last month on average'
							}
						}}
					/>
				)}
			</View>
		</Screen>
	);
}
