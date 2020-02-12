import { all, fork } from 'redux-saga/effects';
import login from './login';
import auth from './auth';
import users from './users';

function* rootSaga() {
  yield all([fork(login), fork(auth), fork(users)]);
}

export default rootSaga;
