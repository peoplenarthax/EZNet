import { combineReducers } from 'redux';
import generalMessages, * as fromGeneralMessages from './networkGeneralReducer';

const rootReducer = combineReducers({
  generalMessages
});

export default rootReducer;
