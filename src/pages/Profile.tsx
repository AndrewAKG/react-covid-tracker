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
import { usersAuth0ApiUrl } from '../config';

const Profile = () => {
	const { user, getAccessTokenSilently, isLoading } = useAuth0();
	// console.log('USER', user);

	const [name, setName] = useState('');
	const [isNameInEditMode, setIsNameInEditMode] = useState(false);

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
		<Grid container spacing={3} flexDirection="column">
			{!isNameInEditMode ? (
				<Grid item>
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
				<Grid item>
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
			<Grid item>
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
		</Grid>
	);
};

export default Profile;
