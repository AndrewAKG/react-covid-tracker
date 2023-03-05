import { useAuth0 } from '@auth0/auth0-react';
import { ActionButton } from './ActionButton';

export const SignupButton = () => {
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

	return <ActionButton onClick={handleSignUp}>SignUp</ActionButton>;
};
