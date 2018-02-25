import React from 'react';
import {graphql} from 'react-apollo';
import ReactStars from 'react-stars';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Button from 'material-ui/Button';
import Room from 'material-ui-icons/Room';
import InlineSVG from 'svg-inline-react';
import {CircularProgress, Typography, CardMedia, Divider} from 'material-ui';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
import theme from '../../theme';
import BaseCart from '../BaseCart/BaseCart';
import gql from 'graphql-tag';
import {withStyles} from "material-ui/styles";

import neatlySvg from '../../assets/img/neatly.svg';
import palletSvg from '../../assets/img/pallet.svg';

const styles = (theme): any => ({
	progress: {
		marginTop: 20,
	},
	wrapper: {
		padding: 16,
	},
	photo: {
		height: 200
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

		'& svg': {
			marginRight: 6,
			width: 18,
			height: 18,
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

	render() {
		console.log(this.props, theme);

		const {loading, master} = this.props.data;
		const {classes} = this.props;

		if (loading) {
			return <div style={{textAlign: 'center'}}>
				<CircularProgress
					className={classes.progress}
					thickness={5}
					size={50}
				/>
			</div>
		}

		const {name, stars, photos} = master;
		console.log(master);
		return (
			<div>
				<CardMedia
					className={classes.photo}
					image={photos[0].path}
				/>

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
							<div>
								<Typography variant="body2">
									<i className={classes.iconMetro}/> Баррикадная. Кудринский переулок, 31
								</Typography>
								<Typography color="textSecondary">
									Мантулинская, 24
								</Typography>
							</div>

							<Button
								variant="fab"
								className={classes.mapButton}
								color="primary"
								mini
							>
								<Room />
							</Button>
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
