import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';
import mensagemLista from './mensagem/lista';
import feriasLista from './ferias/lista';
import feriasDetalhes from './ferias/item';
import feriasProgramada from './ferias/programada';

function* rootSaga() {
  yield all([
    fork(auth),
    fork(pagamento),
    fork(rendimento),
    fork(mensagemLista),
    fork(feriasLista),
    fork(feriasDetalhes),
    fork(feriasProgramada),
  ]);
}

export default rootSaga;
