import { combineReducers } from 'redux';
import login from './login';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';
import mensagemLista from './mensagem/lista';
import feriasLista from './ferias/lista';
import feriasItem from './ferias/item';
import feriasProgramada from './ferias/programada';
import perfilAvatar from './perfil/avatar';
import checarCpf from './redefinirSenha/checarCpf';
import redefinirSenha from './redefinirSenha/redefinirSenha';
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  login,
  auth,
  pagamento,
  rendimento,
  redefinirSenha: combineReducers({
    checarCpf,
    redefinirSenha,
  }),
  mensagem: combineReducers({
    lista: mensagemLista,
  }),
  ferias: combineReducers({
    lista: feriasLista,
    item: feriasItem,
    programada: feriasProgramada,
  }),
  perfil: combineReducers({
    avatar: perfilAvatar,
  }),
  notifications,
});
