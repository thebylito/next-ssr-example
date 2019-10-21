import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';

function* rootSaga() {
  yield all([
    fork(auth),
    fork(pagamento),
    fork(rendimento),
  ]);
}

export default rootSaga;
