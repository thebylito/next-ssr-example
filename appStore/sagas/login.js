import { call, put, all, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';
// import { Creators as ProfileCreators } from '../ducks/perfil';
import { setCookie, removeCookie } from 'utils/cookie';
import { Creators as AuthCreators } from '../ducks/auth';
import { Creators as LoginCreators, Types as LoginTypes } from '../ducks/login';
import api from '../../services/api';
import interceptResponse from 'utils/request/interceptResponse';
import interceptError from 'utils/request/interceptError';
// import Notifications from 'react-notification-system-redux';

function* getLogin({ payload }) {
  try {
    const { login, senha } = payload;
    const response = yield call(api.post, '/usuario/autenticar', {
      login,
      senha,
      // uniqueId: DeviceInfo.getUniqueID(),
    });
    yield interceptResponse(response);

    const { data } = response;
    yield call(setCookie, 'auth', data.token);
    yield put(LoginCreators.getLoginSuccess());
    // yield put(
    //   Notifications.success({ title: 'Autenticado com sucesso', message: 'Redirecionando...' })
    // );
    yield put(
      AuthCreators.getAuthSuccess({
        funcionario: data.funcionario,
        token: data.token,
      })
    );
    yield call(Router.push, { pathname: '/dashboard' });
  } catch (err) {
    yield interceptError(LoginCreators.getLoginFailure, err);
  }
}

function* getLogout() {
  yield call(removeCookie, 'auth');
  yield call(Router.push, {
    pathname: '/',
  });
  yield put(AuthCreators.getLogoutSuccess());
}

export default function* AuthSagas() {
  yield all([
    takeLatest(LoginTypes.GET_REQUEST, getLogin),
    takeLatest(LoginTypes.GET_LOGOUT_REQUEST, getLogout),
  ]);
}
