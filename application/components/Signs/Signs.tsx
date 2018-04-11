import React from 'react';
import GridList, {GridListTile} from 'material-ui/GridList';
import InlineSVG from 'svg-inline-react';
import {Typography} from 'material-ui';
import {withStyles} from "material-ui/styles";
import plural from "../../assets/plural";
import getSignImg from "../../assets/getSignImg";

const styles = (theme) => ({
	signs: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
	},
	wrapperSign: {
		width: 'auto!important',
		height: 'auto!important',
	},
	sign: {
		display: 'flex',
		margin: 'auto 10px',
		flexDirection: 'column',
		width: 76,
		textAlign: 'center',

		'& i': {
			display: 'flex',
			justifyContent: 'center',
		},
		'& svg': {
			width: 56,
			height: 56,
			borderRadius: 30,
			backgroundColor: theme.palette.background.default,
		},
		'& path': {
			fill: theme.palette.text.secondary
		}
	},
	gridList: {
		padding: '8px 0',
		margin: '8px 0!important',
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
});

const Signs = ({signs = [], classes}) => (
	<div className={classes.signs}>
		<GridList className={classes.gridList}>
			{
				signs.map((el, i) => {
					const amount = Math.floor(Math.random() * 98 + 1);

					return (
						<GridListTile key={i} className={classes.wrapperSign}>
							<div className={classes.sign}>
								<InlineSVG src={getSignImg(+el.id)} />
								<Typography variant="body2">{el.name}</Typography>
								<Typography color="textSecondary">
									{amount} {plural(amount, ['оценка', 'оценки', 'оценок'])}
								</Typography>
							</div>
						</GridListTile>
					)
				})
			}
		</GridList>
	</div>
);

export default withStyles<any>(styles)(Signs);
