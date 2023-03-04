import { useEffect, useState } from 'react';
import { PageLoader, GoogleMap, Marker } from '../components';
import { apiUrl } from '../config';
import { UserData } from '../types';

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [usersData, setUsersData] = useState<UserData[]>([]);

	useEffect(() => {
		const getUsersData = async () => {
			try {
				const usersDataResponse = await fetch(`${apiUrl}/users-data`);
				if (usersDataResponse.ok) {
					const usersData = await usersDataResponse.json();
					setUsersData(usersData.data);
				}
				setIsLoading(false);
			} catch (e) {
				console.log('data error', e);
			}
		};

		getUsersData();
	}, []);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<GoogleMap
			defaultZoom={9}
			defaultCenter={{
				lat: 30.0444,
				lng: 31.2357
			}}
			yesIWantToUseGoogleMapApiInternals
		// onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
		>
			{usersData.map((item) => {
				return (
					<Marker
						key={item._id}
						name={item.username}
						temp={item.temperature}
						lat={item.latitude}
						lng={item.longitude}
					/>
				);
			})}
		</GoogleMap>
	);
};

export default Dashboard;
