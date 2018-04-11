import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SearchPage from '../components/SearchPage/SearchPage';
import MainWrapper from '../components/MainWrapper/MainWrapper';
import MasterPage from '../components/MasterPage/MasterPage';
import SalonPage from '../components/SalonPage/SalonPage';
import SignUpPage from '../components/SignUpPage/SignUpPage';
import SignInPage from '../components/SignInPage/SignInPage';

const Routing = () => (
	<div>
		<MainWrapper>
			<Route exact path='/' component={SearchPage}/>
			<Route path='/signin' component={SignInPage}/>
			<Route path='/signup' component={SignUpPage}/>

			<Switch>
				<Route path={`/feed`} component={SearchPage} />
				<Route path={`/master/:idMaster`} component={MasterPage} />
				<Route path={`/salon/:idSalon`} component={SalonPage} />

			</Switch>
		</MainWrapper>
	</div>
);

export default Routing;
