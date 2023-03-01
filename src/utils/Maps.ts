import { UserCoords } from '../types';
import Geocode from 'react-geocode';
import { googleMapsApiKey } from '../config';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(googleMapsApiKey);

export const getUserLocation = (): Promise<UserCoords> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			},
			(err) => reject(err)
		);
	});
};

export const getAddressFromCoords = async (lat: number, lng: number) => {
	const response = await Geocode.fromLatLng(lat.toString(), lng.toString());
	const address = response.results[0].formatted_address;
	return address;
};
