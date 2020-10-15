import { combineReducers } from 'redux';

import { dinerReducer } from '../reducers/dinerReducer';
import { ownerReducer } from '../reducers/ownerReducer';

export const rootReducer = combineReducers({
	dinerReducer,
	ownerReducer,
});
