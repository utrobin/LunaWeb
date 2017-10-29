import React from 'react';
import ReactDOM from 'react-dom';
import BaseCart from './components/BaseCart/BaseCart';
import Button from 'material-ui/Button';

import './assets/css/reset.css';
// import {Provider} from 'react-redux';
// import App from './components/App/App';
// import configureStore from './store/configureStore';
//
//
// const store = configureStore();


ReactDOM.render(
	<div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>

		{
			[1,2,3,4,5,6].map((el) =>
				<BaseCart key={el} />
			)
		}
	</div>,
	document.getElementById('app'),
);
