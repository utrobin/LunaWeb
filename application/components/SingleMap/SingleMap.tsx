import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import { CircularProgress } from 'material-ui/Progress';
import { YMaps, Map as YMap, Placemark, ObjectManager } from 'react-yandex-maps';
import Slide from 'material-ui/transitions/Slide';
import theme from '../../theme';

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
	},
	loading: {
		display: 'flex',
		alignItems: 'center',
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class SingleMap extends React.Component<any, any> {
	state = {
		loading: true,
		open: false,
	};

	onLoadMap = () => {
		this.setState({loading: false})
	};

	render() {
		const {open, handleClose, classes, title, address: {lat, lon}} = this.props;
		const {loading} = this.state;

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
							{
								loading ?
									<div className={classes.loading}>
										{title}

										<CircularProgress
											className={classes.progress}
											style={{
												color: theme.palette.background.paper,
												marginLeft: 10,
											}}
											size={30}
										/>
									</div>
									:
									title
							}
						</Typography>
					</Toolbar>
				</AppBar>

				<YMaps
					onApiAvaliable={this.onLoadMap}
				>
					<YMap
						state={{ center: [lat, lon], zoom: 18 }}
						width="100%"
						height="100%"
					>
						<Placemark
							geometry={{
								coordinates: [lat, lon]
							}}
							options={{
								iconColor: theme.palette.primary.main,
							}}
						/>
					</YMap>
				</YMaps>
			</Dialog>
		);
	}
}

export default withStyles(styles)(SingleMap);
