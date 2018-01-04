import React from 'react';
import { withStyles } from 'material-ui/styles';
import {BottomNavigationButton} from 'material-ui/BottomNavigation';
import {Search, AccountCircle, LocationOn, Announcement} from 'material-ui-icons';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {AppBar, Toolbar, IconButton, Drawer, Divider} from 'material-ui';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import BaseCart from '../BaseCart/BaseCart';
import {connect} from "react-redux";

const styles = theme => ({
	root: {
		width: 500,
	},
});

class App extends React.Component<any, any> {

	render() {
		const {loading, feed} = this.props.data;
		console.log(this.props)

		return (
			<div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
				{
					loading ?
						"Загрузка"
						:
						feed.map((el, i) =>
							<BaseCart
								key={i}
								{...el}
							/>
						)
				}
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => state;

const Comp = connect<any, any, any>(
	mapStateToProps,
)(withStyles(styles)(App));


const MY_QUERY = gql`query {
	feed(limit: 4)	{
		id,
		name,
		stars,
		avatar	{
			path
		}
		photos	{
			path
		}
		signs	{
			id
		}
	}
}`;

export default graphql(MY_QUERY, { options: { notifyOnNetworkStatusChange: true } })(Comp);

