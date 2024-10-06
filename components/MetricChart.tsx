import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';

export default function MetricChart(props: { labels: string[]; data: number[]; ySuffix: string }) {
	const theme = useTheme();
	return (
		<LineChart
			data={{
				labels: props.labels,
				datasets: [
					{
						data: props.data
					}
				]
			}}
			width={Dimensions.get('window').width - 40} // from react-native
			height={240}
			yAxisSuffix={props.ySuffix}
			chartConfig={{
				backgroundGradientFrom: theme.colors.backdrop,
				backgroundGradientTo: theme.colors.backdrop,
				decimalPlaces: 0, // optional, defaults to 2dp
				color: () => theme.colors.primary,
				style: {},
				propsForDots: {
					r: '6',
					strokeWidth: '2',
					stroke: theme.colors.onPrimary
				}
			}}
			bezier
			withVerticalLines={false}
			withHorizontalLines={false}
			style={{
				marginVertical: 8,
				borderRadius: 16
			}}
		/>
	);
}
