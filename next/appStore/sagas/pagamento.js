import {
  call, put, all, takeLatest, select, takeLeading,
} from 'redux-saga/effects';
import api, { apiUrl } from 'services/api';
import {
  Creators as PagamentoCreators,
  Types as PagamentoTypes,
} from 'appStore/ducks/pagamento';
import axios from 'axios';
import { apiUtils } from 'utils/apiUtils';


function* getPagamento({ payload }) {
  try {
    const {
      mes, ano, roteiro, semana,
    } = payload;
    const response = yield call(api.get, 'v2/pagamentos/detalhes', {
      mes, ano, roteiro, semana,

    });
    if (response.status !== 200) {
      throw new Error(response);
    }
    const { data } = response;
    yield put(PagamentoCreators.getSuccess({ data }));
  } catch (err) {
    yield put(PagamentoCreators.getFailure('Erro ao buscar dados da API'));
  }
}

function* getListaPagamentos({ payload }) {
  try {
    const { page } = payload;
    const response = yield call(api.get, 'v2/pagamentos/lista', {
      perPage: 12,
      page,
    });
    if (response.status !== 200) {
      throw new Error(response);
    }
    if (page >= 2) {
      const { pagamentos } = yield select(state => state.pagamento);
      yield put(
        PagamentoCreators.getListSuccess({
          data: [...pagamentos, ...response.data.data],
        }),
      );
    } else {
      yield put(PagamentoCreators.getListSuccess(response.data));
    }
  } catch (err) {
    yield put(PagamentoCreators.getListFailure('Erro ao buscar dados da API'));
  }
}

function* getPagamentoDownload({ payload }) {
  try {
    const { matricula } = yield select(state => state.auth.data);
    const {
      mes, ano, semana, roteiro,
    } = payload;
    const path = `${apiUrl.replace('api/', '')}Relatorios/ImprimeHolerite/`;

    const response = yield call(axios.post, path,
      `mes=${mes}&ano=${ano}&matricula=${matricula}&semana=${semana}&roteiro=${roteiro}`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        responseType: 'blob',
      });
    // eslint-disable-next-line no-undef
    const url = yield call(window.URL.createObjectURL, response.data);
    // eslint-disable-next-line no-undef
    yield call(window.open, url);

    yield put(PagamentoCreators.getPagamentoDownloadSuccess());
  } catch (e) {
    yield apiUtils.sagaInterceptError(PagamentoCreators.getPagamentoDownloadFailure, e);
    // console.tron.log(e.toString());
    // yield sagaInterceptRequestError(PagamentoCreators.getPagamentoDownloadFailure, e);
  }
}

export default function* PagamentoSagas() {
  yield all([
    takeLatest(PagamentoTypes.GET_REQUEST, getPagamento),
    takeLatest(PagamentoTypes.GET_PAGAMENTO_DOWNLOAD_REQUEST, getPagamentoDownload),
    takeLeading(PagamentoTypes.GET_LIST_REQUEST, getListaPagamentos),
  ]);
}
