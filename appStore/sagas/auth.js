import { call, all, takeLatest, select } from 'redux-saga/effects';

// import { Creators as ProfileCreators } from '../ducks/perfil';
import { Types as AuthTypes } from '../ducks/auth';
import api from '../../services/api';

function* setToken() {
  const { token } = yield select(state => state.auth);
  yield call(api.setHeader, 'Authorization', token);
  api.setHeader('Authorization', token);
}

export default function* AuthSagas() {
  yield all([takeLatest(AuthTypes.GET_SUCCESS, setToken)]);
}
