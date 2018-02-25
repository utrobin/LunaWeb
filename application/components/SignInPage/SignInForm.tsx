import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		padding: 15,
		width: 320,
		margin: '40px auto',
	},

	button: {
		marginTop: 12,
	}
});

const renderField = ({ input, label, type, meta: { touched, error } }: any) => {

	console.log(input);

	return (
		<TextField
			fullWidth
			label={label}
			helperText={touched && error}
			error={touched && typeof error === 'string'}
			margin="normal"
			type={type}
			{...input}
		/>
	);
};

const SignUpForm = (props) => {
	const {classes, handleSubmit, submitting} = props;

	console.log(submitting);

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography
				variant="headline"
				component="h3"
			>
				Sign in to Luna
			</Typography>

			<form onSubmit={handleSubmit}>

				<Field
					name="email"
					type="email"
					component={renderField}
					label="Email"
					className={classes.space}
				/>

				<Field
					name="password"
					type="password"
					component={renderField}
					label="Password"
					className={classes.field}
				/>

				<Button
					variant="raised"
					fullWidth
					type="submit"
					color="primary"
					disabled={submitting}
					className={classes.button}
				>
					Sign in
				</Button>
			</form>
		</Paper>
	);
}

const validate = (values) => {
	console.log(values);

	const errors: any = {}

	if (!values.email) {
		errors.email = 'Обязательное поле';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'Обязательное поле';
	}

	return errors;
};

// Decorate the form component
export default reduxForm({
	form: 'SignInForm', // a unique name for this form
	validate
})(withStyles(styles)(SignUpForm));