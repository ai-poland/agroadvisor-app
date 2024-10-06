import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Screen(props: {
	children: ReactNode;
	style?: ViewStyle;
	scrollable?: boolean;
}) {
	const theme = useTheme();
	return (
		<SafeAreaView
			style={{
				backgroundColor: theme.colors.background,
				padding: 20,
				paddingTop: 30,
				flex: 1,
				...props.style
			}}
		>
			<StatusBar style={'light'} translucent={false} backgroundColor={theme.colors.background} />
			{props.scrollable ? <ScrollView>{props.children}</ScrollView> : props.children}
		</SafeAreaView>
	);
}
