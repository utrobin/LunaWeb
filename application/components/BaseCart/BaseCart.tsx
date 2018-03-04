import React from 'react';
import {Link} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import {IconButton, Avatar, Card, CardHeader, CardMedia, CardActions, Typography} from 'material-ui'
import Menu, { MenuItem } from 'material-ui/Menu';
import InlineSVG from 'svg-inline-react';
import {MoreVert} from 'material-ui-icons';
import Slider from 'react-slick';

import starsSvg from '../../assets/img/stars.svg';
import neatlySvg from '../../assets/img/neatly.svg';
import palletSvg from '../../assets/img/pallet.svg';
import fastSvg from '../../assets/img/fast.svg';
import commentSvg from '../../assets/img/comment.svg';
import styles from './BaseCartStyles';

class BaseCart extends React.Component<any> {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	getLinkWrapper(text: string | React.ReactNode) {
		const {id} = this.props;

		return (
			<Link to={`/topics/${id}`}>
					{text}
			</Link>
		)
	}

	render() {
		const {classes, avatar, stars, photos, name, style} = this.props;
		const { anchorEl } = this.state;

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
			<div className={classes.wrapper} style={style}>
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
						title={this.getLinkWrapper(<Typography variant="body2">Мастер {name}</Typography>)}
						subheader={
							<div>
								<i className={classes.iconMetro}/>
								Баррикадная. Кудринский переулок, 31
							</div>
						}
						action={
							<IconButton onClick={this.handleClick}>
								<MoreVert />
							</IconButton>
						}
					/>

					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={this.handleClose}
					>
						<MenuItem onClick={this.handleClose}>Это не интересно</MenuItem>
						<MenuItem onClick={this.handleClose}>Пожаловаться</MenuItem>
					</Menu>
					{/*Конец шапки*/}


					{/*Слайдер фотографий*/}
					<div className={classes.photos}>
						<div className={classes.ratio}>
							<div className={classes.ratioInner}>
								<div className={classes.ratioContent}>
									<Slider {...{...settings, ...{dots: photos.length <= 1 ? false : true}}}>
										{
											photos.length ?
												photos.map((el, i) =>
													<div key={i} className={classes.media}>
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
								</div>
							</div>
						</div>

						<div className={classes.price}>
							<Typography variant="body2" color="textSecondary">1 300 — 2 800 ₽</Typography>
						</div>

						<div className={classes.icons}>
							<InlineSVG src={palletSvg} />
							<InlineSVG src={neatlySvg} />
							<InlineSVG src={fastSvg} />
						</div>
					</div>
					{/*Конец слайдера фотографий*/}

					{/*Футер*/}
					<CardActions className={classes.CardActions}>
						<div className={classes.icon}>
							<InlineSVG src={starsSvg} className={classes.svg}/>
							<Typography variant="body2">{stars / 10}</Typography>
							<Typography color="textSecondary">&nbsp;| 124 оценки</Typography>
						</div>

						<div className={classes.icon}>
							<Typography variant="body2">34</Typography>
							<InlineSVG src={commentSvg} className={classes.svg}/>
						</div>
					</CardActions>
					{/*Конец футера*/}
				</Card>
			</div>
		)
	}
}

export default withStyles<any>(styles)(BaseCart);
