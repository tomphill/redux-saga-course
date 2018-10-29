import {takeEvery, takeLatest, take, call, put, fork} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers(){
	try{
		const result = yield call(api.getUsers);
		yield put(actions.getUsersSuccess({
			items: result.data.data
		}));
	}catch(e){
		console.log(e);
	}
}

function* watchGetUsersRequest(){
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* deleteUser(userId){
    try{
        console.log(userId);
        yield call(api.deleteUser, userId);

        yield call(getUsers);
    }catch(e){
    	console.log(e);
	}
}

function* watchDeleteUserRequest(){
    while(true){
        const {payload} = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, payload.userId);
    }
}

function* createUser({payload}){
    try{
        yield call(api.createUser, {
            firstName: payload.firstName,
            lastName: payload.lastName
        });

        yield call(getUsers);

    }catch(e){
        console.log(e);
    }
}

function* watchCreateUserRequest(){
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

const userSagas = [
	fork(watchGetUsersRequest),
	fork(watchDeleteUserRequest),
	fork(watchCreateUserRequest)
];

export default userSagas;