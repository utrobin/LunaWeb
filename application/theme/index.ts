import {createMuiTheme} from 'material-ui/styles';
import primaryColor from 'material-ui/colors/blue';
import secondaryColor from 'material-ui/colors/grey';

export default createMuiTheme({
	palette: {
		primary: primaryColor,

		secondary: secondaryColor,

		background: {
			default: '#f2f2f2',
		}
	},
});
