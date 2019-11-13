export const Types = {
  GET_REQUEST: 'ferias/GET_REQUEST',
  GET_SUCCESS: 'ferias/GET_SUCCESS',
  GET_FAILURE: 'ferias/GET_FAILURE',

  GET_PAGAMENTO_DOWNLOAD_REQUEST: 'ferias/GET_PAGAMENTO_DOWNLOAD_REQUEST',
  GET_PAGAMENTO_DOWNLOAD_SUCCESS: 'ferias/GET_PAGAMENTO_DOWNLOAD_SUCCESS',
  GET_PAGAMENTO_DOWNLOAD_FAILURE: 'ferias/GET_PAGAMENTO_DOWNLOAD_FAILURE',
};

const initialState = {
  ferias: null,
  detalhes: null,
  loading: false,
  error: null,

  itemDownloadLoading: false,
  itemDownloadError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        ferias: null,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        ferias: action.payload.data,
        detalhes: action.payload.detalhes,
        loading: false,
        error: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ferias: null,
      };

    case Types.GET_PAGAMENTO_DOWNLOAD_REQUEST:
      return {
        ...state,
        itemDownloadLoading: true,
        itemDownloadError: null,
      };
    case Types.GET_PAGAMENTO_DOWNLOAD_SUCCESS:
      return {
        ...state,
        itemDownloadLoading: false,
        itemDownloadError: null,
      };
    case Types.GET_PAGAMENTO_DOWNLOAD_FAILURE:
      return {
        ...state,
        itemDownloadLoading: false,
        itemDownloadError: action.payload.error,
      };
    default:
      return state;
  }
}

export const Creators = {
  getRequest: ({ periodo }) => ({
    type: Types.GET_REQUEST,
    payload: { periodo },
  }),
  getSuccess: ({ data, detalhes }) => ({
    type: Types.GET_SUCCESS,
    payload: { data, detalhes },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  getFeriasDownloadRequest: ({
    mes, ano, semana, roteiro,
  }) => ({
    type: Types.GET_PAGAMENTO_DOWNLOAD_REQUEST,
    payload: {
      mes,
      ano,
      semana,
      roteiro,
    },
  }),
  getFeriasDownloadSuccess: () => ({
    type: Types.GET_PAGAMENTO_DOWNLOAD_SUCCESS,
  }),
  getFeriasDownloadFailure: error => ({
    type: Types.GET_PAGAMENTO_DOWNLOAD_FAILURE,
    payload: { error },
  }),
};
