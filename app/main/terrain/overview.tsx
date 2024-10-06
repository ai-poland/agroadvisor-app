import OverviewMetric from '@/components/OverviewMetric';
import Screen from '@/components/Screen';
import SimpleActionCard from '@/components/cards/SimpleActionCard';
import useArea from '@/hooks/useArea';
import { router, useGlobalSearchParams } from 'expo-router';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text } from 'react-native-paper';
// @ts-ignore
export default function TerrainOverviewTab() {
	const { id } = useGlobalSearchParams();
	const area = useArea(parseInt(id as string));
	console.log(area);
	// Unfortunately there was not enough time to request custom API keys for prediction services
	// hence we had to improvise to provide a temporary prototype solution
	//const date = moment().subtract(7, 'days').format('YYYYMMDD');
	//const soilMoisture = useSoilMoisture(area?.longitude || 0, area?.latitude || 0, date, date);

	if (!area) {
		return null;
	}

	return (
		<Screen scrollable>
			<View style={{ gap: 24 }}>
				<View>
					<Text variant="headlineLarge">{area.name}</Text>
					<Text variant={'bodyMedium'}>{area.location}</Text>
				</View>
				<MapView
					initialRegion={{
						latitude: area.latitude,
						longitude: area.longitude,
						latitudeDelta: 0.09,
						longitudeDelta: 0.09
					}}
					style={{
						width: '100%',
						height: 300
					}}
				>
					<Marker
						coordinate={{ latitude: area.latitude, longitude: area.longitude }}
						title={area.name}
					/>
				</MapView>
				<OverviewMetric icon={'weather-pouring'} value={'12 mm'} label={'Precipation'} />
				<OverviewMetric icon={'grass'} value={`20%`} label={'Soil moisture'} />
				<OverviewMetric icon={'snowflake'} value={'18 °C'} label={'Soil temperature'} />
				<OverviewMetric icon={'sun-thermometer'} value={'22 °C'} label={'Air Temperature'} />
				<OverviewMetric icon={'cloud-outline'} value={'Cloudy'} label={'Weather'} />
				<SimpleActionCard
					title={'You have new tips available'}
					description={"We've prepared some suggestions based on next month's forecast, check them out."}
					icon={'lightbulb-multiple'}
					onPress={() => {
						router.push('/main/terrain/tips');
					}}
					action={'Tips'}
				/>
			</View>
		</Screen>
	);
}
