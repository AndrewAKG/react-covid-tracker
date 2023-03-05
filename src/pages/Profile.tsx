import { useAuth0 } from '@auth0/auth0-react';
import { Edit, Save } from '@mui/icons-material';
import {
	CircularProgress,
	Grid,
	IconButton,
	InputAdornment,
	TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PageWrapper } from '../components';
import { usersAuth0ApiUrl } from '../config';
import { useLocation } from '../contexts/Location.context';
import { getAddressFromCoords } from '../utils/Maps';

const Profile = () => {
	const { user, getAccessTokenSilently, isLoading } = useAuth0();
	// console.log('USER', user);

	const [name, setName] = useState('');
	const [isNameInEditMode, setIsNameInEditMode] = useState(false);

	const [address, setAddress] = useState('');
	const [isAddressLoading, setIsAddressLoading] = useState(true);

	const { latitude, longitude } = useLocation();

	const handleNameEdit = async () => {
		try {
			const accessToken = await getAccessTokenSilently();

			const userDetailsByIdUrl = `${usersAuth0ApiUrl}/${user?.sub}`;
			await fetch(userDetailsByIdUrl, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ user_metadata: { name } })
			});

			setIsNameInEditMode(false);
		} catch (e: any) {
			console.log(e.message);
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
				}
				else {
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
			try {
				const accessToken = await getAccessTokenSilently();

				const userDetailsByIdUrl = `${usersAuth0ApiUrl}/${user?.sub}`;
				const metadataResponse = await fetch(userDetailsByIdUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				});

				const userDetails = await metadataResponse.json();
				if (userDetails.user_metadata?.name) {
					setName(userDetails.user_metadata.name);
				}
			} catch (e: any) {
				console.log(e.message);
			}
		};

		getUserMetadata();
	}, [getAccessTokenSilently, user?.sub]);

	return (
		<PageWrapper>
			<Grid container spacing={3}>
				{!isNameInEditMode ? (
					<Grid item xs={12}>
						<TextField
							fullWidth
							label={'Name'}
							value={name}
							InputProps={{
								readOnly: true,
								endAdornment: (
									<InputAdornment position="end">
										{isLoading ? (
											<CircularProgress />
										) : (
											<IconButton
												aria-label="toggle name to be editable"
												onClick={() =>
													setIsNameInEditMode(true)
												}
												edge="end"
											>
												<Edit />
											</IconButton>
										)}
									</InputAdornment>
								)
							}}
						/>
					</Grid>
				) : (
					<Grid item xs={12}>
						<TextField
							fullWidth
							autoFocus
							value={name}
							label={'Name'}
							onChange={(event) => setName(event.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle name to be editable"
											onClick={handleNameEdit}
											edge="end"
										>
											<Save />
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
					</Grid>
				)}
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
			</Grid>
		</PageWrapper>
	);
};

export default Profile;
