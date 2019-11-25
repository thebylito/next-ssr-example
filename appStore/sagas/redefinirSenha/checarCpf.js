import { call, put, all, throttle } from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as ChecarCpfCreators,
  Types as ChecarCpfTypes,
} from 'store/ducks/redefinirSenha/checarCpf';
import sagaInterceptError from 'utils/sagaInterceptError';

function* getChecarCpf({ payload }) {
  try {
    const { cpf } = payload;
    const response = yield call(api.get, `/conta/checarcpf?cpf=${cpf}`);
    if (response.status !== 200) {
      throw response;
    }
    yield put(ChecarCpfCreators.getCpfExistsSuccess());
  } catch (err) {
    yield sagaInterceptError(ChecarCpfCreators.getCpfExistsFailure, err);
  }
}

export default function* ChecarCpfSagas() {
  yield all([throttle(200, ChecarCpfTypes.GET_CPF_EXISTS_REQUEST, getChecarCpf)]);
}
