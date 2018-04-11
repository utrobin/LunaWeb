import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {withStyles} from "material-ui/styles";
import plural from "../../assets/plural";
import {CircularProgress, Typography, IconButton, Avatar, CardHeader, Divider, Button} from 'material-ui';
import Rating from '../Rating/Rating';
import TitleMasterOrSalon from "../TitleMasterOrSalon/TitleMasterOrSalon";
import Address from "../Address/Address";
import Comments from "../Comments/Comments";
import Filters from "../Filters/Filters";
import Photos from "../Photos/Photos";
import Signs from '../Signs/Signs';
import Dialog, {
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'

const styles = (theme): any => ({
	progress: {
		marginTop: 20,
	},
	wrapper: {
		padding: 16,
	},
	registrationTitle: {
		marginTop: 20,
		fontWeight: 'bold',
	},
	filters: {
		margin: '20px auto'
	},
	recordWrapper: {
		position: 'fixed',
		bottom: 0,
		height: 76,
		borderTop: '1px solid #0000001f',
		left: 0,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	record: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	button: {
		marginRight: 16,
	}
});

class TopicPage extends React.Component<any, any> {
	state = {
		open: false,
		visible: false,
		photoIndex: 0,
	};

	handleClickOpen = (usl) => {
		this.setState({ open: true, usl });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const {loading, master} = this.props.data;
		const {classes} = this.props;

		if (loading) {
			return <div style={{textAlign: 'center'}}>
				<CircularProgress
					className={classes.progress}
					thickness={5}
					size={50}
				/>
			</div>
		}

		const {name, stars, photos, signs, address: {description, lat, lon, metros}} = master;

		return (
			<div>
				<Photos
					photos={photos}
				/>

				<div className={classes.wrapper}>
					<TitleMasterOrSalon
						name={name}
					/>

					<Rating
						stars={stars}
						amount={Math.floor(Math.random() * 98)}
					/>

					<Signs
						signs={signs}
					/>

					<Divider />

					<Address
						metros={metros}
						description={description}
						lat={lat}
						lon={lon}
						name={name}
					/>

					<Divider />

					<Comments
						click={this.handleClickOpen}
					/>

					<Divider />

					<Typography color="default" className={classes.registrationTitle}>ПАРАМЕТРЫ ПОСЕЩЕНИЯ</Typography>

					<div className={classes.filters}>
						<Filters />
					</div>

					<div style={{height: 80}}/>

					<div className={classes.recordWrapper}>
						<div className={classes.record}>
							<CardHeader
								title={<Typography color="default">Выберите нужные параметры</Typography>}
							/>

							<Button variant="raised" color="primary" className={classes.button} onClick={this.handleClickOpen}>
								Записаться
							</Button>
						</div>
					</div>


					<Dialog
						open={this.state.open}
						onClose={this.handleClose}
					>
						<DialogTitle>
							Даннный раздел находится в активной разработки
						</DialogTitle>
					</Dialog>
				</div>
			</div>
		);
	}
}

const MY_QUERY = gql`query ($id: ID!) {
	master(id: $id) {
		name,
		stars,
		avatar	{
			path
		}
		photos	{
			path
		}
		signs {
			id
		}
		address {
			id
			description
			lat
			lon
			metros {
				color
				station
			}
		}	
	}
}
`;

export default graphql(MY_QUERY, {
	options(props: any) {
		return {
			variables: { id: props.match.params.idMaster },
		}
	},
})(withStyles(styles)(TopicPage));
