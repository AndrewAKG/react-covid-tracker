import { Button } from '@mui/material';
import { lock } from '../config/Auth0';

const LogoutButton = () => {
	return (
		<Button variant="contained" onClick={() => lock.logout({})}>
			Logout
		</Button>
	);
};

export default LogoutButton;
