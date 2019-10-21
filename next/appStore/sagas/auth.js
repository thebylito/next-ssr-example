import {
  call, put, all, takeLatest, select,
} from 'redux-saga/effects';
import { apiUtils } from 'utils/apiUtils';
import Router from 'next/router';

// import { Creators as ProfileCreators } from '../ducks/perfil';
import { Creators as AuthCreators, Types as AuthTypes } from '../ducks/auth';
import api from '../../services/api';

function* setToken() {
  const { token } = yield select(state => state.auth);
  yield call(api.setHeader, 'Authorization', token);
  api.setHeader('Authorization', token);
}

function* getLogin({ payload }) {
  try {
    const { login, senha } = payload;
    const response = yield call(api.post, '/usuario/autenticar', {
      login,
      senha,
      // uniqueId: DeviceInfo.getUniqueID(),
    });
    yield apiUtils.sagaInterceptResponse(response);

    const { data } = response;
    yield put(
      AuthCreators.getLoginSuccess({
        funcionario: data.funcionario,
        token: data.token,
      }),
    );
    yield setToken();
    yield call(Router.push, {
      pathname: '/dashboard',
    });
  } catch (err) {
    yield apiUtils.sagaInterceptError(AuthCreators.getLoginFailure, err);
  }
}

function* getLogout() {
  yield call(Router.push, {
    pathname: '/',
  });
}

export default function* AuthSagas() {
  yield all([
    takeLatest(AuthTypes.GET_REQUEST, getLogin),
    takeLatest(AuthTypes.GET_LOGOUT_REQUEST, getLogout),
  ]);
}
