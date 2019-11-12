export const Types = {
  GET_PROFILE_AVATAR_UPLOAD_REQUEST: 'profile/GET_PROFILE_AVATAR_UPLOAD_REQUEST',
  GET_PROFILE_AVATAR_UPLOAD_SUCCESS: 'profile/GET_PROFILE_AVATAR_UPLOAD_SUCCESS',
  GET_PROFILE_AVATAR_UPLOAD_FAILURE: 'profile/GET_PROFILE_AVATAR_UPLOAD_FAILURE',
};

const initialState = {
  imageUrl: '',
  imageUploadLoading: false,
  imageUploadLError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_PROFILE_AVATAR_UPLOAD_REQUEST:
      return {
        ...state,
        imageUploadLoading: true,
        imageUploadLError: null,
      };
    case Types.GET_PROFILE_AVATAR_UPLOAD_SUCCESS:
      return {
        ...state,
        imageUrl: action.payload.imageUrl,
        imageUploadLoading: false,
        imageUploadLError: null,
      };
    case Types.GET_PROFILE_AVATAR_UPLOAD_FAILURE:
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadLError: action.payload,
      };
    default:
      return state;
  }
}

export const Creators = {
  getProfileImageUploadRequest: image => ({
    type: Types.GET_PROFILE_AVATAR_UPLOAD_REQUEST,
    payload: { image },
  }),
  getProfileImageUploadSuccess: imageUrl => ({
    type: Types.GET_PROFILE_AVATAR_UPLOAD_SUCCESS,
    payload: { imageUrl },
  }),
  getProfileImageUploadFailure: error => ({
    type: Types.GET_PROFILE_AVATAR_UPLOAD_FAILURE,
    payload: error,
  }),
};
