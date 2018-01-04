import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// import rootSaga from '../modules/index/index.saga';
import rootReducer from '../modules/index/index.reducer';

export default function configureStore() {
	// const sagaMiddleware = createSagaMiddleware();

	// let middleware: any = [];
	// if (process.env.NODE_ENV !== 'production') {
	// 	middleware = [...middleware, logger];
	// }

	const store = createStore (
		rootReducer,
		composeWithDevTools(
			applyMiddleware(),
		),
	);

	// sagaMiddleware.run(rootSaga);

	return store;
}
