import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {Delete, PregnantWoman, Cloud, Watch, Star, Bookmark, BookmarkBorder} from 'material-ui-icons';
import {IconButton} from 'material-ui';
import Typography from 'material-ui/Typography';

import styles from './BaseCartStyles';

class BaseCart extends React.Component<any> {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.wrapper}>
				<Card className={classes.card}>
					<CardHeader
						avatar={
							<Avatar aria-label="Recipe" className={classes.avatar}>
								R
							</Avatar>
						}
						title="Салон Jasmine. Мастер Евгения."
						subheader="Рядом с метро курская."
					/>

					<div>
						<IconButton aria-label="Delete" color="accent">
							<Delete />
						</IconButton>

						<IconButton aria-label="Delete">
							<PregnantWoman />
						</IconButton>

						<IconButton aria-label="Delete" color="primary">
							<Cloud />
						</IconButton>

						<IconButton aria-label="Delete">
							<Watch />
						</IconButton>
					</div>

					<CardMedia
						className={classes.media}
						image="/static/img/nog.jpg"
						title="Contemplative Reptile"
					/>

					<CardActions className={classes.CardActions}>
						<div className={classes.star}>
							<IconButton disableRipple>
								<Star />
							</IconButton>
							<Typography type="colorSecondary">4.8</Typography>
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
