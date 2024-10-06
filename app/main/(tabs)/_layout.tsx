import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';

export default function TabLayout() {
	const theme = useTheme();
	return (
		<Tabs
			sceneContainerStyle={{
				backgroundColor: theme.colors.background,
				flex: 1
			}}
			screenOptions={{
				headerShown: false
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					navigationState={state}
					safeAreaInsets={insets}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(route.name, route.params),
								target: state.key
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({ focused, color, size: 24 });
						}
						return null;
					}}
					// @ts-ignore
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						return options.tabBarLabel !== undefined ? options.tabBarLabel : options.title;
					}}
				/>
			)}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ focused, color, size }) =>
						focused ? (
							<MaterialCommunityIcons name="home" color={color} size={size} />
						) : (
							<MaterialCommunityIcons name="home-outline" color={color} size={size} />
						)
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					title: 'Chat',
					tabBarIcon: ({ focused, color, size }) =>
						focused ? (
							<MaterialCommunityIcons name="chat" color={color} size={size} />
						) : (
							<MaterialCommunityIcons name="chat-outline" color={color} size={size} />
						)
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ focused, color, size }) =>
						focused ? (
							<MaterialCommunityIcons name="account" color={color} size={size} />
						) : (
							<MaterialCommunityIcons name="account-outline" color={color} size={size} />
						)
				}}
			/>
			<Tabs.Screen
				name="learn"
				options={{
					title: 'Learn',
					tabBarIcon: ({ focused, color, size }) =>
						focused ? (
							<MaterialCommunityIcons name="school" color={color} size={size} />
						) : (
							<MaterialCommunityIcons name="school-outline" color={color} size={size} />
						)
				}}
			/>
		</Tabs>
	);
}
