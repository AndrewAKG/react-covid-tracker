import * as yup from 'yup';

const validationSchema = yup.object({
	temperature: yup
		.number()
		.min(36, `temperature should be more than or equal 36${'\u00b0'}`)
		.max(41, `temperature should be less than or equal 41${'\u00b0'}`)
		.required('temperature is required'),
	oxygenLevel: yup
		.number()
		.min(80, 'Oxygen Level should be more than or equal 80')
		.max(100, 'Oxygen Level should be less than or equal 100')
		.required('Oxygen Level is required')
});

export default validationSchema;
