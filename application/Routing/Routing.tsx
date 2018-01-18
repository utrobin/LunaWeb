import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SearchPage from '../components/SearchPage/SearchPage';
import MapPage from '../components/MapPage/MapPage';
import MainWrapper from '../components/MainWrapper/MainWrapper';
import MasterPag from '../components/TopicPage/TopicPage';

const Routing = () => (
	<MainWrapper>
		<Route exact path='/' component={SearchPage}/>
		<Route path='/map' component={MapPage}/>

		<Switch>
			<Route path={`/topics/:idTopic`} component={MasterPag}/>
			<Route path={`/topics`} component={SearchPage}/>
		</Switch>
	</MainWrapper>
);

export default Routing;
