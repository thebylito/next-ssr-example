import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';
import mensagemLista from './mensagem/lista';

function* rootSaga() {
  yield all([
    fork(auth),
    fork(pagamento),
    fork(rendimento),
    fork(mensagemLista),
  ]);
}

export default rootSaga;
