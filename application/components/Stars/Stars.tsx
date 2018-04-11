import React from 'react';
import { withStyles } from 'material-ui/styles';
import InlineSVG from 'svg-inline-react';
import raitingFilled from '../../assets/img/raiting_filled.svg';
import raitingHalf from '../../assets/img/raiting_half.svg';
import raitingEmpty from '../../assets/img/raiting_empty.svg';


const styles = (theme) => ({
	svg: {
		display: 'flex',

		'& svg': {
			width: 28,
			height: 28,
			marginRight: -12,
			'& path': {
				fill: theme.palette.text.secondary
			},
		},

		'& i:last-child svg': {
			marginRight: 0,
		},

		'& i': {
			display: 'flex',
			alignItems: 'center',
		}
	}
});

class Stars extends React.Component<any, any> {

	render() {
		const {classes, count} = this.props;

		let filled = Math.floor(count / 10);

		let half = 0;
		const temp = count % 10;
		if (temp > 7) {
			filled =+ 1;
		} else if (temp > 3) {
			half =+ 1;
		}

		const empty = 5 - half - filled;

		return <div className={classes.svg}>
			{
				(new Array(filled + 1).join('0').split('')).map((el, i) => <InlineSVG src={raitingFilled} key={i} />)
			}

			{
				(new Array(half + 1).join('0').split('')).map((el, i) => <InlineSVG src={raitingHalf} key={i} />)
			}

			{
				(new Array(empty + 1).join('0').split('')).map((el, i) => <InlineSVG src={raitingEmpty} key={i} />)
			}
		</div>
	}
}

export default withStyles(styles)(Stars);
