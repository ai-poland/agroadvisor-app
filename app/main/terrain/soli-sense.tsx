import FullMetricDisplay from '@/components/FullMetricDisplay';
import Screen from '@/components/Screen';
import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Text, useTheme } from 'react-native-paper';

export default function SoliSense() {
	const theme = useTheme();
	const [displayedMetric, setDisplayedMetric] = useState('soil-moisture');

	return (
		<Screen scrollable>
			<View style={{ gap: 12 }}>
				<View>
					<Text variant="headlineLarge">SoliSense</Text>
					<Text variant="bodyMedium">
						All the information you need to know about soil conditions in your area
					</Text>
				</View>
				<SegmentedButtons
					value={displayedMetric}
					onValueChange={setDisplayedMetric}
					buttons={[
						{
							value: 'soil-moisture',
							label: 'Soil Moisture',
							icon: 'water-percent'
						},
						{
							value: 'soil-temperature',
							label: 'Soil Temperature',
							icon: 'thermometer'
						}
					]}
					style={{ backgroundColor: theme.colors.background }}
				/>
				{displayedMetric === 'soil-moisture' && (
					<FullMetricDisplay
						currentValue={{
							name: 'Soil Moisture',
							value: 45,
							unit: '%'
						}}
						previousMonth={{
							labels: ['07.10', '08.10', '09.10', '10.10', '11.10', '12.10'],
							data: [40, 42, 38, 35, 45, 43],
							ySuffix: '%',
							summary: {
								icon: 'arrow-up',
								text: '12% higher than last month on average'
							}
						}}
						next16Days={{
							labels: ['13.10', '14.10', '15.10', '16.10', '17.10', '18.10'],
							data: [44, 46, 43, 40, 42, 41],
							ySuffix: '%',
							summary: {
								icon: 'arrow-down',
								text: '8% lower than last month on average'
							}
						}}
					/>
				)}
				{displayedMetric === 'soil-temperature' && (
					<FullMetricDisplay
						currentValue={{
							name: 'Soil Temperature',
							value: 22,
							unit: '°C'
						}}
						previousMonth={{
							labels: ['07.10', '08.10', '09.10', '10.10', '11.10', '12.10'],
							data: [20, 21, 19, 18, 22, 21],
							ySuffix: '°C',
							summary: {
								icon: 'arrow-up',
								text: '3°C higher than last month on average'
							}
						}}
						next16Days={{
							labels: ['13.10', '14.10', '15.10', '16.10', '17.10', '18.10'],
							data: [21, 23, 22, 20, 19, 18],
							ySuffix: '°C',
							summary: {
								icon: 'arrow-down',
								text: '2°C lower than last month on average'
							}
						}}
					/>
				)}
			</View>
		</Screen>
	);
}
