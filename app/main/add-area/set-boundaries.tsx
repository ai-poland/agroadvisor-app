import { api } from '@/api';
import Screen from '@/components/Screen';
import useSecureStoreUser from '@/hooks/useSecureStoreUser';
import * as Location from 'expo-location';
import { router, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Text } from 'react-native-paper';
export default function AddTerrainSetBoundaries() {
	const [pin, setPin] = useState({ longitude: 0, latitude: 0 });
	const [userLocation, setUserLocation] = useState({
		// Default to San Francisco
		latitude: 37.78825,
		longitude: -122.4324
	});
	const [visibleRegion, setVisibleRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	});
	const scheme = useColorScheme();
	const [status, requestPermission] = Location.useForegroundPermissions();
	const { name } = useGlobalSearchParams();
	const user = useSecureStoreUser();

	useEffect(() => {
		if (status?.granted) {
			Location.getCurrentPositionAsync({}).then((location) => {
				setUserLocation(location.coords);
			});
		} else {
			requestPermission().then((result) => {
				if (!result.granted) {
					setUserLocation({
						latitude: 37.78825,
						longitude: -122.4324
					});
				} else {
					Location.getCurrentPositionAsync({}).then((location) => {
						setUserLocation(location.coords);
					});
				}
			});
		}
	}, [status]);
	return (
		<Screen
			style={{
				paddingLeft: 0,
				paddingRight: 0,
				paddingTop: 20,
				gap: 12
			}}
		>
			<View
				style={{
					paddingLeft: 12,
					paddingRight: 12
				}}
			>
				<Text variant={'headlineLarge'}>Choose the boundaries</Text>
				<Text variant={'bodyMedium'}>Long press on the map to set the marker.</Text>
			</View>
			<MapView
				userInterfaceStyle={scheme === 'dark' ? 'dark' : 'light'}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 2,
					longitudeDelta: 2
				}}
				region={visibleRegion}
				style={{
					width: '100%',
					height: '80%'
				}}
				onRegionChangeComplete={setVisibleRegion}
				onLongPress={(e) => setPin(e.nativeEvent.coordinate)}
			>
				<Marker draggable coordinate={pin} onDragEnd={(e) => setPin(e.nativeEvent.coordinate)} />
			</MapView>
			<View
				style={{
					flexDirection: 'row',
					gap: 24,
					paddingLeft: 12,
					paddingRight: 12
				}}
			>
				<Button
					mode={'outlined'}
					style={{ flex: 1 }}
					onPress={() => {
						setVisibleRegion({
							latitude: userLocation.latitude,
							longitude: userLocation.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						});
					}}
					icon={'crosshairs-gps'}
				>
					My location
				</Button>
				<Button
					mode={'contained'}
					disabled={pin.latitude === 0}
					style={{ flex: 1 }}
					icon={'map-marker-plus'}
					onPress={() => {
						api
							.post('/api/db/area', {
								name: name,
								latitude: pin.latitude,
								longitude: pin.longitude,
								user_login: user?.username,
								location: 'Poland'
							})
							.then(() => {
								router.push('/main/profile');
							});
					}}
				>
					Select and add
				</Button>
			</View>
		</Screen>
	);
}
