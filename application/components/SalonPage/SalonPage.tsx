import React from 'react';
import {graphql} from 'react-apollo';
import {CircularProgress, Typography, IconButton, Avatar, CardHeader, Divider, Button} from 'material-ui';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Rating from '../Rating/Rating';
import gql from 'graphql-tag';
import {withStyles} from "material-ui/styles";
import Signs from '../Signs/Signs';
import TitleMasterOrSalon from "../TitleMasterOrSalon/TitleMasterOrSalon";
import Address from "../Address/Address";
import Comments from "../Comments/Comments";
import Filters from "../Filters/Filters";
import Dialog, {
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog';

import Photos from "../Photos/Photos";
import plural from "../../assets/plural";

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
	activeMaster: {
		backgroundColor: `${theme.palette.grey[400]}!important`,
		opacity: 1,
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

class SalonPage extends React.Component<any, any> {
	state = {
		open: false,
		active: null,
		master: null,
	};

	selectActive = ({id, master}) => {
		this.setState({active: id, master})
	};

	handleClickOpen = (usl) => {
		this.setState({ open: true, usl });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const {loading, salon} = this.props.data;
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

		const {name, stars, photos, signs, masters, address: {description, lat, lon, metros}} = salon;

		return (
			<div>
				{
					photos.length &&
					<Photos
						photos={photos}
					/>
				}

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

					<Divider />

					<Typography color="default" className={classes.registrationTitle}>
						ВАМ ПОДХОДИТ {masters.length} {plural(masters.length, ['МАСТЕР', 'МАСТЕРА', 'МАСТЕРОВ'])}
					</Typography>

					<List
						component="nav"
					>
						{
							masters.map(({avatar, name, stars, id}, i) => {
								return (
									<ListItem
										onClick={() => this.selectActive({id, master: {avatar, name}})}
										className={this.state.active === id ? classes.activeMaster : classes.default}
										disabled={this.state.active === id}
										button
										key={i}
									>
										<CardHeader
											avatar={
												<Avatar
													className={classes.avatar}
													src={avatar.path}
												/>
											}
											title={
												<Typography variant="body2" className={classes.title}>
													Мастер {name}
												</Typography>
											}
											subheader={
												<Rating
													stars={stars}
													amount={Math.floor(Math.random() * 98)}
												/>
											}
										/>
									</ListItem>
								)}
							)
						}
					</List>

					<div style={{height: 80}}/>

					<div className={classes.recordWrapper}>
						<div className={classes.record}>
							<CardHeader
								avatar={
									this.state.master &&
									<Avatar
										className={classes.avatar}
										src={this.state.master.avatar.path}
									/>
								}
								title={
									this.state.master ?
										<Typography variant="body2" className={classes.title}>
											Выбран мастер {this.state.master.name}
										</Typography>
										:
										<Typography color="default">Выберите мастера</Typography>
								}
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

const QUERY = gql`query ($id: ID!) {
    salon(id: $id) {
        name,
        stars
        avatar	{
            path
        }
        photos	{
            path
        }
        signs {
            id
						name
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
				masters {
						id
						name
						stars
            avatar	{
                path
            }
				}
    }
}
`;

export default graphql(QUERY, {
	options(props: any) {
		return {
			variables: { id: props.match.params.idSalon },
		}
	},
})(withStyles(styles)(SalonPage));
