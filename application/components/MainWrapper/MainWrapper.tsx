import React from 'react';
import { withStyles } from 'material-ui/styles';
import {Search, AccountCircle, LocationOn, Announcement, Person, Sort} from 'material-ui-icons';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {AppBar, Toolbar, IconButton, Drawer, Divider} from 'material-ui';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
	root: {
		width: 500,
	},

	list: {
		width: 250,
		background: theme.palette.background.paper,
	},

	bottomNavigation: {
		position: 'fixed',
		bottom: '-500px',
		paddingBottom: '500px',
		background: '#fff',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		boxShadow: '10px -5px 15px -7px rgba(0,0,0,0.55)',
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	flex: {
		flex: 1,
	},

	plug: {
		paddingBottom: 64,

		'@media (max-width: 600px)': {
			paddingBottom: 48
		},

		'@media (max-width: 526px)': {
			paddingBottom: 56
		},
	},

	filter: {
		display: 'flex',
		justifyContent: 'space-around',
		margin: '8px auto'
	},

	header: {
		backgroundColor: '#fff',
	},

	button: {
		backgroundColor: '#fff',
		border: '1px solid #dae0e6',
		color: '#6b8193',
		textTransform: 'none',
		width: '124',
		boxShadow: 'none',

		'&:hover': {
			color: '#fff',
			backgroundColor: '#6b8193',
			borderColor: '#6b8193',
		}
	},

	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
});

class MainWrapper extends React.Component<any, any> {

	state = {
		left: false,
		scroll: 0,
		filterVisible: true,
	};
	scroll = 0;

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

	onScroll = () => {
		const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

		if (currentScroll > this.scroll && currentScroll > 115) {
			this.setState({filterVisible: false})
		} else {
			this.setState({filterVisible: true})
		}
		this.scroll = currentScroll;
	};

	getFilter = () => {
		if (this.props.location.pathname === '/topics' || this.props.location.pathname === '/') {
			return true;
		} else {
			return false;
		}
	};

	componentDidMount() {
		if (this.getFilter()) {
			window.addEventListener('scroll', this.onScroll);
		}
	}

	componentWillUnmount() {
		if (this.getFilter()) {
			window.removeEventListener('scroll', this.onScroll);
		}
	}

	render() {
		const { classes } = this.props;
		const {push} = this.props.history;

		const sideList = (
			<div className={classes.list}>
				<List>
					<ListItem button onClick={() => push('/topics')}>
						<ListItemIcon>
							<Search />
						</ListItemIcon>
						<ListItemText primary="Поиск" />
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<AccountCircle />
						</ListItemIcon>
							<ListItemText primary="Мой профиль" />
					</ListItem>

					<ListItem button onClick={() => push('/signup')}>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary="Sign up" />
					</ListItem>

					<ListItem button onClick={() => push('/signin')}>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary="Sign in" />
					</ListItem>
				</List>

				<Divider />

				<List>
					<ListItem button>
						<ListItemIcon>
							<Announcement />
						</ListItemIcon>
						<ListItemText primary="Оставить отзыв" />
					</ListItem>
				</List>
			</div>
		);

		return (
			<div>
				<AppBar className={classes.header}>
					<Toolbar>
						<IconButton className={classes.menuButton} color="primary" aria-label="Menu"  onClick={this.toggleDrawer('left', true)}>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="primary" className={classes.flex}>
							Luna
						</Typography>
					</Toolbar>

					{
						this.getFilter() &&
						<Collapse in={this.state.filterVisible}>
							<div className={classes.filter}>
								<Button variant="raised" color="secondary" className={classes.button}>
									Дата и время
								</Button>

								<Button variant="raised" color="secondary" className={classes.button}>
									Район, метро
								</Button>

								<Button variant="raised" color="secondary" className={classes.button}>
									Фильтры
									<Sort className={classes.rightIcon}>send</Sort>
								</Button>
							</div>
						</Collapse>
					}
				</AppBar>

				<Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('left', false)}
						onKeyDown={this.toggleDrawer('left', false)}
					>
						{sideList}
					</div>
				</Drawer>

				<div className={classes.plug} />

				{
					this.getFilter() &&
					<div style={{paddingBottom: 58}}/>
				}

				{this.props.children}
			</div>
		);
	}
}

export default withRouter(withStyles(styles as any)(MainWrapper));
