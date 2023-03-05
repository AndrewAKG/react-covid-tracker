import { Grid } from '@mui/material';

export const PageWrapper = ({ children }: { children: any }) => {
	const web = window.innerWidth > 700 ? true : false;

	return (
		<Grid container>
			{web && <Grid item xs={3} />}
			<Grid item xs={web ? 6 : 12} paddingY={5}>
				{children}
			</Grid>
			{web && <Grid item xs={3} />}
		</Grid>
	);
};
