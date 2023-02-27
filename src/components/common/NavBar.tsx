import React from 'react';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../action-buttons/LoginButton';
import SignupButton from '../action-buttons/SignUpButton';
import LogoutButton from '../action-buttons/LogoutButton';

const publicPages = [
	{
		name: 'Dashboard',
		route: 'dashboard'
	}
];

const privatePages = [
	{
		name: 'Input',
		route: 'data-input'
	},
	{
		name: 'Profile',
		route: 'profile'
	}
];

const NavBar = () => {
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

					<Box
					// sx={{
					//     flexGrow: 1,
					//     display: { xs: 'none', md: 'flex' }
					// }}
					>
						{publicPages.map((page) => (
							<NavLink
								to={page.route}
								style={{
									fontWeight: 700,
									color: 'inherit',
									textDecoration: 'none',
									marginRight: 10
								}}
							>
								{page.name}
							</NavLink>
						))}
						{isAuthenticated &&
							privatePages.map((page) => (
								<NavLink
									to={page.route}
									style={{
										fontWeight: 700,
										color: 'inherit',
										textDecoration: 'none',
										marginRight: 10
									}}
								>
									{page.name}
								</NavLink>
							))}
					</Box>
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

export default NavBar;
