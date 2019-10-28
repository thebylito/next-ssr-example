import { combineReducers } from 'redux';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';
import mensagemLista from './mensagem/lista';

export default combineReducers({
  auth,
  pagamento,
  rendimento,
  mensagem: combineReducers({
    lista: mensagemLista,
  }),
});
