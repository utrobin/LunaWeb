import React from 'react';
import {graphql} from 'react-apollo';
import ReactStars from 'react-stars';
import Color from 'color';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Button from 'material-ui/Button';
import Room from 'material-ui-icons/Room';
import InlineSVG from 'svg-inline-react';
import {CircularProgress, Typography, CardMedia, Divider} from 'material-ui';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
import theme from '../../theme';
import Map from '../Map';
import BaseCart from '../BaseCart/BaseCart';
import gql from 'graphql-tag';
import {withStyles} from "material-ui/styles";
import Lightbox from "react-image-lightbox";

import photosSvg from '../../assets/img/photos.svg';
import neatlySvg from '../../assets/img/neatly.svg';
import palletSvg from '../../assets/img/pallet.svg';
import fastSvg from '../../assets/img/fast.svg';

const styles = (theme): any => ({
	progress: {
		marginTop: 20,
	},
	wrapper: {
		padding: 16,
	},
	photo: {
		height: '100%',
},
	stars: {
		'& span': {
			marginRight: 4,
		}
	},
	valueStars: {
		marginLeft: 8,
	},
	rating: {
		marginBottom: 16,
		display: 'flex',
		alignItems: 'center',
		cursor: 'base',
	},
	iconMetro: {
		width: 8,
		height: 8,
		borderRadius: 12,
		backgroundColor: '#824ab3',
		marginRight: 4,
		display: 'inline-flex'
	},
	address: {
		margin: '12px auto',
		display: 'flex',
		justifyContent: 'space-between',
	},
	mapButton: {

	},
	sign: {
		display: 'flex',
		alignItems: 'center',
		marginRight: 12,

		'& i': {
			display: 'flex',
		},
		'& svg': {
			marginRight: 6,
			width: 20,
			height: 20,
		},
		'& path': {
			fill: theme.palette.text.secondary
		}
	},
	wrapperSign: {
		width: 'auto!important',
		height: 'auto!important',
	},
	signs: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
	},
	gridList: {
		padding: '8px 0',
		margin: '8px 0!important',
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	comment: {
		width: 280,
		height: 92,
		padding: 16,
	},
	wrapperComment: {
		width: 'auto!important',
		height: 'auto!important',
		backgroundColor: theme.palette.background.default,
		borderRadius: 8,
		marginRight: 8,
	},
	commentLink: {
		marginBottom: 16,
		cursor: 'pointer',
	},
	registrationTitle: {
		marginTop: 20,
	},
	ratio: {
		maxHeight: 400,
		width: '100%',
		position: 'relative',
	},
	ratioInner: {
		position: 'relative',
		height: 0,
		border: 'none',
		paddingTop: '56.25%',
	},
	ratioContent: {
		maxHeight: 400,
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	gallery: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		backgroundColor: Color(theme.palette.primary.main).alpha(0.7).string(),
		color: theme.palette.background.default,
		borderRadius: 28,
		padding: '4px 12px',
		height: 28,
		display: 'flex',

		'& *': {
			margin: 'auto',
		}
	},
	viewer: {
		zIndex: 99999999,
	},
	svg: {
		height: 16,
		width: 16,
		marginLeft: 8,

		'& path': {
			fill: theme.palette.background.default,
		}
	}

});

const signs = [
	{
		img: palletSvg,
		name: 'Большой выбор лаков',
		amount: 18,
	}, {
		img: neatlySvg,
		name: 'Аккуратно',
		amount: 128,
	}, {
		img: fastSvg,
		name: 'Быстро',
		amount: 83,
	}, {
		img: palletSvg,
		name: 'Большой выбор лаков',
		amount: 18,
	}, {
		img: neatlySvg,
		name: 'Аккуратно',
		amount: 128,
	}
];

const comments = [
	{
		name: 'Псевдопродольная Алефтина',
		date: '2 дн. назад. Мастер Пенсильвана',
		text: 'Аккуратный и опрятный масетр, приятный персонал, чистое оборудо ...',
	}, {
		name: 'Варфаламеевна Алефтина',
		date: '5 дн. назад, мастер Изольда',
		text: 'Круто сделали, мне все понравилось, советую только записываться  чуть ...',
	}, {
		name: 'Псевдопродольная Алефтина',
		date: '2 дн. назад. Мастер Пенсильвана',
		text: 'Аккуратный и опрятный масетр, приятный персонал, чистое оборудо ...',
	}, {
		name: 'Варфаламеевна Алефтина',
		date: '5 дн. назад, мастер Изольда',
		text: 'Круто сделали, мне все понравилось, советую только записываться  чуть ...',
	}
];

