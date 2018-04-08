import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
	}

	render() {
		const {feed, loadMoreEntries, finish, refresh} = this.props;
		const {columnCount, columnWidth} = this.state;

		console.log(finish);

		return (
			<div>
				<InfiniteScroll
					next={loadMoreEntries}
					hasMore={!finish.value}
					loader={
						<div style={{textAlign: 'center'}}>
							<CircularProgress />
						</div>
					}
					endMessage={
						<p style={{textAlign: 'center'}}>
							<b>Yay! You have seen it all</b>
						</p>
					}>
					{
						feed.map((el, i) =>
							<BaseCart
								key={i}
								{...el}
							/>
						)
					}
				</InfiniteScroll>
			</div>
		);
	}
}
