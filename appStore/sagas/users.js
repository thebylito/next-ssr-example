import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Creators as UsersCreators, Types as UsersTypes } from '../ducks/users';
import api from '../../services/api';
import interceptResponse from 'utils/request/interceptResponse';
import interceptError from 'utils/request/interceptError';

function* getUsers({ payload }) {
  try {
    const { page } = payload;
    const response = yield call(api.get, '/users', {
      page,
    });
    yield interceptResponse(response);
    const { data } = response;
    yield put(UsersCreators.getUsersSuccess(data.data));
  } catch (err) {
    yield interceptError(UsersCreators.getUsersFailure, err);
  }
}

export default function* AuthSagas() {
  yield all([takeLatest(UsersTypes.GET_REQUEST, getUsers)]);
}
