import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from 'material-ui/Progress';
import {InfiniteLoader, WindowScroller, AutoSizer, Grid, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {Switch, Route, Link} from 'react-router-dom';
import BaseCart from '../BaseCart/BaseCart';

export default class SearchPage extends React.Component<any, any> {
	state = {
		columnCount: 1,
		columnWidth: 100,
		open: false,
	};

	render() {
		const {feed, loadMoreEntries, finish} = this.props;

		return (
			<div>
				<InfiniteScroll
					next={loadMoreEntries}
					hasMore={!finish.value}
					loader={
						<div style={{textAlign: 'center', marginTop: 15}}>
							<CircularProgress
								thickness={5}
								size={50}
							/>
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
