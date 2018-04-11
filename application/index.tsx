import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter} from 'react-router-dom';
import {ApolloClient} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {MuiThemeProvider} from 'material-ui/styles';
import merge from 'lodash.merge';
import theme from './theme';
import Routing from './Routing/Routing';
import filters from './resolvers/filters';
import visibilityFilter from './resolvers/visibilityFilter';

const cache = new InMemoryCache();

const typeDefs = `
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
    visibilityFilter(filter: String!): String
  }

  type Query {
    visibilityFilter: {
    	cover: string!',
			manicure: string!,
			dop1: boolean!,
			dop2: boolean!, 
    }
    todos: [Todo]
  }
`;

export const client = new ApolloClient({
	cache: cache,
	connectToDevTools: true,
	link: withClientState({
		...merge(filters, visibilityFilter),
		cache,
		typeDefs,
	}).concat(
		new HttpLink({
			uri: `https://utrobin.com/api/graphql`,
		}),
	),
});

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</ApolloProvider>
	</MuiThemeProvider>,
	document.getElementById('app'),
);
