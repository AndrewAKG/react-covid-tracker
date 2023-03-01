import {
	CircularProgress,
	Grid,
	InputAdornment,
	TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAddressFromCoords, getUserLocation } from '../utils/Maps';

const DataInput = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [address, setAddress] = useState('');
	const [temperature, setTemperature] = useState('');
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState('');

	const setErrorAndHelperText = (error: boolean, text: string) => {
		setError(error);
		setHelperText(text);
	}

	const validateInput = (input: string) => {
		if (!input.length) {
			setErrorAndHelperText(false, '');
			return;
		}

		if (/^\d+(\.\d{1,2})?$/.test(input)) {
			setErrorAndHelperText(false, '');
		}
		else {
			setErrorAndHelperText(true, 'invalid temperature format');
			return;
		}

		if (Number(input) < 36) {
			setErrorAndHelperText(true, `temperature must be more than or equal 36${'\u00b0'}`);
		} else if (Number(input) > 41) {
			setErrorAndHelperText(true, `temperature must be less than or equal 41${'\u00b0'}`);
		} else {
			setErrorAndHelperText(false, '');
		}
	}

	useEffect(() => {
		const getUserInitLocation = async () => {
			try {
				const { latitude, longitude } = await getUserLocation();
				const userAddress = await getAddressFromCoords(
					latitude,
					longitude
				);

				setIsLoading(false);
				setAddress(userAddress);
			} catch (e) {
				console.log(e);
			}
		};
		getUserInitLocation();
	}, []);

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
		</Grid>
	);
};

export default DataInput;
