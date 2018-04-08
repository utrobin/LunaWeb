import React from 'react';
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
		const {feed, loadMoreEntries, refresh} = this.props;
		const {wrapper, fab}: any = this.props.classes;
		const {open} = this.state;

		return (
			<div className={wrapper}>
				{
					!open &&
					<InfinityScroll
						feed={feed || []}
						loadMoreEntries={loadMoreEntries}
						refresh={refresh}
						finish={finish}
					/>
				}

				{
					open &&
					<Map
						open={open}
						handleClose={this.handleClose}
					/>
				}

				<Button
					onClick={this.handleClickOpen}
					variant="fab"
					className={fab}
					color="primary"
				>
					<Room />
				</Button>
			</div>
		);
	}
}

const Comp = withStyles(styles)(SearchPage);

const QUERY = gql`query feed($limit: Limit!)  {
	feed(limit: $limit)	{
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
        metros {
						color
            station
        }
		}
	}
}`;

const ITEMS_PER_PAGE = 12;

export default graphql(QUERY, {
	options(props) {
		return {
			variables: {
				limit: {
					offset: 0,
					limit: ITEMS_PER_PAGE,
				}
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
						if (!fetchMoreResult) {
							return previousResult;
						}

						const data = Object.assign({}, previousResult, {
							feed: [...previousResult.feed, ...fetchMoreResult.feed],
						});

						return data;
					},
				});
			},
		};
	},
})(Comp);
