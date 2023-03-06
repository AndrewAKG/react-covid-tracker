import { User } from '@auth0/auth0-react';
import { createContext, useContext } from 'react';

interface AuthContextFields {
	accessToken?: string;
	user?: User;
}

export const AuthContext = createContext<AuthContextFields>({
	user: undefined,
	accessToken: undefined
});

export const useAuth = () => useContext(AuthContext);
