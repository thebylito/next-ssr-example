import { combineReducers } from 'redux';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';
import mensagemLista from './mensagem/lista';
import feriasLista from './ferias/lista';
import feriasItem from './ferias/item';
import feriasProgramada from './ferias/programada';

export default combineReducers({
  auth,
  pagamento,
  rendimento,
  mensagem: combineReducers({
    lista: mensagemLista,
  }),
  ferias: combineReducers({
    lista: feriasLista,
    item: feriasItem,
    programada: feriasProgramada,
  }),
});
