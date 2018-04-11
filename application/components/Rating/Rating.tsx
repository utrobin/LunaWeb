import React from 'react';
import {Typography} from 'material-ui';
import {withStyles} from "material-ui/styles";
import Stars from "../Stars/Stars";
import plural from "../../assets/plural";

const styles = (theme) => ({
	stars: {
		'& span': {
			marginRight: 4,
		}
	},
	rating: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: '-6px',
	},
});

const Rating = ({stars, amount, classes}) => (
	<div className={classes.rating}>
		<div className={classes.stars}>
			<Stars count={stars} />
		</div>

		<Typography color="textSecondary">{amount} {plural(amount, ['оценка', 'оценки', 'оценок'])}</Typography>
	</div>
);

export default withStyles<any>(styles)(Rating);
