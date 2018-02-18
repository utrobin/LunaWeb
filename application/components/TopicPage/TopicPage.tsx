import React from 'react';
import {graphql} from 'react-apollo';
import {CircularProgress} from 'material-ui';
import BaseCart from '../BaseCart/BaseCart';
import gql from 'graphql-tag';
import {withStyles} from "material-ui/styles";

const styles = (theme): any => ({
	progress: {
		marginTop: 20,
	},
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
	}
});

class TopicPage extends React.Component<any, any> {

	render() {
		console.log(this.props);

		const {loading, feed} = this.props.data;
		const {progress, wrapper} = this.props.classes;

		console.log(this.props, 123);

		return (
			<div className={wrapper}>
				{
					loading ?
						<CircularProgress
							className={progress}
							thickness={5}
							size={50}
						/>
						:
						<BaseCart
							{...this.props.data.master}
						/>
				}
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
  	}
	}
`;

export default graphql(MY_QUERY, {
	options(props: any) {
		return {
			variables: { id: props.match.params.idTopic }
		}
	},
})(withStyles(styles)(TopicPage));
