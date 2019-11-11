import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as FeriasProgramadaCreators,
  Types as FeriasProgramadaTypes,
} from 'appStore/ducks/ferias/programada';

function* getFeriasProgramadas() {
  try {
    const response = yield call(api.get, 'v2/ferias/programadas');
    if (response.status !== 200) {
      throw new Error(response);
    }
    yield put(FeriasProgramadaCreators.getSuccess(response.data));
  } catch (err) {
    yield put(FeriasProgramadaCreators.getFailure('Erro ao buscar dados da API'));
  }
}

export default function* () {
  yield all([
    takeLatest(FeriasProgramadaTypes.GET_REQUEST, getFeriasProgramadas),
  ]);
}
