import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	Divider,
	Grid,
	InputAdornment,
	TextField
} from '@mui/material';
import { apiUrl } from '../config';
import { useFormik } from 'formik';
import validationSchema from '../validations/Vitals.validation';
import { useLocation } from '../contexts/Location.context';
import { PageWrapper } from '../components';
import { useEffect, useState } from 'react';
import {
	AddUserDataRequest,
	GetUserVitalsHistoryResponse,
	UserData
} from '../types';
import { LineChart } from '../components/common/LineChart';
import moment from 'moment';

const UserVitals = () => {
	const { getAccessTokenSilently } = useAuth0();
	const { latitude, longitude } = useLocation();
	const [userHistory, setUserHistory] = useState<UserData[]>([]);

	const handleSubmitUserVitals = async (
		values: { temperature: string; oxygenLevel: string },
		{ resetForm }: { resetForm: Function }
	) => {
		try {
			const accessToken = await getAccessTokenSilently();
			const body: AddUserDataRequest = {
				latitude: latitude!,
				longitude: longitude!,
				temperature: Number(values.temperature),
				oxygenLevel: Number(values.oxygenLevel)
			};
			const response = await fetch(`${apiUrl}/users-data`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				resetForm();
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getUserVitalsHistory = async () => {
			const accessToken = await getAccessTokenSilently();
			const response = await fetch(`${apiUrl}/users-data/history`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const userVitalsHistory: GetUserVitalsHistoryResponse =
					await response.json();
				setUserHistory(userVitalsHistory.data);
			}
		};

		getUserVitalsHistory();
	}, [getAccessTokenSilently]);

	const formik = useFormik({
		initialValues: {
			temperature: '',
			oxygenLevel: ''
		},
		validationSchema: validationSchema,
		onSubmit: handleSubmitUserVitals
	});

	return (
		<PageWrapper>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							id="temperature"
							name="temperature"
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
							error={
								formik.touched.temperature &&
								Boolean(formik.errors.temperature)
							}
							helperText={
								formik.touched.temperature &&
								formik.errors.temperature
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="oxygenLevel"
							name="oxygenLevel"
							fullWidth
							label={'Oxygen Level'}
							value={formik.values.oxygenLevel}
							onChange={formik.handleChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										%
									</InputAdornment>
								)
							}}
							error={
								formik.touched.oxygenLevel &&
								Boolean(formik.errors.oxygenLevel)
							}
							helperText={
								formik.touched.oxygenLevel &&
								formik.errors.oxygenLevel
							}
						/>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							type="submit"
							disabled={formik.isSubmitting}
						>
							Submit
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
				</Grid>
			</form>

			{userHistory.length && (
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<LineChart
							text="Temperature"
							data={{
								labels: userHistory.map((item) =>
									moment
										.unix(item.timestamp)
										.format('YYYY-MM-DD HH:mm')
								),
								datasets: [
									{
										label: `C${'\u00b0'}`,
										data: userHistory.map(
											(item) => item.temperature
										),
										borderColor: 'rgb(53, 162, 235)',
										backgroundColor:
											'rgba(53, 162, 235, 0.5)'
									}
								]
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<LineChart
							text="Oxygen Level"
							data={{
								labels: userHistory.map((item) =>
									moment
										.unix(item.timestamp)
										.format('YYYY-MM-DD HH:mm')
								),
								datasets: [
									{
										label: '%',
										data: userHistory.map(
											(item) => item.oxygenLevel
										),
										borderColor: 'rgb(255, 99, 132)',
										backgroundColor:
											'rgba(255, 99, 132, 0.5)'
									}
								]
							}}
						/>
					</Grid>
				</Grid>
			)}
		</PageWrapper>
	);
};

export default UserVitals;
