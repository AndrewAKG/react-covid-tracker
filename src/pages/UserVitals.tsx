import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	Grid,
	InputAdornment,
	TextField
} from '@mui/material';
import { apiUrl } from '../config';
import { useFormik } from 'formik';
import validationSchema from '../validations/Vitals.validation';
import { useLocation } from '../contexts/Location.context';

const UserVitals = () => {
	const { getAccessTokenSilently } = useAuth0();
	const { latitude, longitude } = useLocation();

	const handleSubmitUserVitals = async (values: { temperature: number, oxygenLevel: number }) => {
		console.log(values)
		try {
			const accessToken = await getAccessTokenSilently();
			const body = {
				latitude,
				longitude,
				temperature: Number(values.temperature),
				oxygenLevel: Number(values.oxygenLevel)
			};
			await fetch(`${apiUrl}/users-data`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json'
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	const formik = useFormik({
		initialValues: {
			temperature: 37,
			oxygenLevel: 98,
		},
		validationSchema: validationSchema,
		onSubmit: handleSubmitUserVitals
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						id='temperature'
						name='temperature'
						fullWidth
						label={'Temperature'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									C{'\u00b0'}
								</InputAdornment>
							)
						}}
						value={formik.values.temperature}
						onChange={formik.handleChange}
						error={formik.touched.temperature && Boolean(formik.errors.temperature)}
						helperText={formik.touched.temperature && formik.errors.temperature}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id='oxygenLevel'
						name='oxygenLevel'
						fullWidth
						label={'Oxygen Level'}
						value={formik.values.oxygenLevel}
						onChange={formik.handleChange}
						error={formik.touched.oxygenLevel && Boolean(formik.errors.oxygenLevel)}
						helperText={formik.touched.oxygenLevel && formik.errors.oxygenLevel}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" type="submit" disabled={formik.isSubmitting}>
						Submit
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default UserVitals;
