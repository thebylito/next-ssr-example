import { put } from 'redux-saga/effects';
import { type AxiosResponse } from 'axios';

function* interceptError(creator, response: AxiosResponse) {
  let message = 'Houve um erro no servidor. Tente novamente em instantes';
  if (response?.data?.message) {
    message = response.data.message;
    yield put(creator(response.data.message)); // dispatch ação específica de error
    return message;
  }
  yield put(creator(message));
  return message;
}

export default interceptError;
