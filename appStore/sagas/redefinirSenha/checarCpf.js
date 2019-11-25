import { call, put, all, throttle } from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as ChecarCpfCreators,
  Types as ChecarCpfTypes,
} from 'appStore/ducks/redefinirSenha/checarCpf';
import interceptError from 'utils/request/interceptError';
import interceptResponse from 'utils/request/interceptResponse';
import Notifications from 'react-notification-system-redux';

function* getChecarCpf({ payload }) {
  try {
    const { cpf } = payload;
    const response = yield call(api.get, `/conta/checarcpf?cpf=${cpf}`);
    yield interceptResponse(response);
    yield put(ChecarCpfCreators.getCpfExistsSuccess());
  } catch (err) {
    yield interceptError(ChecarCpfCreators.getCpfExistsFailure, err);
    yield put(
      Notifications.warning({ title: 'OPS...', message: 'CPF incorreto, insira novamente.' })
    );
  }
}

export default function* ChecarCpfSagas() {
  yield all([throttle(200, ChecarCpfTypes.GET_CPF_EXISTS_REQUEST, getChecarCpf)]);
}
