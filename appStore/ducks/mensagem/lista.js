export const Types = {
  GET_REQUEST: 'mensagensLista/GET_REQUEST',
  GET_SUCCESS: 'mensagensLista/GET_SUCCESS',
  GET_FAILURE: 'mensagensLista/GET_FAILURE',
};

const initialState = {
  mensagens: [],
  mensagensLoading: false,
  mensagensError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        mensagensLoading: true,
        mensagensError: null,
        mensagens: [],
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        mensagens: action.payload.data,
        mensagensLoading: false,
        mensagensError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        mensagensLoading: false,
        mensagensError: action.payload,
        mensagens: [],
      };
    default:
      return state;
  }
}

export const Creators = {
  getListRequest: page => ({
    type: Types.GET_REQUEST,
    payload: { page },
  }),
  getListSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getListFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
};
