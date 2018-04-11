import React from 'react';
import {Button, Typography, Checkbox, Radio, RadioGroup} from 'material-ui';
import {Sort, Today} from 'material-ui-icons';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog';
import {
	FormLabel,
	FormControl,
	FormGroup,
	FormControlLabel,
	FormHelperText,
} from 'material-ui/Form';
import {withStyles} from "material-ui/styles";

const styles = theme => ({
	button: {
		backgroundColor: '#fff',
		border: '1px solid #dae0e6',
		color: '#6b8193',
		textTransform: 'none',
		width: '150px',
		boxShadow: 'none',
		whiteSpace: 'nowrap',

		'&:hover': {
			color: '#fff',
			backgroundColor: '#6b8193',
			borderColor: '#6b8193',
		}
	},

	rightIcon: {
		marginLeft: theme.spacing.unit,
	},

	wrapper: {
		display: 'flex',
		justifyContent: 'space-around',
		margin: '8px auto'
	},

	group: {

	},

	formControl: {
		width: '100%',
	},
	labelWrapper: {
		width: '100%',

		'& span + span': {
			width: '100%',
		}
	},
	label: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'baseline',
	},

	contentText: {
		marginBottom: 20,
	}
});

const GET_FILTER = gql`
    {
        filters @client {
            cover
            manicure
            dop1
            dop2
				}
    }
`;

class Filters extends React.Component {
	state = {
		open: false,
		usl: true
	};

	handleClickOpen = (usl) => {
		this.setState({ open: true, usl });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = ({e, client, filters}) => {
		const {value, name} = e.target;

		client.writeData({
			data: {
				filters: {
					...filters,
					[name]: value,
				},
			}
		});
	};

	handleChangeCheckbox = ({name, client, filters, e}) => {
		client.writeData({data: {filters: {
					...filters,
					[name]: e.target.checked,
		}}});
	};

	render() {
		const { fullScreen, classes } = this.props;

		return (
			<Query query={GET_FILTER}>
				{({data: {filters}, client}) => (
					<div className={classes.wrapper}>
						<Button
							variant="raised"
							color="secondary"
							className={classes.button}
							onClick={() => this.handleClickOpen(false)}
						>
							Дата и время
							<Today className={classes.rightIcon}>send</Today>
						</Button>

						<Button
							variant="raised"
							color="secondary"
							className={classes.button}
							onClick={() => this.handleClickOpen(true)}
						>
							Фильтры
							<Sort className={classes.rightIcon}>send</Sort>
						</Button>

						<Dialog
							fullScreen={fullScreen && this.state.usl}
							open={this.state.open}
							onClose={this.handleClose}
						>
							{
								this.state.usl ?
									<div>
										<DialogTitle>
											Услуги
										</DialogTitle>
										<DialogContent>
											<div>
												<DialogContentText className={classes.contentText}>
													Стоимость зависит от квалификации мастера (мастер-стилист, ведущий стилист, арт-директор)
												</DialogContentText>

												<FormControl component="fieldset" className={classes.formControl}>
													<FormLabel component="legend"><Typography variant="subheading">Маникюр</Typography></FormLabel>
													<RadioGroup
														aria-label="manicure"
														name="manicure"
														className={classes.group}
														value={filters.manicure}
														onChange={(e) => this.handleChange({e, client, filters})}
													>
														<FormControlLabel
															value="2"
															control={<Radio color="primary" />}
															className={classes.labelWrapper}
															label={
																<div className={classes.label}>
																	Обрезной/классический
																</div>
															}
														/>
														{/*<Typography variant="caption" align="right">1000-2000 ₽</Typography>*/}
														<FormControlLabel value="3" control={<Radio color="primary" />} label="Аппаратный" />
														<FormControlLabel value="4" control={<Radio color="primary" />} label="Комбинированный" />
														<FormControlLabel value="5" control={<Radio color="primary" />} label="Европейский" />
														<FormControlLabel value="default" control={<Radio color="primary" />} label="Все" />
													</RadioGroup>

													<FormLabel component="legend"><Typography variant="subheading">Покрытие</Typography></FormLabel>
													<RadioGroup
														aria-label="cover"
														name="cover"
														className={classes.group}
														value={filters.cover}
														onChange={(e) => this.handleChange({e, client, filters})}
													>
														<FormControlLabel value="7" control={<Radio color="primary" />} label="Шеллак" />
														<FormControlLabel value="8" control={<Radio color="primary" />} label="Лак" />
														<FormControlLabel value="9" control={<Radio color="primary" />} label="Френч" />
														<FormControlLabel value="default" control={<Radio color="primary" />} label="Все" />
													</RadioGroup>

													<Typography variant="subheading">Дополнительные услуги</Typography>
													<FormControlLabel
														control={
															<Checkbox
																color="primary"
																checked={filters.dop1}
																onChange={(e) => this.handleChangeCheckbox({name: 'dop1', client, filters, e})}
																value="14"
															/>
														}
														label="Лечебные ванночки"
													/>
													<FormControlLabel
														control={
															<Checkbox
																color="primary"
																checked={filters.dop2}
																onChange={(e) => this.handleChangeCheckbox({name: 'dop2', client, filters, e})}
																value="15"
															/>
														}
														label="Массаж рук"
													/>
												</FormControl>
											</div>
										</DialogContent>
										<DialogActions>
											<Button onClick={this.handleClose} color="primary" autoFocus>
												Выбрать
											</Button>
										</DialogActions>
									</div>
									:
									<div>
										<DialogTitle>
											Даннный раздел находится в активной разработки
										</DialogTitle>
									</div>
							}
						</Dialog>
					</div>
				)}
			</Query>
		);
	}
}

export default withMobileDialog()(withStyles(styles)(Filters));