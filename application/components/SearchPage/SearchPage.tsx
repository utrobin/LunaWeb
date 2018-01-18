import React from 'react';
import { withStyles } from 'material-ui/styles';
import {BottomNavigationButton} from 'material-ui/BottomNavigation';
import { Switch, Route, Link } from 'react-router-dom';
import {Search, AccountCircle, LocationOn, Announcement} from 'material-ui-icons';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {AppBar, Toolbar, IconButton, Drawer, Divider, CircularProgress} from 'material-ui';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import MasterPage from '../TopicPage/TopicPage';
import BaseCart from '../BaseCart/BaseCart';
import {connect} from "react-redux";

const styles = (theme): any => ({
	progress: {
		marginTop: 20,
	},
	wrapper: {
		display: 'flex',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
	}
});

class SearchPage extends React.Component<any, any> {

	render() {
		const {loading, feed} = this.props.data;
		const {progress, wrapper} = this.props.classes;

		console.log(this.props.match);

		return (
			<div className={wrapper}>
				{
					loading ?
						<CircularProgress
							className={progress}
							thickness={5}
							size={50}
						/>
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
)(withStyles(styles)(SearchPage));

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
		signs {
			id
		}
	}
}`;

export default graphql(MY_QUERY, { options: { notifyOnNetworkStatusChange: true } })(Comp);
