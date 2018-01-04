import red from 'material-ui/colors/red';

export default theme => ({
	card: {
		margin: 15,
	},
	media: {
		height: 194,
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	flexGrow: {
		flex: '1 1 auto',
	},
	bookmark: {
		float: 'right',
	},
	wrapper: {
		width: '100%',
		maxWidth: 520,
	},
	star: {
		display: 'flex',
		alignItems: 'center',
	},
	CardActions: {
		justifyContent: 'space-between',
	},
	dots: {
		bottom: -38,
	},
});