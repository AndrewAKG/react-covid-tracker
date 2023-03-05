import { useAuth0 } from '@auth0/auth0-react';
import { ActionButton } from './ActionButton';

export const LogoutButton = () => {
	const { logout } = useAuth0();

	const handleLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin
			}
		});
	};

	return <ActionButton onClick={handleLogout}>Logout</ActionButton>;
};
