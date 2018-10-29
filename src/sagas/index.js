import userSagas from './users';
import {all} from 'redux-saga/effects';

export default function* rootSaga(){
	yield all([
		...userSagas
	]);
}