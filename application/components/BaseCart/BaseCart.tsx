import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router-dom'
import Card, { CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {Delete, PregnantWoman, Cloud, Watch, Star, Bookmark, BookmarkBorder} from 'material-ui-icons';
import {IconButton} from 'material-ui';
import Typography from 'material-ui/Typography';
import Slider from 'react-slick';

import styles from './BaseCartStyles';

const ICONS = new Map([
	[1, {color: 'accent', component: <Delete />}],
	[2, {color: 'primary', component: <Cloud />}],
	[3, {color: 'default', component: <Watch />}],
]);

class BaseCart extends React.Component<any> {

	render() {
		console.log(this.props);
		const {classes, avatar, stars, photos, name, signs, id = 0} = this.props;

		const settings = {
			arrows: false,
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			dotsClass: 'slick-dots ' + classes.dots,
		};

		return (
			<div className={classes.wrapper}>
				<Card className={classes.card}>
					<Link to={`/topics/${id}`}>
						<CardHeader
							avatar={
								<Avatar
									aria-label="Recipe"
									className={classes.avatar}
									src={avatar.path}
								/>
							}
							title={`Мастер ${name}`}
							subheader="Рядом с метро курская."
						/>
					</Link>

					<div>
						{
							signs.map((el, i) => {
								const {id} = el;

								const {color, component} = ICONS.get(id);

								return (
									<IconButton aria-label="Delete" color={color} key={i}>
										{component}
									</IconButton>
								)
							})
						}
					</div>

					{console.log(photos)}
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

					<CardActions className={classes.CardActions}>
						<div className={classes.star}>
							<IconButton disableRipple>
								<Star />
							</IconButton>
							<Typography color="secondary">{stars}</Typography>
						</div>

						<div className={classes.bookmark}>
							<IconButton aria-label="Share">
								<Bookmark />
							</IconButton>
						</div>
					</CardActions>
				</Card>
			</div>
		)
	}
}

export default withStyles(styles)(BaseCart);
