import { call, put, all, throttle } from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as RedefinirSenhaCreators,
  Types as RedefinirSenhaTypes,
} from 'appStore/ducks/redefinirSenha/redefinirSenha';
import { Creators as LoginCreators } from 'appStore/ducks/login';
import sagaInterceptError from 'utils/request/interceptError';
import interceptResponse from 'utils/request/interceptResponse';

function* getRedefinirSenha({ payload }) {
  try {
    const { cpf, matricula, senha } = payload;
    const response = yield call(api.post, '/conta/RedefinirSenha', {
      cpf,
      matricula,
      senha,
    });
    interceptResponse(response);
    yield put(RedefinirSenhaCreators.getRedefinirSenhaSuccess());
    yield put(LoginCreators.getLoginRequest({ login: matricula, senha }));
  } catch (err) {
    yield sagaInterceptError(RedefinirSenhaCreators.getRedefinirSenhaFailure, err);
  }
}

export default function* RedefinirSenhaSagas() {
  yield all([throttle(200, RedefinirSenhaTypes.GET_REDEFINIR_SENHA_REQUEST, getRedefinirSenha)]);
}
