import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as MensagensListaCreators,
  Types as MensagensListaTypes,
} from 'appStore/ducks/mensagem/lista';


function* getMensagensLista() {
  try {
    const response = yield call(api.get, 'mensagem/lista');
    if (response.status !== 200) {
      throw new Error(response);
    }
    const { data } = response;
    yield put(MensagensListaCreators.getListSuccess({ data }));
  } catch (err) {
    yield put(MensagensListaCreators.getListFailure('Erro ao buscar dados da API'));
  }
}

export default function* () {
  yield all([
    takeLatest(MensagensListaTypes.GET_REQUEST, getMensagensLista),
  ]);
}
