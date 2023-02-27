import { Grid, TextField } from '@mui/material';
import { useEffect } from 'react';

const DataInput = () => {
	// const [location, setLocation] = useState(null);

	useEffect(() => {
		const getUserLocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position) => console.log(position),
				(err) => console.log(err)
			);
		};

		getUserLocation();
	}, []);

	return (
		<Grid container flexDirection={'column'} spacing={3}>
			<Grid item>
				<TextField value={'location'} />
			</Grid>
			<Grid item>
				<TextField value={'temprature'} />
			</Grid>
		</Grid>
	);
};

export default DataInput;
