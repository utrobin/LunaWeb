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
		position: 'absolute',
		bottom: 'auto',

		'& li.slick-active button:before': {
			color: theme.palette.primary.main,
		},

		'& li': {
			width: 4,
			height: 4,
			padding: 0,
			margin: '0 5px'
		},

		'& li button': {
			width: 4,
			height: 4,
			padding: 0,
		},

		'& li button:before': {
			width: 4,
			height: 4,
			padding: 0,
			lineHeight: '7px;'
		},
	},
	'@media (max-width: 480px)': {
		card: {
			margin: '1px 0px',
			boxShadow: 'none',
		},
	},

	iconMetro: {
		width: 8,
		height: 8,
		borderRadius: 12,
		backgroundColor: '#824ab3',
		marginRight: 4,
		display: 'inline-flex'
	},

	photos: {
		position: 'relative',
	},

	price: {
		position: 'absolute',
		top: 18,
		left: 16,
		backgroundColor: theme.palette.background.default,
		borderRadius: 14,
		opacity: 0.7,
		padding: '4px 12px'
	},

	icons: {
		position: 'absolute',
		right: 16,
		top: 18,

		'& i': {
			padding: 4,
			backgroundColor: theme.palette.primary.main,
			marginLeft: 4,
		},

		'& svg': {
			height: 16,
			width: 16,
		}
	}
});