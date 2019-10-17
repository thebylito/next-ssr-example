import { combineReducers } from 'redux';
import auth from './auth';
import pagamento from './pagamento';

export default combineReducers({
  auth,
  pagamento,
});
