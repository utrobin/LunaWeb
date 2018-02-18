import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import configureStore from './store/configureStore';
import Routing from './Routing/Routing';
import pink from 'material-ui/colors/pink';
import brown from 'material-ui/colors/brown';

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


const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#F88683',
			main: '#F88683',
			dark: '#b37373',
			contrastText: '#212121',
		},
		secondary: {
			light: '#877B7B',
			main: '#877B7B',
			dark: 'red',
			contrastText: 'red',
		},
		text: {
			primary: '#212121',
			secondary: '#6A6A6A',
		}
	},
	typography: {

	}
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
