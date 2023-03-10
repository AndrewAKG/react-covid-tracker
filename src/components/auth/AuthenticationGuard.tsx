import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ComponentType } from 'react';
import { PageLoader } from '../common';

export const AuthenticationGuard = ({
	component
}: {
	component: ComponentType<object>;
}) => {
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => <PageLoader />
	});

	return <Component />;
};
