import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from "material-ui/styles";
import BaseCart from '../BaseCart/BaseCart';

const styles = (theme) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	progress: {
		margin: 'auto',
	},
});

const GET_CART = gql`
    query ($id: ID!) {
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

const SmallCart = ({id, classes}) => (
	<Query query={GET_CART} variables={{id}}>
		{({ data, loading}) => (
			<div className={classes.wrapper}>
				{
					loading ?
						<CircularProgress className={classes.progress} />
						:
						<BaseCart
							{...data}
						/>
				}
			</div>
		)}
	</Query>
);


export default withStyles<any>(styles)(SmallCart);
