export const Types = {
  GET_SUCCESS: 'auth/GET_SUCCESS',
  GET_LOGOUT_SUCCESS: 'auth/GET_LOGOUT_SUCCESS',
};

const initialState = {
  data: [],
  token: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.GET_SUCCESS:
      return {
        data: action.payload.funcionario,
        token: action.payload.token,
      };
    case Types.GET_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export const Creators = {
  getAuthSuccess: ({ funcionario, token }) => ({
    type: Types.GET_SUCCESS,
    payload: { funcionario, token },
  }),
  getLogoutSuccess: () => ({
    type: Types.GET_LOGOUT_SUCCESS,
  }),
};
