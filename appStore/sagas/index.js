import { all, fork } from 'redux-saga/effects';
import login from './login';
import auth from './auth';

function* rootSaga() {
  yield all([fork(login), fork(auth)]);
}

export default rootSaga;
