import { useAuth0 } from '@auth0/auth0-react';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import PageLoader from './components/common/PageLoader';
import AuthenticationGuard from './components/auth/AuthenticationGuard';
import { Grid } from '@mui/material';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const DataInput = lazy(() => import('./pages/DataInput'));
const NoMatch = lazy(() => import('./pages/NoMatch'));

const App = () => {
	const web = window.innerWidth > 700 ? true : false;
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<>
			<NavBar />
			<div className='App'>
				<Grid container justifyContent={"center"}>
					{web && <Grid item xs={3} />}
					<Grid item xs={web ? 6 : 12} paddingY={7}>
						<Suspense fallback={<PageLoader />}>
							<Routes>
								<Route path="/" element={<Dashboard />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route
									path="/profile"
									element={<AuthenticationGuard component={Profile} />}
								/>
								<Route
									path="/data-input"
									element={<AuthenticationGuard component={DataInput} />}
								/>
								<Route path="*" element={<NoMatch />} />
							</Routes>
						</Suspense>
					</Grid>
					{web && <Grid item xs={3} />}
				</Grid>
			</div>
		</>
	);
};

export default App;
