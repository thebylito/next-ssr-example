import { call, put, all, throttle } from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as RedefinirSenhaCreators,
  Types as RedefinirSenhaTypes,
} from 'store/ducks/redefinirSenha/redefinirSenha';
import sagaInterceptError from 'utils/sagaInterceptError';
import { goResetPasswordSuccessScreen } from 'appNavigation/nonAuthStack';

function* getRedefinirSenha({ payload }) {
  try {
    const { cpf, matricula, senha } = payload;
    const response = yield call(api.post, '/conta/RedefinirSenha', {
      cpf,
      matricula,
      senha,
    });
    if (response.status !== 200) {
      throw response;
    }
    yield put(RedefinirSenhaCreators.getRedefinirSenhaSuccess());
    yield goResetPasswordSuccessScreen();
  } catch (err) {
    yield sagaInterceptError(RedefinirSenhaCreators.getRedefinirSenhaFailure, err);
  }
}

export default function* RedefinirSenhaSagas() {
  yield all([throttle(200, RedefinirSenhaTypes.GET_REDEFINIR_SENHA_REQUEST, getRedefinirSenha)]);
}
