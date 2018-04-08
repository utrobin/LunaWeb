import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import { YMaps, Map as YMap, Placemark, ObjectManager } from 'react-yandex-maps';
import Slide from 'material-ui/transitions/Slide';
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import parsingCoordinate from '../../assets/parsingCoordinate';
import theme from '../../theme';
import SmallCart from "../SmallCart/SmallCart";

const styles = (theme) => ({
	appBar: {
		position: 'relative',
	},
	flex: {
		flex: 1,
	},
	cartWrapper: {
		position: 'fixed',
		backgroundColor: theme.palette.background.paper,
		bottom: 0,
		width: '100%',
		height: '100px',
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

const mapState = {
	center: [55.78, 37.635],
	zoom: 14,
};

class Map extends React.Component<any, any> {
	state = {
		loading: true,
		open: false,
		idCart: null,
	};
	prevBallonId: null;

	onLoadMap = () => {
		this.setState({loading: false})
	};

	onBoundsChange = ({originalEvent: {newBounds}}) => {
		this.setState({open: false});

		this.fetchMore({newBounds});
	};

	async fetchMore (data) {
		this.setState({loading: true});

		await this.props.loadMoreEntries(data);

		this.setState({loading: false});
	}

	onClickBallon = (e) => {
		const objects = e.originalEvent.currentTarget.objects;
		const objectId = e.get('objectId');

		const ballon = objects.getById(objectId);
		if (ballon) {
			const {id} = ballon;

			const idCart = this.props.feed.find((el) => el.address.id === id).id;

			this.setState({
				idCart,
				open: true,
			});

			objects.getObjectManager(objectId).objects.setObjectOptions(objectId, {
				iconColor: theme.palette.grey.main,
			});

			if (this.prevBallonId) {
				objects.getObjectManager(this.prevBallonId).objects.setObjectOptions(this.prevBallonId, {
					iconColor: theme.palette.grey.light,
				});
			}
			this.prevBallonId = id;
		}
	};

	render() {
		const {open, handleClose, classes, feed} = this.props;
		const {loading, open: openCart, idCart} = this.state;

		let data = [];
		if (feed) {
			data = feed.map(({address}) => {
				if (!address) {
					return;
				}

				const {id, lat, lon} = address;

				return {
					type: 'Feature',
					id,
					geometry: {
						type: 'Point',
						coordinates: [lat, lon]
					},
				}
			});
		}

		return (
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				transition={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton color="inherit" onClick={handleClose} aria-label="Close">
							<CloseIcon />
						</IconButton>
						<Typography variant="title" color="inherit" className={classes.flex}>
							{ loading ? 'Поиск по карте. Загрузка подождите' : `Поиск по карте. Найдено ${data.length}`}
						</Typography>
					</Toolbar>
				</AppBar>

				<YMaps
					onApiAvaliable={this.onLoadMap}
				>
					<YMap
						state={mapState}
						onBoundsChange={this.onBoundsChange}
						instanceRef={(map) => map && this.fetchMore({newBounds: map.getBounds()})}
						width="100%"
						height="100%"
					>
						<ObjectManager
							onClick={this.onClickBallon}
							options={{
								clusterize: true,
								gridSize: 32,
							}}
							objects={{
								preset: 'islands#DotIcon',
								iconColor: theme.palette.primary.main,
							}}
							clusters={{
								preset: 'islands#ClusterIcons',
								iconColor: theme.palette.primary.main,
							}}
							features={data}
						/>
					</YMap>
				</YMaps>

				{
					openCart &&
					<Collapse in={openCart}>
						<div className={classes.cartWrapper}>
							<SmallCart
								id={idCart}
							/>
						</div>
					</Collapse>
				}
			</Dialog>
		);
	}
}

const QUERY = gql`query feed($limit: Limit!, $area: Area, $prevArea: Area)  {
    feed(limit: $limit, area: $area, prevArea: $prevArea)	{
        id,
        address {
            id
            lat
            lon
        }
    }
}`;

export default graphql(QUERY, {
	options(props) {
		return {
			variables: {
				limit: {
					offset: 0,
					limit: 0,
				}
			},
			fetchPolicy: 'network-only',
		};
	},
	props({data: {feed, fetchMore}}) {
		return {
			feed,
			limit: {
				offset: 0,
				limit: 0,
			},

			loadMoreEntries({newBounds}) {
				const variables = {
					area: parsingCoordinate(newBounds),
					limit: {
						offset: 0,
						limit: 1000,
					},
				};

				return fetchMore({
					variables,
					updateQuery: (previousResult, { fetchMoreResult }) => {
						if (!fetchMoreResult) {
							return previousResult;
						}

						const feed = [...previousResult.feed];

						fetchMoreResult.feed.forEach((el) => {
							const {id} = el;

							if (!feed.some((el) => el.id === id)) {
								feed.push(el);
							}
						});

						return Object.assign({}, previousResult, {
							feed: feed,
						});
					},
				});
			},
		};
	},
})(withStyles(styles)(Map));
