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
				let message;
				switch (usersDataResponse.status) {
					case 404: {
						message = 'No data found to display';
						break;
					}
					default: {
						message =
							'Error trying to fetch users data, please try again later';
						break;
					}
				}
				enqueueSnackbar(message, {
					variant: 'error',
					autoHideDuration: 4000
				});
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
