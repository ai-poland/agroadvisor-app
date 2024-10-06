import { View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

export default function OverviewMetric(props: { icon: string; value: string; label: string }) {
	const theme = useTheme();
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 6
				}}
			>
				<Icon source={props.icon} size={28} color={theme.colors.primary} />
				<Text variant={'bodyLarge'}>{props.label}</Text>
			</View>
			<Text variant={'bodyLarge'}>{props.value}</Text>
		</View>
	);
}
