import { Auth0Lock } from 'auth0-lock';

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const domain = process.env.REACT_APP_AUTH0_DOMAIN!;

export const lock = new Auth0Lock(clientId, domain, {
	allowedConnections: [],
	additionalSignUpFields: [
		{
			name: 'name',
			placeholder: 'Name',
			storage: 'root',
			validator: function (name) {
				return {
					valid: name.length >= 4,
					hint: 'Must have 4 or more chars'
				};
			}
		}
	]
});
