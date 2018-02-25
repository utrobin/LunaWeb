import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MuiThemeProvider} from 'material-ui/styles';
import theme from './theme';
import configureStore from './store/configureStore';
import Routing from './Routing/Routing';

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
	<MuiThemeProvider theme={theme}>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<BrowserRouter>
					<Routing />
				</BrowserRouter>
			</Provider>
		</ApolloProvider>
	</MuiThemeProvider>,
	document.getElementById('app'),
);
