import React from 'react';
import {connect} from "react-redux";
import {withStyles} from 'material-ui/styles';
import { List as InfiniteList, InfiniteLoader } from 'react-virtualized';
import BottomNavigationButton from 'material-ui/BottomNavigation';
import { Switch, Route, Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Room from 'material-ui-icons/Room';
import {Search, AccountCircle, LocationOn, Announcement} from 'material-ui-icons';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {AppBar, Toolbar, IconButton, Drawer, Divider, CircularProgress} from 'material-ui';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import MasterPage from '../TopicPage/TopicPage';
import BaseCart from '../BaseCart/BaseCart';
import Map from '../Map';

const styles = (theme): any => ({
	fab: {
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	},
	progress: {
		marginTop: 20,
	},
	wrapper: {
		display: 'flex',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		backgroundColor: theme.palette.background.default,
	}
});

const remoteRowCount = 1000;

const list = [];

function isRowLoaded ({ index }) {
	return !!list[index];
}


class SearchPage extends React.Component<any, any> {
	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const {loading, feed, loadMoreEntries} = this.props;
		const {progress, wrapper, fab}: any = this.props.classes;

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

				<Button
					onClick={this.handleClickOpen}
					variant="fab"
					className={fab}
					color="primary"
				>
					<Room />
				</Button>

				<Map
					open={this.state.open}
					handleClose={this.handleClose}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => state;

const Comp = connect<any, any, any>(
	mapStateToProps,
)(withStyles(styles)(SearchPage));

const QUERY = gql`query Feed($offset: Int!, $limit: Int!)  {
	feed(offset: $offset, limit: $limit)	{
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

const ITEMS_PER_PAGE = 6;

export default graphql(QUERY, {
	options(props) {
		return {
			variables: {
				offset: 0,
				limit: ITEMS_PER_PAGE,
			},
			fetchPolicy: 'network-only',
		};
	},
	props({ data: { loading, feed, fetchMore } }) {
		return {
			loading,
			feed,

			loadMoreEntries() {
				return fetchMore({
					// query: ... (you can specify a different query. FEED_QUERY is used by default)
					variables: {
						// We are able to figure out which offset to use because it matches
						// the feed length, but we could also use state, or the previous
						// variables to calculate this (see the cursor example below)
						offset: feed.length,
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						if (!fetchMoreResult) { return previousResult; }
						return Object.assign({}, previousResult, {
							// Append the new feed results to the old one
							feed: [...previousResult.feed, ...fetchMoreResult.feed],
						});
					},
				});
			},
		};
	},
})(Comp);
