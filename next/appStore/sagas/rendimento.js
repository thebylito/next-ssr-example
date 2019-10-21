import {
  call, put, all, takeLatest, select,
} from 'redux-saga/effects';
import api, { apiUrl } from 'services/api';
import {
  Creators as RendimentoCreators,
  Types as RendimentoTypes,
} from 'appStore/ducks/rendimento';
import axios from 'axios';


function* getListaRendimentos() {
  try {
    const response = yield call(api.get, 'usuario/rendimentos');
    if (response.status !== 200) {
      throw new Error(response);
    }
    const { data } = response;
    yield put(RendimentoCreators.getListSuccess({ data }));
  } catch (err) {
    yield put(RendimentoCreators.getListFailure('Erro ao buscar dados da API'));
  }
}

function* getRendimentoDownload({ payload }) {
  try {
    const { ano } = payload;
    const { matricula } = yield select(state => state.auth.data);

    const path = `${apiUrl.replace('api/', '')}Relatorios/ImprimeRendimentos/`;
    const response = yield call(axios.post(path,
      `ano=${ano}&matricula=${matricula}`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }));
    console.log(response);
    const blob = new Blob([response.data], {
      type: 'application/pdf',
    });
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    window.open(url);

    // yield call(window.open, path, '_newtab');


    yield put(RendimentoCreators.getRendimentoDownloadSuccess());
  } catch (e) {
    console.log(e);
    // yield sagaInterceptRequestError(RendimentoCreators.getRendimentoDownloadFailure, e);
  }
}

export default function* RendimentoSagas() {
  yield all([
    takeLatest(RendimentoTypes.GET_LIST_REQUEST, getListaRendimentos),
    takeLatest(RendimentoTypes.GET_RENDIMENTO_DOWNLOAD_REQUEST, getRendimentoDownload),
  ]);
}
