import red from 'material-ui/colors/red';

export default (theme): any => ({
	card: {
		margin: 15,
	},
	media: {
		height: 280,
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
	icon: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'base',
	},
	CardActions: {
		justifyContent: 'space-between',
	},
	dots: {
		bottom: -38,
	},
	'@media (max-width: 480px)': {
		card: {
			margin: '5px 0px',
			boxShadow: 'none',
		},
	},
});