import React from 'react';
import {withStyles} from 'material-ui/styles';
import {InfiniteLoader, WindowScroller, AutoSizer, Grid, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {Switch, Route, Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Room from 'material-ui-icons/Room';
import gql from 'graphql-tag';
import {graphql, Query} from 'react-apollo';
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


const ITEMS_PER_PAGE = 12;

const QUERY_FEED = gql`query feed($limit: Limit!, $service_types: [ID!]!)  {
    feed(limit: $limit, service_types: $service_types)	{
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

const GET_FILTERS = gql`
    {
        filters @client {
            cover
            manicure
            dop1
            dop2
        }
    }
`;

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
		const {wrapper, fab}: any = this.props.classes;
		const {open} = this.state;

		return (
			<Query
				query={GET_FILTERS}
			>
				{({data: {filters}}) => {
					const formatFilters = [];

					['dop1', 'dop2', 'cover', 'manicure'].forEach((el) => {
						if (filters[el] === true) {
							el === 'dop1' && formatFilters.push(14);
							el === 'dop2' && formatFilters.push(15);
						} else if (filters[el] !== 'default'&& filters[el]) {
							formatFilters.push(+filters[el]);
						}
					});

					return (
						<Query
							query={QUERY_FEED}
							fetchPolicy="network-only"
							variables={{
								limit: {
									offset: 0,
									limit: ITEMS_PER_PAGE,
								},
								service_types: formatFilters,
							}}
						>
							{({ data: {feed}, fetchMore}) => {
								const loadMoreEntries = () => {
									return fetchMore({
										variables: {
											limit: {
												offset: feed ? feed.length : 0,
												limit: ITEMS_PER_PAGE,
											},
										},
										updateQuery: (previousResult, {fetchMoreResult}) => {
											if (!fetchMoreResult) {
												return previousResult;
											}

											const data = Object.assign({}, previousResult, {
												feed: [...previousResult.feed, ...fetchMoreResult.feed],
											});

											return data;
										},
									});
								};

								return (
									<div className={wrapper}>
										{
											!open &&
											<InfinityScroll
												feed={feed || []}
												loadMoreEntries={loadMoreEntries}
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
							)
						}}
					</Query>
				)}}
			</Query>
		);
	}
}

export default withStyles(styles)(SearchPage);
