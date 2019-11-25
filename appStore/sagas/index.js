import { all, fork } from 'redux-saga/effects';
import login from './login';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';
import mensagemLista from './mensagem/lista';
import feriasLista from './ferias/lista';
import feriasDetalhes from './ferias/item';
import feriasProgramada from './ferias/programada';
import perfilAvatar from './perfil/avatar';
import checarCpf from './redefinirSenha/checarCpf';
import redefinirSenha from './redefinirSenha/redefinirSenha';

function* rootSaga() {
  yield all([
    fork(login),
    fork(auth),
    fork(pagamento),
    fork(rendimento),
    fork(mensagemLista),
    fork(feriasLista),
    fork(feriasDetalhes),
    fork(feriasProgramada),
    fork(perfilAvatar),
    fork(checarCpf),
    fork(redefinirSenha),
  ]);
}

export default rootSaga;
