import React from 'react';
import { withStyles } from 'material-ui/styles';
import {Search, AccountCircle, LocationOn, Announcement, Person} from 'material-ui-icons';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {AppBar, Toolbar, IconButton, Drawer, Divider} from 'material-ui';
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

	header: {
		backgroundColor: '#fff',
	}
});

class MainWrapper extends React.Component<any, any> {

	state = {
		left: false,
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

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

					<ListItem button onClick={() => push('/map')}>
						<ListItemIcon>
							<LocationOn />
						</ListItemIcon>
						<ListItemText primary="Карта" />
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<AccountCircle />
						</ListItemIcon>
							<ListItemText primary="Мой профиль" />
					</ListItem>

					<ListItem button onClick={() => push('/login')}>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary="Sign up" />
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
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu"  onClick={this.toggleDrawer('left', true)}>
							<MenuIcon />
						</IconButton>
						<Typography type="title" color="inherit" className={classes.flex}>
							Luna
						</Typography>
					</Toolbar>
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

				{this.props.children}
			</div>
		);
	}
}

export default withRouter(withStyles(styles as any)(MainWrapper));
