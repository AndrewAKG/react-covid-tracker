import { useEffect, useState } from 'react';
import { PageLoader, GoogleMap, Marker } from '../components';

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);

	useEffect(() => {
		const getUserLocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLatitude(position.coords.latitude);
					setLongitude(position.coords.longitude);
					setIsLoading(false);
				},
				(err) => console.log(err)
			);
		};

		getUserLocation();
	}, []);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<GoogleMap
			defaultZoom={9}
			defaultCenter={{
				lat: latitude,
				lng: longitude
			}}
			yesIWantToUseGoogleMapApiInternals
			// onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
		>
			<Marker
				key={'my place'}
				text={'my place'}
				lat={latitude}
				lng={longitude}
			/>
		</GoogleMap>
	);
};

export default Dashboard;
