import React from 'react';
import {Link} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import {IconButton, Avatar, Card, CardHeader, CardMedia, CardActions, Typography} from 'material-ui'
import {Star, MoreVert, Comment} from 'material-ui-icons';
import Slider from 'react-slick';

import styles from './BaseCartStyles';

class BaseCart extends React.Component<any> {

	getLinkWrapper(text: string | React.ReactNode) {
		const {id} = this.props;

		return (
			<Link to={`/topics/${id}`}>
				<Typography color="primary" type="body2">
					{text}
				</Typography>
			</Link>
		)
	}

	render() {
		const {classes, avatar, stars, photos, name} = this.props;

		const settings = {
			arrows: false,
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			dotsClass: 'slick-dots ' + classes.dots,
		};

		console.log(this.props);

		return (
			<div className={classes.wrapper}>
				<Card className={classes.card} elevation={2}>
					{/*Шапка*/}
					<CardHeader
						avatar={
							this.getLinkWrapper(
								<Avatar
									className={classes.avatar}
									src={avatar.path}
								/>
							)
						}
						title={this.getLinkWrapper(`Мастер ${name}`)}
						subheader="Рядом с метро курская."
						action={
							<IconButton color="primary">
								<MoreVert />
							</IconButton>
						}
					/>
					{/*Конец шапки*/}


					{/*Слайдер фотографий*/}
					<Slider {...{...settings, ...{dots: photos.length <= 1 ? false : true}}}>
						{
							photos.length ?
								photos.map((el, i) =>
									<div key={i}>
										<CardMedia
											className={classes.media}
											image={el.path}
										/>
									</div>
								)
								:
								<CardMedia
									className={classes.media}
									image="https://utrobin.com/static/img/plug.jpg"
								/>
						}
					</Slider>
					{/*Конец слайдера фотографий*/}

					{/*Футер*/}
					<CardActions className={classes.CardActions}>
						<div className={classes.icon}>
							<IconButton color="primary" disableRipple>
								<Star />
							</IconButton>
							<Typography color="primary">{stars}</Typography>
							<Typography color="textSecondary">&nbsp;| 124 оценки</Typography>
						</div>

						<div className={classes.icon}>
							<Typography color="textSecondary">34</Typography>
							<IconButton color="primary" disableRipple>
								<Comment />
							</IconButton>
						</div>
					</CardActions>
					{/*Конец футера*/}
				</Card>
			</div>
		)
	}
}

export default withStyles<any>(styles)(BaseCart);
