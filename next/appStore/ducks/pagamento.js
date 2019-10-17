export const Types = {
  GET_REQUEST: 'pagamento/GET_REQUEST',
  GET_SUCCESS: 'pagamento/GET_SUCCESS',
  GET_FAILURE: 'pagamento/GET_FAILURE',

  GET_LIST_REQUEST: 'pagamento/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'pagamento/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'pagamento/GET_LIST_FAILURE',

  GET_PAGAMENTO_DOWNLOAD_REQUEST: 'pagamento/GET_PAGAMENTO_DOWNLOAD_REQUEST',
  GET_PAGAMENTO_DOWNLOAD_SUCCESS: 'pagamento/GET_PAGAMENTO_DOWNLOAD_SUCCESS',
  GET_PAGAMENTO_DOWNLOAD_FAILURE: 'pagamento/GET_PAGAMENTO_DOWNLOAD_FAILURE',
};

const initialState = {
  pagamentos: [],
  pagamentosLoading: false,
  pagamentosError: null,

  pagamento: {},
  pagamentoLoading: false,
  pagamentoError: null,

  pagamentoDownloadLoading: false,
  pagamentoDownloadError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        pagamentoLoading: true,
        pagamentoError: null,
        pagamento: null,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        pagamento: action.payload.data,
        pagamentoLoading: false,
        pagamentoError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        pagamentoLoading: false,
        pagamentoError: action.payload,
        pagamento: {},
      };

    case Types.GET_LIST_REQUEST:
      return {
        ...state,
        pagamentosLoading: true,
        pagamentosError: null,
      };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        pagamentos: action.payload.data,
        pagamentosLoading: false,
        pagamentosError: null,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        pagamentosLading: false,
        pagamentosError: action.payload,
        pagamentos: [],
      };
    case Types.GET_PAGAMENTO_DOWNLOAD_REQUEST:
      return {
        ...state,
        pagamentoDownloadLoading: true,
        pagamentoDownloadError: null,
      };
    case Types.GET_PAGAMENTO_DOWNLOAD_SUCCESS:
      return {
        ...state,
        pagamentoDownloadLoading: false,
        pagamentoDownloadError: null,
      };
    case Types.GET_PAGAMENTO_DOWNLOAD_FAILURE:
      return {
        ...state,
        pagamentoDownloadLoading: false,
        pagamentoDownloadError: action.payload.error,
      };
    default:
      return state;
  }
}

export const Creators = {
  getRequest: ({ mes, ano, pagamentoId = 0 }) => ({
    type: Types.GET_REQUEST,
    payload: { mes, ano, pagamentoId },
  }),
  getSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  getListRequest: page => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page },
  }),
  getListSuccess: ({ data }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data },
  }),
  getListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  getPagamentoDownloadRequest: ({
 mes, ano, matricula, semana, roteiro
}) => ({
    type: Types.GET_PAGAMENTO_DOWNLOAD_REQUEST,
    payload: {
      mes,
      ano,
      matricula,
      semana,
      roteiro,
    },
  }),
  getPagamentoDownloadSuccess: () => ({
    type: Types.GET_PAGAMENTO_DOWNLOAD_SUCCESS,
  }),
  getPagamentoDownloadFailure: error => ({
    type: Types.GET_PAGAMENTO_DOWNLOAD_FAILURE,
    payload: { error },
  }),
};
