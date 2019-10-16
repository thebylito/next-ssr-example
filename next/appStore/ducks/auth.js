export const Types = {
  GET_REQUEST: 'login/GET_REQUEST',
  GET_SUCCESS: 'login/GET_SUCCESS',
  GET_FAILURE: 'login/GET_FAILURE',

  GET_LOGOUT_REQUEST: 'login/GET_LOGOUT_REQUEST',
};

const initialState = {
  data: [],
  token: '',
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return {
        data: action.payload.funcionario,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case Types.GET_LOGOUT_REQUEST:
      return initialState;
    default:
      return state;
  }
}

export const Creators = {
  getLoginRequest: ({ login, senha }) => ({
    type: Types.GET_REQUEST,
    payload: { login, senha },
  }),
  getLoginSuccess: ({ funcionario, token }) => ({
    type: Types.GET_SUCCESS,
    payload: { funcionario, token },
  }),
  getLoginFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  getLogoutRequest: () => ({
    type: Types.GET_LOGOUT_REQUEST,
  }),
};
