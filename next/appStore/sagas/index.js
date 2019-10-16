import { all, fork } from 'redux-saga/effects';
import auth from './auth';

function* rootSaga() {
  yield all([
    fork(auth),
  ]);
}

export default rootSaga;
