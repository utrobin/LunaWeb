import red from 'material-ui/colors/red';
import Color from 'color';

export default (theme): any => ({
	card: {
		margin: 15,
	},
	ratio: {
		width: '100%',
	},
	media: {
		height: 'inherit',
	},
	ratioInner: {
		position: 'relative',
		height: 0,
		border: 'none',
		paddingTop: '56.25%',
	},
	ratioContent: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,

		'& .slick-slider, & .slick-list, & .slick-track': {
			height: '100%',
		}
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
		backgroundColor: Color(theme.palette.background.default).alpha(0.7).string(),
		borderRadius: 28,
		padding: '4px 12px',
		height: 28,
		display: 'flex',

		'& *': {
			margin: 'auto',
		}
	},

	icons: {
		display: 'flex',
		position: 'absolute',
		right: 16,
		top: 18,

		'& i': {
			height: 28,
			width: 28,
			borderRadius: 28,
			display: 'flex',
			padding: 4,
			backgroundColor: Color(theme.palette.primary.main).alpha(0.7).string(),
			marginLeft: 4,
		},

		'& svg': {
			height: 26,
			width: 26,
			margin: 'auto',
		},

		'& path': {
			fill: theme.palette.background.default,
		}
	},

	svg: {
		width: 24,
		height: 24,
		padding: 4,
		'& path': {
			fill: theme.palette.text.secondary
		},
	}
});