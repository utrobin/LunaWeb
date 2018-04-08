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
import todos from './resolvers/filters';
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
    visibilityFilter: String
    todos: [Todo]
  }
`;

const client = new ApolloClient({
	cache: cache,
	link: withClientState({
		...merge(todos, visibilityFilter),
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
