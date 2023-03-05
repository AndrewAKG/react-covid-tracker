import { useAuth0 } from '@auth0/auth0-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthenticationGuard, NavBar, PageLoader } from './components';
import { getUserLocation } from './utils/Maps';
import { LocationContext } from './contexts/Location.context';
import styled from 'styled-components';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const UserVitals = lazy(() => import('./pages/UserVitals'));
const NoMatch = lazy(() => import('./pages/NoMatch'));

const AppWrapper = styled.div`
	padding: 10px;
`;

const App = () => {
	const { isLoading } = useAuth0();

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

	if (isLoading) {
		return (
			<AppWrapper>
				<PageLoader />
			</AppWrapper>
		);
	}

	return (
		<LocationContext.Provider value={{ latitude, longitude }}>
			<NavBar />
			<AppWrapper>
				<Suspense fallback={<PageLoader />}>
					<Routes>
						<Route path="/" element={<Dashboard />} />
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
								<AuthenticationGuard component={UserVitals} />
							}
						/>
						<Route path="*" element={<NoMatch />} />
					</Routes>
				</Suspense>
			</AppWrapper>
		</LocationContext.Provider>
	);
};

export default App;
