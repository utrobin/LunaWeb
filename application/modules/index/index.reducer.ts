import {combineReducers} from 'redux';
import {handleActions, Action} from 'redux-actions';
import {reducer as formReducer} from 'redux-form';

const initialState: any = {egor: 123};

const dataReducer = handleActions<any>(
	{
		['ADD_DATA']: (state: any, action: Action<any>) => {
			return {...state, ...action.payload};
		},
	},
	initialState,
);

const rootReducer = combineReducers<any>({
	test: dataReducer,
	form: formReducer,
});

export default rootReducer;
