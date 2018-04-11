import React from 'react';
import InlineSVG from 'svg-inline-react';
import Color from 'color';
import {Typography, CardMedia} from 'material-ui';
import {withStyles} from "material-ui/styles";
import Lightbox from 'react-image-lightbox';

import photosSvg from '../../assets/img/photos.svg';
import {withStyles} from "material-ui/styles";

const styles = (theme) => ({
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
	photo: {
		height: '100%',
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

class Photos extends React.Component<any, any> {
	state = {
		visible: false,
		photoIndex: 0,
	};

	render() {
		const {classes, photos} = this.props;
		const {photoIndex, visible} = this.state;

		return (
			<div>
				<div className={classes.ratio}>
					<div className={classes.ratioInner}>
						<div
							className={classes.ratioContent}
							onClick={() => {this.setState({ visible: !this.state.visible }); } }
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

				{
					visible && (
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
							enableZoom={false}
						/>
					)
				}
			</div>
		);
	}
}

export default withStyles<any>(styles)(Photos);
