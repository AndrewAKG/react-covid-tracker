import { Auth0Lock } from 'auth0-lock';

const clientId = 'FVfkxcxE0gWDAj8xcZRHxvpogt10EhpV';
const domain = 'akg-apps.eu.auth0.com';

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
                    hint: 'Must have 4 or more chars',
                };
            },
        },
    ],
});
