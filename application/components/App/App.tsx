import React from 'react';
import { withStyles } from 'material-ui/styles';
import {BottomNavigationButton} from 'material-ui/BottomNavigation';
import {Search, AccountCircle, LocationOn, Announcement} from 'material-ui-icons';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {AppBar, Toolbar, IconButton, Drawer, Divider} from 'material-ui';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import BaseCart from '../BaseCart/BaseCart';

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
});

class App extends React.Component<any, any> {
	state = {
		left: false,
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;

		const sideList = (
			<div className={classes.list}>
				<List>
					<ListItem button>
						<ListItemIcon>
							<Search />
						</ListItemIcon>
						<ListItemText primary="Поиск" />
					</ListItem>
					<ListItem button>
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
				<AppBar>
					<Toolbar>
						<IconButton className={classes.menuButton} color="contrast" aria-label="Menu"  onClick={this.toggleDrawer('left', true)}>
							<MenuIcon />
						</IconButton>
						<Typography type="title" color="inherit" className={classes.flex}>
							Луна
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer open={this.state.left} onRequestClose={this.toggleDrawer('left', false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('left', false)}
						onKeyDown={this.toggleDrawer('left', false)}
					>
						{sideList}
					</div>
				</Drawer>

				<div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', paddingTop: 80}}>
					{
						[1,2,3,4,5,6].map((el) =>
							<BaseCart key={el} />
						)
					}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(App);
