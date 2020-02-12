import { combineReducers } from 'redux';
import login from './login';
import auth from './auth';
import users from './users';
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  login,
  auth,
  notifications,
  users,
});
