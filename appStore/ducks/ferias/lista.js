export const Types = {
  GET_LIST_REQUEST: 'ferias/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'ferias/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'ferias/GET_LIST_FAILURE',
};

const initialState = {
  ferias: [],
  feriasLoading: false,
  feriasError: null,
  meta: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_LIST_REQUEST:
      return {
        ...state,
        feriasLoading: true,
        feriasError: null,
      };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        ferias: action.payload.data,
        meta: action.payload.meta,
        feriasLoading: false,
        feriasError: null,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        feriasLading: false,
        feriasError: action.payload,
        ferias: [],
      };
    default:
      return state;
  }
}

export const Creators = {
  getListaRequest: page => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page },
  }),
  getListaSuccess: ({ data, meta }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, meta },
  }),
  getListaFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
};
