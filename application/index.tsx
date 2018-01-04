import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import configureStore from './store/configureStore';
import Routing from './Routing/Routing';

import './assets/css/reset.css';

const store = configureStore();

const httpLink = createHttpLink({ uri: 'https://utrobin.com/api/graphql' });

const logoutLink = onError((res) => {
	console.log(res);
});

const client = new ApolloClient({
	link: logoutLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</Provider>
	</ApolloProvider>,
	document.getElementById('app'),
);
