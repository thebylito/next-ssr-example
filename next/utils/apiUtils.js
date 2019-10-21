import { put } from 'redux-saga/effects';

const successResponseCodes = [
  '200',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
];

function sagaInterceptResponse(response) {
  if (!successResponseCodes.includes(String(response.status))) {
    throw response;
  }
}

function* sagaInterceptError(creator, response) {
  if (response && response.data && response.data.message) {
    yield put(creator(response.data.message)); // dispatch ação específica de error
    return;
  }
  yield put(creator('Houve um erro no servidor. Tente novamente em instantes'));
}

export default {
  sagaInterceptError,
  sagaInterceptResponse,
};
