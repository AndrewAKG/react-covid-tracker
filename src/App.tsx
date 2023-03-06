import { useAuth0 } from '@auth0/auth0-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticationGuard, NavBar, PageLoader } from './components';
import { getUserLocation } from './utils/Maps';
import { LocationContext } from './contexts/Location.context';
import styled from 'styled-components';
import { AuthContext } from './contexts/Auth.context';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const UserVitals = lazy(() => import('./pages/UserVitals'));
const NoMatch = lazy(() => import('./pages/NoMatch'));

const AppWrapper = styled.div`
	padding: 10px;
`;

const App = () => {
	const { isLoading, user, getAccessTokenSilently } = useAuth0();
	const [accessToken, setAccessToken] = useState<string>();

	const [latitude, setLatitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();

	useEffect(() => {
		const getUserInitLocation = async () => {
			try {
				const { latitude, longitude } = await getUserLocation();

				setLatitude(latitude);
				setLongitude(longitude);
			} catch (e) {
				console.log(e);
			}
		};

		getUserInitLocation();
	}, []);

	useEffect(() => {
		const getUserAccessToken = async () => {
			const accessToken = await getAccessTokenSilently();
			setAccessToken(accessToken);
		};
		getUserAccessToken();
	}, [user, getAccessTokenSilently]);

	if (isLoading) {
		return (
			<AppWrapper>
				<PageLoader />
			</AppWrapper>
		);
	}

	return (
		<LocationContext.Provider value={{ latitude, longitude }}>
			<AuthContext.Provider value={{ accessToken, user }}>
				<NavBar />
				<AppWrapper>
					<Suspense fallback={<PageLoader />}>
						<Routes>
							<Route
								path="/"
								element={<Navigate to={'/dashboard'} />}
							/>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route
								path="/profile"
								element={
									<AuthenticationGuard component={Profile} />
								}
							/>
							<Route
								path="/vitals"
								element={
									<AuthenticationGuard
										component={UserVitals}
									/>
								}
							/>
							<Route path="*" element={<NoMatch />} />
						</Routes>
					</Suspense>
				</AppWrapper>
			</AuthContext.Provider>
		</LocationContext.Provider>
	);
};

export default App;
