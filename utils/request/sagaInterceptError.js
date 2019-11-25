import { put } from 'redux-saga/effects';
import { type AxiosResponse } from 'axios';

const successResponseCodes = ['200', '201', '202', '203', '204', '205', '206', '207', '208'];

function* sagaInterceptResponse(response: AxiosResponse) {
  if (!successResponseCodes.includes(String(response.status))) {
    throw response;
  }
  yield response;
}

function* sagaInterceptRequestError(creator, err) {
  try {
    if (err?.data?.response) {
      if (err.status === 500 && !err.data.response.data) {
        yield put(creator(err.data.message)); // dispatch ação específica de error
      }
    }
    if (err.data?.message) {
      // yield showNotification({
      //   type: 'danger',
      //   message: err.data.message,
      // });
    }
  } catch (e) {
    yield put(creator('Houve um erro no servidor. Tente novamente em instantes'));
  }
}

export default sagaInterceptRequestError;
export { sagaInterceptResponse };
