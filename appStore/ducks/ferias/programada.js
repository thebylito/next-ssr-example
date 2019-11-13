export const Types = {
  GET_REQUEST: 'ferias-programada/GET_REQUEST',
  GET_SUCCESS: 'ferias-programada/GET_SUCCESS',
  GET_FAILURE: 'ferias-programada/GET_FAILURE',
};

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        detalhes: action.payload.detalhes,
        loading: false,
        error: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
}

export const Creators = {
  getRequest: () => ({
    type: Types.GET_REQUEST,
  }),
  getSuccess: (data) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
};
