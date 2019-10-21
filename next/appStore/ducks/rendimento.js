export const Types = {
  GET_LIST_REQUEST: 'rendimento/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'rendimento/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'rendimento/GET_LIST_FAILURE',

  GET_RENDIMENTO_DOWNLOAD_REQUEST: 'pagamento/GET_RENDIMENTO_DOWNLOAD_REQUEST',
  GET_RENDIMENTO_DOWNLOAD_SUCCESS: 'pagamento/GET_RENDIMENTO_DOWNLOAD_SUCCESS',
  GET_RENDIMENTO_DOWNLOAD_FAILURE: 'pagamento/GET_RENDIMENTO_DOWNLOAD_FAILURE',
};

const initialState = {
  rendimentos: [],
  rendimentosLoading: false,
  rendimentosError: null,

  rendimentoDownloadLoading: false,
  rendimentoDownloadError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_LIST_REQUEST:
      return {
        ...state, loading: true, error: null, rendimentos: [],
      };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        rendimentos: action.payload.data,
        loading: false,
        error: null,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state, loading: false, error: action.payload, rendimentos: [],
      };
    case Types.GET_RENDIMENTO_DOWNLOAD_REQUEST:
      return {
        ...state,
        rendimentoDownloadLoading: true,
        rendimentoDownloadError: null,
      };
    case Types.GET_RENDIMENTO_DOWNLOAD_SUCCESS:
      return {
        ...state,
        rendimentoDownloadLoading: false,
        rendimentoDownloadError: null,
      };
    case Types.GET_RENDIMENTO_DOWNLOAD_FAILURE:
      return {
        ...state,
        rendimentoDownloadLoading: false,
        rendimentoDownloadError: action.payload.error,
      };
    default:
      return state;
  }
}

export const Creators = {
  getListRequest: () => ({
    type: Types.GET_LIST_REQUEST,
  }),
  getListSuccess: ({ data }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data },
  }),
  getListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  getRendimentoDownloadRequest: ({ ano }) => ({
    type: Types.GET_RENDIMENTO_DOWNLOAD_REQUEST,
    payload: { ano },
  }),
  getRendimentoDownloadSuccess: () => ({
    type: Types.GET_RENDIMENTO_DOWNLOAD_SUCCESS,
  }),
  getRendimentoDownloadFailure: error => ({
    type: Types.GET_RENDIMENTO_DOWNLOAD_FAILURE,
    payload: {
      error,
    },
  }),
};
