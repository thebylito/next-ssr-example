import { combineReducers } from 'redux';
import auth from './auth';
import pagamento from './pagamento';
import rendimento from './rendimento';

export default combineReducers({
  auth,
  pagamento,
  rendimento,
});
