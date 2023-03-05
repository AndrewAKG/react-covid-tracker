import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton, SignupButton, LogoutButton } from '../action-buttons';

const publicPages = [
	{
		name: 'Dashboard',
		route: 'dashboard'
	}
];

const privatePages = [
	{
		name: 'Vitals',
		route: 'vitals'
	},
	{
		name: 'Profile',
		route: 'profile'
	}
];

const baseStyle = {
	fontWeight: 700,
	color: 'inherit',
	textDecoration: 'none',
	marginRight: 10,
	marginLeft: 10
};

const activeStyle = {
	...baseStyle,
	color: '#F7C04A'
};

export const NavBar = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						COVIDOO
					</Typography>

					<Box>
						{publicPages.map((page) => (
							<NavLink
								key={page.route}
								to={page.route}
								style={({ isActive }) =>
									isActive ? activeStyle : baseStyle
								}
							>
								{page.name}
							</NavLink>
						))}
						{isAuthenticated &&
							privatePages.map((page) => (
								<NavLink
									key={page.route}
									to={page.route}
									style={({ isActive }) =>
										isActive ? activeStyle : baseStyle
									}
								>
									{page.name}
								</NavLink>
							))}
					</Box>
					<Box flexGrow={1} />
					<Box>
						{!isAuthenticated && (
							<>
								<LoginButton />
								<SignupButton />
							</>
						)}
						{isAuthenticated && <LogoutButton />}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
