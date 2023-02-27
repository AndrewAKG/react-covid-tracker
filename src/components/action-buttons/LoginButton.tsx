import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import React from 'react';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	const handleLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/profile'
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
			onClick={handleLogin}
		>
			Log In
		</Button>
	);
};

export default LoginButton;
