import { ReactNode } from 'react';
import { View } from 'react-native';

export default function IconText(props: { icon: ReactNode; text: ReactNode }) {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 6
			}}
		>
			{props.icon}
			{props.text}
		</View>
	);
}
