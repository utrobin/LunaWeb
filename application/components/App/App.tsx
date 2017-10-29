import React from 'react';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation';
import {Search, AccountCircle, LocationOn} from 'material-ui-icons';
import BaseCart from '../BaseCart/BaseCart';

const styles = {
	root: {
		width: 500,
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
	}
};

class App extends React.Component<any> {
	state = {
		value: 'search',
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
				{
					[1,2,3,4,5,6].map((el) =>
						<BaseCart key={el} />
					)
				}

				<div className={classes.bottomNavigation}>
					<BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
						<BottomNavigationButton label="Поиск" value="search" icon={<Search />} />
						<BottomNavigationButton label="Карта" value="map" icon={<LocationOn />} />
						<BottomNavigationButton label="Мой профиль" value="profile" icon={<AccountCircle />} />
					</BottomNavigation>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(App);
