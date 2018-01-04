import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {Delete, PregnantWoman, Cloud, Watch, Star, Bookmark, BookmarkBorder} from 'material-ui-icons';
import {IconButton} from 'material-ui';
import Typography from 'material-ui/Typography';
import Slider from 'react-slick';

import styles from './BaseCartStyles';

class BaseCart extends React.Component<any> {

	render() {
		console.log(this.props);
		const {classes, avatar, stars, photos, name, signs} = this.props;

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

					<div>
						{
							signs.map((el, i) => {
								const {id} = el;
								console.log(id, el);

								if (id === 1) {
									return (
										<IconButton aria-label="Delete" color="accent">
											<Delete />
										</IconButton>
									)
								} else if (id === 2) {
									return (
										<IconButton aria-label="Delete" color="primary">
											<Cloud />
										</IconButton>
									)

								} else if (id === 3) {
									return (
										<IconButton aria-label="Delete">
											<Watch />
										</IconButton>
									)
								}
							})
						}
					</div>

					<Slider {...{...settings, ...{dots: photos.length === 1 ? false : true}}}>
						{
							photos.map((el, i) =>
								<div key={i}>
									<CardMedia
										className={classes.media}
										image={el.path}
									/>
								</div>
							)
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
