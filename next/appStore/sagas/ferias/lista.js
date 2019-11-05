import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as FeriasListaCreators,
  Types as FeriasListaTypes,
} from 'appStore/ducks/ferias/lista';


function* getFeriasLista() {
  try {
    const response = yield call(api.get, 'v2/ferias/lista');
    if (response.status !== 200) {
      throw new Error(response);
    }
    const { data, ...meta } = response.data;
    console.log(data);
    yield put(FeriasListaCreators.getListaSuccess({ data, meta }));
  } catch (err) {
    yield put(FeriasListaCreators.getListaFailure('Erro ao buscar dados da API'));
  }
}

export default function* () {
  yield all([
    takeLatest(FeriasListaTypes.GET_LIST_REQUEST, getFeriasLista),
  ]);
}
