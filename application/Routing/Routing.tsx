import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SearchPage from '../components/SearchPage/SearchPage';
import MapPage from '../components/MapPage/MapPage';
import MainWrapper from '../components/MainWrapper/MainWrapper';
import MasterPag from '../components/TopicPage/TopicPage';
import SignUpPage from '../components/SignUpPage/SignUpPage';

const Routing = () => (
	<div>
		<MainWrapper>
			<Route exact path='/' component={SignUpPage}/>
			<Route path='/map' component={MapPage}/>
			<Route path='/login' component={SignUpPage}/>

			<Switch>
				<Route path={`/topics/:idTopic`} component={MasterPag} />
				<Route path={`/topics`} component={SearchPage} />
			</Switch>
		</MainWrapper>
	</div>
);

export default Routing;
