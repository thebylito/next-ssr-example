import {
  call, put, all, takeLatest, select,
} from 'redux-saga/effects';
import api, { apiUrl } from 'services/api';
import {
  Creators as PerfilAvatarCreators,
  Types as PerfilAvatarTypes,
} from 'appStore/ducks/perfil/avatar';
// import sagaInterceptError from 'utils/sagaInterceptError';
// import { Types } from 'appStore/ducks/app';

function* getProfileImage() {
  const { data: funcionario } = yield select(state => state.auth);
  yield put(
    PerfilAvatarCreators.getProfileImageUploadSuccess(
      `${apiUrl}Usuario/foto/?login=${
        funcionario.loginDeRede
      }&cache=${new Date().getTime()}`,
    ),
  );
}

function* getImageProfileUpload({ payload }) {
  try {
    const { image } = payload;

    // eslint-disable-next-line no-undef
    const dataUpload = new FormData();
    dataUpload.append('Image', image);

    const response = yield call(api.post, 'usuario/carregarfoto', dataUpload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw response;
    }
    yield getProfileImage();
  } catch (err) {
    console.log(err);
    // yield sagaInterceptError(PerfilAvatarCreators.getProfileImageUploadFailure, err);
  }
}

export default function* () {
  yield all([
    takeLatest(PerfilAvatarTypes.GET_PROFILE_AVATAR_UPLOAD_REQUEST, getImageProfileUpload),
    // takeLatest(Types.GET_INITIALIZE_REQUEST, getProfileImage),
  ]);
}
