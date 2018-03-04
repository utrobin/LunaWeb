import React from 'react';
import {connect} from "react-redux";
import {withStyles} from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import {InfiniteLoader, WindowScroller, AutoSizer, Grid, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {Switch, Route, Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Room from 'material-ui-icons/Room';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
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
		backgroundColor: theme.palette.background.default,
	}
});

class SearchPage extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {
			columnCount: 1,
			columnWidth: 100,
			open: false,
		};

		this._cache = new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: 300
		});
	}

	componentWillUpdate(nextProps, nextState) {
		const {columnCount} = this.state;

		let rowCount = 0;
		if (this.props.feed) {
			rowCount = this.props.feed.length;
		}

		if (nextProps.feed) {
			if (
				rowCount !== nextProps.feed.length &&
				nextProps.feed.length > rowCount
			) {
				for (let i = 0; i < columnCount; i++) {
					this._cache.clear(this._lastLoadingIndex, i);
				}
			}
		}
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	_cellRenderer = ({ key, rowIndex, columnIndex, parent, style }) => {
		const {columnCount, columnWidth} = this.state;
		const rowCount = this.props.feed.length;

		let content;

		// Render cell content
		if (rowIndex < rowCount - 1) {
			content = (
				<div style={style}>
					<BaseCart
						key={key}
						{...this.props.feed[rowIndex * 1 + columnIndex]}
					/>
				</div>
			);
		}

		// Render "loading" content
		else if (columnIndex === 0) {
			// Remember this `index` so we can clear its measurements from the cache later
			this._lastLoadingIndex = rowIndex;

			const cellStyle = Object.assign({}, style, {
				width: (columnWidth * columnCount), // Give loader the full grid width
				textAlign: 'center'
			});

			content = <div style={cellStyle}><CircularProgress /></div>;
		} else {
			content = <div style={style} />;
		}

		return (
			<CellMeasurer
				key={key}
				cache={this._cache}
				parent={parent}
				columnIndex={columnIndex}
				rowIndex={rowIndex}
			>
				{content}
			</CellMeasurer>
		);
	}

	_isRowLoaded = ({ index }) => index < this.props.feed.length - 1;

	_onSectionRendered = ({ rowStartIndex, rowStopIndex }) => {
		this._onRowsRendered({
			startIndex: rowStartIndex,
			stopIndex: rowStopIndex
		});
	};

	_onResize = ({ width }) => {
		const { columnCount } = this.state;

		this.setState({
			columnWidth: (width) / columnCount
		});

		this._cache.clearAll();
		this._grid.recomputeGridSize();
	}

	_loadMoreRows = () => {
		if (!this.props.loading) {
			return this.props.loadMoreEntries();
		}
	};

	render() {
		const {loading, feed, loadMoreEntries} = this.props;
		const {progress, wrapper, fab}: any = this.props.classes;
		const { columnCount, columnWidth} = this.state;

		return (
			<div className={wrapper}>
				<div className="container-fluid">
					{
						feed &&
						<InfiniteLoader
							isRowLoaded={this._isRowLoaded}
							loadMoreRows={this._loadMoreRows}
							rowCount={feed.length}
						>
							{
								({onRowsRendered, registerChild}) => {
									this._onRowsRendered = onRowsRendered;
									return (
										<WindowScroller>
											{({ height, scrollTop }) => (
												<AutoSizer
													disableHeight
													onResize={this._onResize}
												>
													{({ width }) => (
														<Grid
															autoHeight
															width={width}
															height={height}
															scrollTop={scrollTop}

															ref={grid => {
																this._grid = grid;
																registerChild(grid);
															}}

															columnWidth={columnWidth}
															columnCount={columnCount}

															rowCount={feed.length}
															rowHeight={this._cache.rowHeight}

															cellRenderer={this._cellRenderer}
															onSectionRendered={this._onSectionRendered}
														/>
													)}
												</AutoSizer>
											)}
										</WindowScroller>
									)
								}
							}
						</InfiniteLoader>
					}
				</div>

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
