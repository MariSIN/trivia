import { combineReducers } from 'redux';
import player from './player';
import url from './url';

const rootReducer = combineReducers({ player, url });

export default rootReducer;
