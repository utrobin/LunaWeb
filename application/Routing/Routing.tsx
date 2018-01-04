import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SearchPage from '../components/SearchPage/SearchPage';
import MapPage from '../components/MapPage/MapPage';
import MainWrapper from '../components/MainWrapper/MainWrapper';

const Routing = () => (
	<Switch>
		<MainWrapper>
			<Route exact path='/' component={SearchPage}/>
			<Route path='/map' component={MapPage}/>
		</MainWrapper>
	</Switch>
);

export default Routing;