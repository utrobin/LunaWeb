import React from 'react';
import {connect} from "react-redux";
import {withStyles} from 'material-ui/styles';
import {InfiniteLoader, WindowScroller, AutoSizer, Grid, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {Switch, Route, Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Room from 'material-ui-icons/Room';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import InfinityScroll from '../InfinityScroll/InfinityScroll';
import Map from '../Map';
import theme from '../../theme';

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
		'& .grid': {
			outline: 'none',
		},
	},
});

let finish = {
	value: false,
};

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

	componentWillMount() {
		document.body.style.backgroundColor = theme.palette.background.default;
	}

	componentWillUnmount() {
		document.body.style.backgroundColor = 'inherit';
	}

	render() {
		const {feed, loadMoreEntries} = this.props;
		const {wrapper, fab}: any = this.props.classes;

		return (
			<div className={wrapper}>
				<InfinityScroll
					feed={feed || []}
					loadMoreEntries={loadMoreEntries}
					loading={false}
					finish={finish}
				/>

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
					feed={feed || []}
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
		address {
				id
				description
				lat
				lon
				stations {
						color
						name
				}
		}
	}
}`;

const ITEMS_PER_PAGE = 12;

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
						if (!fetchMoreResult.feed.length) {
							finish.value = true;
						}

						if (!fetchMoreResult) {
							return previousResult;
						}

						return Object.assign({}, previousResult, {
							feed: [...previousResult.feed, ...fetchMoreResult.feed],
						});
					},
				});
			},
		};
	},
})(Comp);
