import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	CircularProgress,
	Grid,
	InputAdornment,
	TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { apiUrl } from '../config';
import { getAddressFromCoords, getUserLocation } from '../utils/Maps';

const DataInput = () => {
	const { getAccessTokenSilently } = useAuth0();
	const [isLoading, setIsLoading] = useState(true);

	const [latitude, setLatitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();
	const [address, setAddress] = useState('');
	const [temperature, setTemperature] = useState('');

	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState('');

	const setErrorAndHelperText = (error: boolean, text: string) => {
		setError(error);
		setHelperText(text);
	};

	const validateInput = (input: string) => {
		if (!input.length) {
			setErrorAndHelperText(false, '');
			return;
		}

		if (/^\d+(\.\d{1,2})?$/.test(input)) {
			setErrorAndHelperText(false, '');
		} else {
			setErrorAndHelperText(true, 'invalid temperature format');
			return;
		}

		if (Number(input) < 36) {
			setErrorAndHelperText(
				true,
				`temperature must be more than or equal 36${'\u00b0'}`
			);
		} else if (Number(input) > 41) {
			setErrorAndHelperText(
				true,
				`temperature must be less than or equal 41${'\u00b0'}`
			);
		} else {
			setErrorAndHelperText(false, '');
		}
	};

	useEffect(() => {
		const getUserInitLocation = async () => {
			try {
				const { latitude, longitude } = await getUserLocation();
				const userAddress = await getAddressFromCoords(
					latitude,
					longitude
				);

				setAddress(userAddress);
				setLatitude(latitude);
				setLongitude(longitude);
				setIsLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		getUserInitLocation();
	}, []);

	const handleSubmitInputData = async () => {
		try {
			const accessToken = await getAccessTokenSilently();
			await fetch(`${apiUrl}/users-data`, {
				method: 'POST',
				body: JSON.stringify({
					latitude,
					longitude,
					address,
					temperature
				}),
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json'
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<TextField
					fullWidth
					value={address}
					label={'address'}
					InputProps={{
						readOnly: true,
						endAdornment: isLoading ? (
							<InputAdornment position="end">
								<CircularProgress size={20} />
							</InputAdornment>
						) : null
					}}
					disabled={true}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					fullWidth
					value={temperature}
					label={'temperature'}
					onChange={(event) => {
						const value = event.target.value;
						validateInput(value);
						setTemperature(event.target.value);
					}}
					error={error}
					inputProps={{ pattern: '[0-9]*' }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								C{'\u00b0'}
							</InputAdornment>
						)
					}}
					helperText={helperText}
				/>
			</Grid>
			<Grid item>
				<Button variant="contained" onClick={handleSubmitInputData}>
					Submit
				</Button>
			</Grid>
		</Grid>
	);
};

export default DataInput;
