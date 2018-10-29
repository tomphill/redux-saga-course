import {combineReducers} from 'redux';
import UsersReducer from './users';

export default combineReducers({
	users: UsersReducer
});