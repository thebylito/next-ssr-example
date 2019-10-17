import {
  call, put, all, takeLatest, select, takeLeading,
} from 'redux-saga/effects';
import api, { apiUrl } from 'services/api';
import {
  Creators as PagamentoCreators,
  Types as PagamentoTypes,
} from 'appStore/ducks/pagamento';


function* getPagamento({ payload }) {
  try {
    const { mes, ano, pagamentoId } = payload;
    const response = yield call(api.get, 'usuario/pagamento', {
      mes,
      ano,
      pagamentoId,
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
    const response = yield call(api.get, 'usuario/pagamentos', {
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
    const {
      mes, ano, matricula, semana, roteiro,
    } = payload;
    const path = `${apiUrl.replace('api/', '')}/Relatorios/ImprimeHolerite/`;

    // const request = yield call(
    //   config.fetch,
    //   'POST',
    //   path,
    //   {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   `mes=${mes}&ano=${ano}&matricula=${matricula}&semana=${semana}&roteiro=${roteiro}`,
    // );

    yield put(PagamentoCreators.getPagamentoDownloadSuccess());
  } catch (e) {
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
