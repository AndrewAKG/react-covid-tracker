import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import React from 'react';

const LogoutButton = () => {
	const { logout } = useAuth0();

	const handleLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin
			}
		});
	};

	return (
		<Button
			style={{
				fontWeight: 700,
				color: 'inherit',
				textDecoration: 'none'
			}}
			onClick={handleLogout}
		>
			Log Out
		</Button>
	);
};

export default LogoutButton;
