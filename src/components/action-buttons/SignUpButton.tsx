import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import React from 'react';

const SignupButton = () => {
	const { loginWithRedirect } = useAuth0();

	const handleSignUp = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/profile'
			},
			authorizationParams: {
				screen_hint: 'signup'
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
			onClick={handleSignUp}
		>
			Sign Up
		</Button>
	);
};

export default SignupButton;
