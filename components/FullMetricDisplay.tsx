import IconText from '@/components/IconText';
import MetricChart from '@/components/MetricChart';
import { View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

export default function FullMetricDisplay(props: {
	currentValue: {
		name: string;
		value: number;
		unit: string;
	};
	previousMonth: {
		labels: string[];
		data: number[];
		ySuffix: string;
		summary: {
			icon: string;
			text: string;
		};
	};
	next16Days: {
		labels: string[];
		data: number[];
		ySuffix: string;
		summary: {
			icon: string;
			text: string;
		};
	};
}) {
	const theme = useTheme();
	return (
		<View style={{ gap: 12 }}>
			<View style={{ alignItems: 'center' }}>
				<IconText
					icon={<Icon size={26} source={'weather-rainy'} color={theme.colors.primary} />}
					text={
						<Text variant={'bodyLarge'}>
							Current {props.currentValue.name}: {props.currentValue.value}
							{props.currentValue.unit}
						</Text>
					}
				/>
			</View>
			<View>
				<Text variant="titleLarge">Previous month</Text>
				<MetricChart
					labels={props.previousMonth.labels}
					data={props.previousMonth.data}
					ySuffix={props.previousMonth.ySuffix}
				/>

				<IconText
					icon={
						<Icon size={20} source={props.previousMonth.summary.icon} color={theme.colors.primary} />
					}
					text={<Text variant={'bodyLarge'}>{props.previousMonth.summary.text}</Text>}
				/>
			</View>
			<View>
				<Text variant="titleLarge">Next 16 days (predicted)</Text>
				<MetricChart
					labels={props.next16Days.labels}
					data={props.next16Days.data}
					ySuffix={props.next16Days.ySuffix}
				/>
				<IconText
					icon={<Icon size={20} source={props.next16Days.summary.icon} color={theme.colors.primary} />}
					text={<Text variant={'bodyLarge'}>{props.next16Days.summary.text}</Text>}
				/>
			</View>
		</View>
	);
}
