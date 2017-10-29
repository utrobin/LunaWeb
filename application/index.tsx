import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import App from './components/App/App';

import './assets/css/reset.css';
// import {Provider} from 'react-redux';
// import App from './components/App/App';
// import configureStore from './store/configureStore';
//
//
// const store = configureStore();


ReactDOM.render(
		<App/>,
	document.getElementById('app'),
);
