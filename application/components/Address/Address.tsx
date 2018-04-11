import React from 'react';
import {Typography} from 'material-ui'
import Button from 'material-ui/Button';
import Room from 'material-ui-icons/Room';
import SingleMap from '../SingleMap/SingleMap';
import {withStyles} from "material-ui/styles";

const styles = (theme) => ({
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
});

class TitleMasterOrSalon extends React.Component<any, any> {
	state = {
		open: false,
		visible: false,
		photoIndex: 0,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const {metros, description, lat, lon, classes, name} = this.props;

		return (
			<div className={classes.address}>
				{
					description === 'Not found' ?
						<div />
						:
						<div>
							<Typography variant="body2">
								{
									metros[0] &&
									<i className={classes.iconMetro} style={{backgroundColor: '#' + metros[0].color}}/>
								}
								{metros[0] && metros[0].station}
							</Typography>

							<Typography color="textSecondary">
								{description}
							</Typography>
						</div>
				}

				<Button
					onClick={this.handleClickOpen}
					variant="fab"
					color="primary"
					mini
				>
					<Room />
				</Button>

				<SingleMap
					open={this.state.open}
					handleClose={this.handleClose}
					title={name}
					address={{lat, lon}}
				/>
			</div>
		);
	}
}

export default withStyles<any>(styles)(TitleMasterOrSalon);
