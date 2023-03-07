import { useEffect, useState } from 'react';
import { PageLoader, GoogleMap, Marker } from '../components';
import { apiUrl } from '../config';
import { GetAllUsersDataResponse, UserData } from '../types';
import { useSnackbar } from 'notistack';

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [usersData, setUsersData] = useState<UserData[]>([]);

	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const getAllUsersData = async () => {
			const usersDataResponse = await fetch(`${apiUrl}/users-data`);
			if (usersDataResponse.ok) {
				const usersData: GetAllUsersDataResponse =
					await usersDataResponse.json();
				setUsersData(usersData.data);
			} else {
				switch (usersDataResponse.status) {
					case 404: {
						enqueueSnackbar('No patients data found to display', {
							variant: 'warning',
							autoHideDuration: 4000
						});
						break;
					}
					default: {
						enqueueSnackbar('Error trying to fetch patients data, please try again later', {
							variant: 'warning',
							autoHideDuration: 4000
						});
						break;
					}
				}
			}

			setIsLoading(false);
		};

		getAllUsersData();
	}, [enqueueSnackbar]);

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
