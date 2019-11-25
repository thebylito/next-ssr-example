import { type AxiosResponse } from 'axios';

const successResponseCodes = ['200', '201', '202', '203', '204', '205', '206', '207', '208'];

function* interceptResponse(response: AxiosResponse, throwError = true) {
  if (!successResponseCodes.includes(String(response.status))) {
    if (throwError) {
      throw response;
    } else {
      yield false;
    }
  }
  yield true;
}

export default interceptResponse;
