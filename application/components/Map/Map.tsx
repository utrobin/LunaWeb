import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import { LinearProgress } from 'material-ui/Progress';
import { YMaps, Map as YMap, Placemark, ObjectManager } from 'react-yandex-maps';
import Slide from 'material-ui/transitions/Slide';

const styles = {
	appBar: {
		position: 'relative',
	},
	flex: {
		flex: 1,
	},
};

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

const mapState = {
	center: [55.76, 37.64],
	zoom: 12,
};

class Map extends React.Component<any, any> {
	state = {
		loading: true,
	};

	render() {
		const {open, handleClose, classes, address, title, feed} = this.props;

		let data = [];
		if (!address) {
			data = feed.map(({address}) => {
				const {id, lat, lon} = address;

				return {
					type: 'Feature',
					id,
					geometry: {
						type: 'Point',
						coordinates: [lat, lon]
					},
					properties: {
						balloonContent: 'Содержимое балуна',
						clusterCaption: 'Еще одна метка',
						hintContent: 'Текст подсказки'
					}
				}
			});
		}


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
							{title || 'Поиск по карте'}
						</Typography>
					</Toolbar>
				</AppBar>

				{
					this.state.loading && <LinearProgress />
				}

				<YMaps onApiAvaliable={() => this.setState({loading: false})}>
					<YMap
						state={address ? {zoom: 16, center: [address.lat, address.lon]} : mapState}
						width={"100%"}
						height={"100%"}
					>
						{
							address ?
							<Placemark
								geometry={{
									coordinates: [address.lat, address.lon]
								}}
								properties={{
									hintContent: 'Собственный значок метки',
									balloonContent: 'Это красивая метка'
								}}
							/>
							:
							<ObjectManager
								options={{
									clusterize: true,
									gridSize: 32,
								}}
								objects={{
									preset: 'islands#greenDotIcon',
								}}
								clusters={{
									preset: 'islands#greenClusterIcons',
								}}
								features={data}
							/>
						}

					</YMap>
				</YMaps>

			</Dialog>
		);
	}
}

export default withStyles(styles)(Map);
