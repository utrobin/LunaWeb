import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SearchPage from '../components/SearchPage/SearchPage';
import MainWrapper from '../components/MainWrapper/MainWrapper';
import MasterPag from '../components/TopicPage/TopicPage';
import SignUpPage from '../components/SignUpPage/SignUpPage';
import SignInPage from '../components/SignInPage/SignInPage';

const Routing = () => (
	<div>
		<MainWrapper>
			<Route exact path='/' component={SearchPage}/>
			<Route path='/signin' component={SignInPage}/>
			<Route path='/signup' component={SignUpPage}/>

			<Switch>
				<Route path={`/topics/:idTopic`} component={MasterPag} />
				<Route path={`/topics`} component={SearchPage} />
			</Switch>
		</MainWrapper>
	</div>
);

export default Routing;
