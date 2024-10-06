import { ReactNode } from 'react';
import { Card, Icon, Text, useTheme } from 'react-native-paper';

export default function Tip(props: { children: ReactNode }) {
	const theme = useTheme();
	return (
		<Card>
			<Card.Content
				style={{
					gap: 6,
					flexDirection: 'row'
				}}
			>
				<Icon size={24} source={'lightbulb'} color={theme.colors.primary} />
				<Text
					variant={'bodyMedium'}
					style={{
						flexWrap: 'wrap',
						flexShrink: 1
					}}
				>
					{props.children}
				</Text>
			</Card.Content>
		</Card>
	);
}