class TopicPage extends React.Component<any, any> {
	state = {
		open: false,
		visible: false,
		photoIndex: 0,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const {loading, master} = this.props.data;
		const {classes} = this.props;

		const {photoIndex} = this.state;

		if (loading) {
			return <div style={{textAlign: 'center'}}>
				<CircularProgress
					className={classes.progress}
					thickness={5}
					size={50}
				/>
			</div>
		}

		const {name, stars, photos, address: {description, lat, lon, stations}} = master;

		return (
			<div>
				<div className={classes.ratio}>
					<div className={classes.ratioInner}>
						<div
							className={classes.ratioContent}
							onClick={() => {this.setState({ visible: !this.state.visible }); } }
							onTouchStart={(e) => {
								e.preventDefault();
								this.setState({ visible: !this.state.visible });
							}}
						>
							<CardMedia
								className={classes.photo}
								image={photos[photoIndex].path}
							/>
						</div>
					</div>

					<div className={classes.gallery}>
						<Typography variant="body2" color="inherit">{photoIndex + 1}/{photos.length}</Typography>
						<InlineSVG src={photosSvg} className={classes.svg}/>
					</div>
				</div>

				<div className={classes.wrapper}>
					<Typography variant="title" gutterBottom>Mастер {name}</Typography>

					<div className={classes.rating}>
						<div className={classes.stars}>
							<ReactStars
								count={5}
								value={stars / 10}
								edit={false}
								color1={theme.palette.text.secondary}
								color2={theme.palette.primary.main}
								size={12}
							/>
						</div>

						<Typography variant="body2" className={classes.valueStars}>
							{stars / 10}
						</Typography>
						<Typography color="textSecondary">&nbsp;| 124 оценки</Typography>
					</div>

					<Typography color="textSecondary">
						Мы легко впишемся в ваш график, а все наши услуги не займут у вас много времени.
					</Typography>

					<div className={classes.signs}>
						<GridList className={classes.gridList}>
							{
								signs.map((el, i) => (
									<GridListTile key={i} className={classes.wrapperSign}>
										<div className={classes.sign}>
											<InlineSVG src={el.img} />
											<Typography variant="body2">{el.name}</Typography>
											<Typography color="textSecondary">&nbsp;| {el.amount}</Typography>
										</div>
									</GridListTile>
								))
							}
						</GridList>
					</div>

					<Divider />
						<div className={classes.address}>
							{
								description === 'Not found' ?
									<div />
									:
									<div>
										<Typography variant="body2">
											{
												stations[0] &&
												<i className={classes.iconMetro} style={{backgroundColor: '#' + stations[0].color}}/>
											}
											{stations[0] && stations[0].name}
										</Typography>

										<Typography color="textSecondary">
											{description}
										</Typography>
									</div>
							}

							<Button
								onClick={this.handleClickOpen}
								variant="fab"
								className={classes.mapButton}
								color="primary"
								mini
							>
								<Room />
							</Button>

							<Map
								open={this.state.open}
								handleClose={this.handleClose}
								title="Адрес салона или мастера"
								address={{lat, lon}}
							/>
						</div>
					<Divider />


					<div className={classes.signs}>
						<GridList className={classes.gridList}>
							{
								comments.map((el, i) => (
									<GridListTile key={i} className={classes.wrapperComment}>
										<div className={classes.comment}>
											<Typography variant="body2">{el.name}</Typography>
											<Typography color="textSecondary" variant="caption" gutterBottom>{el.date}</Typography>
											<Typography color="textSecondary">{el.text}</Typography>
										</div>
									</GridListTile>
								))
							}
						</GridList>
					</div>

					<Typography color="primary" variant="caption" className={classes.commentLink}>Посмотреть все 34 отзыва</Typography>

					<Divider />

					<Typography color="default" className={classes.registrationTitle}>ПАРАМЕТРЫ ПОСЕЩЕНИЯ</Typography>

					{
						this.state.visible && (
							<Lightbox
								mainSrc={photos[photoIndex].path}
								nextSrc={photos[(photoIndex + 1) % photos.length].path}
								prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].path}
								onCloseRequest={() => this.setState({ visible: false })}
								onMovePrevRequest={
									() =>
									this.setState({
										photoIndex: (photoIndex + photos.length - 1) % photos.length
									})
								}
								onMoveNextRequest={
									() =>
									this.setState({
										photoIndex: (photoIndex + 1) % photos.length
									})
								}
								wrapperClassName={classes.viewer}
								enableZoom={false}
								toolbarButtons={[<div />, <div />]}
							/>
						)
					}

				</div>
			</div>
		);
	}
}

const MY_QUERY = gql`query ($id: ID!) {
	master(id: $id) {
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
}
`;

export default graphql(MY_QUERY, {
	options(props: any) {
		return {
			variables: { id: props.match.params.idTopic }
		}
	},
})(withStyles(styles)(TopicPage));
