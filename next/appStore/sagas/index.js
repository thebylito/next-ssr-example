import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import pagamento from './pagamento';

function* rootSaga() {
  yield all([
    fork(auth),
    fork(pagamento),
  ]);
}

export default rootSaga;
