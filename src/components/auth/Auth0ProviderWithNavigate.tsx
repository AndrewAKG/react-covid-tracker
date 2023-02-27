import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { clientId, domain, redirectUri } from '../../config';

export const Auth0ProviderWithNavigate = ({ children }: { children: any }) => {
	const navigate = useNavigate();

	const onRedirectCallback = (appState: AppState | undefined) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	if (!(domain && clientId && redirectUri)) {
		return null;
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: redirectUri,
				audience: `https://${domain}/api/v2/`,
				scope: 'profile email read:current_user update:current_user_metadata'
			}}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};
