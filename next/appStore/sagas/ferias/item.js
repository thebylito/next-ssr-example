import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import api from 'services/api';
import {
  Creators as FeriasItemCreators,
  Types as FeriasItemTypes,
} from 'appStore/ducks/ferias/item';

import moment from 'moment';


function* getFeriasDetalhes({ payload }) {
  try {
    const { periodo } = payload;
    const response = yield call(api.get, 'v2/ferias/detalhes', {
      periodo: moment(periodo, 'YYYYMMDD').format('YYYYMM'),
    });
    if (response.status !== 200) {
      throw new Error(response);
    }
    yield put(FeriasItemCreators.getSuccess(response.data));
  } catch (err) {
    yield put(FeriasItemCreators.getFailure('Erro ao buscar dados da API'));
  }
}

export default function* () {
  yield all([
    takeLatest(FeriasItemTypes.GET_REQUEST, getFeriasDetalhes),
  ]);
}
