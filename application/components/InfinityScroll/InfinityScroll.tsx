import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {InfiniteLoader, WindowScroller, AutoSizer, Grid, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {Switch, Route, Link} from 'react-router-dom';
import BaseCart from '../BaseCart/BaseCart';

export default class SearchPage extends React.Component<any, any> {
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

		const	rowCount = this.props.feed.length;

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

	_cellRenderer = ({ key, rowIndex, columnIndex, parent, style }) => {
		const {columnCount, columnWidth} = this.state;
		const rowCount = this.props.feed.length;

		console.log(this.props.finish);

		let content;

		// Render cell content
		if (rowIndex < rowCount - 1) {
			content = (
				<div style={style}>
					<BaseCart
						key={key}
						{...this.props.feed[rowIndex * this.state.columnCount + columnIndex]}
					/>
				</div>
			);
		} else if (columnIndex === 0 && !this.props.finish.value) {
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
	};

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
		return this.props.loadMoreEntries();
	};

	render() {
		const {feed} = this.props;
		const {columnCount, columnWidth} = this.state;

		return (
			<div>
				<InfiniteLoader
					isRowLoaded={this._isRowLoaded}
					loadMoreRows={this._loadMoreRows}
					rowCount={feed.length}
					threshold={1}
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
													className="grid"
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

													rowCount={feed.length / this.state.columnCount}
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
			</div>
		);
	}
}
