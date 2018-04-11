import React from 'react';
import {Typography} from 'material-ui';
import {withStyles} from "material-ui/styles";

const styles = (theme) => ({

});

const TitleMasterOrSalon = ({type = 'Salon', name}) => (
	<Typography variant="title" gutterBottom>
		{type === 'Master' && 'Мастер'} {name}
	</Typography>
);

export default withStyles<any>(styles)(TitleMasterOrSalon);
