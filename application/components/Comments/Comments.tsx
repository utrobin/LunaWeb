import React from 'react';
import {Typography} from 'material-ui'
import GridList, {GridListTile} from 'material-ui/GridList';
import {withStyles} from "material-ui/styles";
import plural from "../../assets/plural";

const styles = (theme) => ({
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
	gridList: {
		padding: '8px 0',
		margin: '8px 0!important',
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	commentLink: {
		marginBottom: 16,
		cursor: 'pointer',
	},
});

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
	}, {
		name: 'Варфаламеевна Алефтина',
		date: '5 дн. назад, мастер Изольда',
		text: 'Круто сделали, мне все понравилось, советую только записываться  чуть ...',
	},  {
		name: 'Псевдопродольная Алефтина',
		date: '2 дн. назад. Мастер Пенсильвана',
		text: 'Аккуратный и опрятный масетр, приятный персонал, чистое оборудо ...',
	}, {
		name: 'Варфаламеевна Алефтина',
		date: '5 дн. назад, мастер Изольда',
		text: 'Круто сделали, мне все понравилось, советую только записываться  чуть ...',
	}, {
		name: 'Варфаламеевна Алефтина',
		date: '5 дн. назад, мастер Изольда',
		text: 'Круто сделали, мне все понравилось, советую только записываться  чуть ...',
	}
];

class Comments extends React.Component<any, any> {

	render() {
		const {classes, click} = this.props;
		const amount = Math.floor(Math.random() * 98);

		return (
			<div>
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

				<Typography
					color="primary"
					variant="caption"
					className={classes.commentLink}
					onClick={click}
				>
					Посмотреть все {amount}  {plural(amount, ['отзыв', 'отзыва', 'отзывов'])}
				</Typography>
			</div>
		);
	}
}

export default withStyles<any>(styles)(Comments);
