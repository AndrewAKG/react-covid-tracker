import { createContext, useContext } from 'react';
import { UserCoords } from '../types';

export const LocationContext = createContext<UserCoords>({
	latitude: undefined,
	longitude: undefined
});

export const useLocation = () => useContext(LocationContext);
