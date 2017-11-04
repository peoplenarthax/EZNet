import {  combineReducers } from 'redux-immutable';
import generalMessages, * as fromGeneralMessages from './networkGeneralReducer';

const rootReducer = combineReducers({
  generalMessages
});

export default rootReducer;
