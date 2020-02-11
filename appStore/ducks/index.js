import { combineReducers } from 'redux';
import login from './login';
import auth from './auth';
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  login,
  auth,
  notifications,
});
