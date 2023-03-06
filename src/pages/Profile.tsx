import { useEffect, useState } from 'react';
import {
	Button,
	CircularProgress,
	Divider,
	Grid,
	InputAdornment,
	TextField
} from '@mui/material';
import { PageWrapper } from '../components';
import { usersAuth0ApiUrl } from '../config';
import { useLocation } from '../contexts/Location.context';
import { getAddressFromCoords } from '../utils/Maps';
import { useSnackbar } from 'notistack';
import { useAuth } from '../contexts/Auth.context';

const Profile = () => {
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [isAddressLoading, setIsAddressLoading] = useState(true);

	const { latitude, longitude } = useLocation();
	const { accessToken, user } = useAuth();
	const { enqueueSnackbar } = useSnackbar();

	const handleNameEdit = async () => {
		const userDetailsByIdUrl = `${usersAuth0ApiUrl}/${user?.sub}`;
		const response = await fetch(userDetailsByIdUrl, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_metadata: { name } })
		});

		if (response.ok) {
			enqueueSnackbar('Profile updated successfully', {
				variant: 'success',
				autoHideDuration: 4000
			});
		} else {
			const responseBody = await response.json();
			enqueueSnackbar(
				responseBody.message ||
					'Error updating profile, please try again later',
				{
					variant: 'error',
					autoHideDuration: 4000
				}
			);
		}
	};

	useEffect(() => {
		const getUserAddress = async () => {
			try {
				if (latitude && longitude) {
					const userAddress = await getAddressFromCoords(
						latitude,
						longitude
					);
					setAddress(userAddress);
				} else {
					setAddress('please enable location to get address');
				}

				setIsAddressLoading(false);
			} catch (e) {
				console.log(e);
			}
		};

		getUserAddress();
	}, [latitude, longitude]);

	useEffect(() => {
		const getUserMetadata = async () => {
			const userDetailsByIdUrl = `${usersAuth0ApiUrl}/${user?.sub}`;
			const metadataResponse = await fetch(userDetailsByIdUrl, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			if (metadataResponse.ok) {
				const userDetails = await metadataResponse.json();
				if (userDetails.user_metadata?.name) {
					setName(userDetails.user_metadata.name);
				}
			} else {
				const responseBody = await metadataResponse.json();
				enqueueSnackbar(
					responseBody.message ||
						'Error getting profile, please try again later',
					{
						variant: 'error',
						autoHideDuration: 4000
					}
				);
			}
		};

		getUserMetadata();
	}, [accessToken, user?.sub, enqueueSnackbar]);

	return (
		<PageWrapper>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label={'Name'}
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label={'Email'}
						value={user?.email}
						InputProps={{
							readOnly: true
						}}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						value={address}
						label={'address'}
						InputProps={{
							readOnly: true,
							endAdornment: isAddressLoading ? (
								<InputAdornment position="end">
									<CircularProgress size={20} />
								</InputAdornment>
							) : null
						}}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12} container justifyContent={'flex-end'}>
					<Button variant="contained" onClick={handleNameEdit}>
						Save
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
			</Grid>
		</PageWrapper>
	);
};

export default Profile;
