export const Types = {
  GET_CPF_EXISTS_REQUEST: 'redefinirSenha/GET_CPF_EXISTS_REQUEST',
  GET_CPF_EXISTS_SUCCESS: 'redefinirSenha/GET_CPF_EXISTS_SUCCESS',
  GET_CPF_EXISTS_FAILURE: 'redefinirSenha/GET_CPF_EXISTS_FAILURE',
};

export type ChecarCpfStore = {
  valido: boolean,
  loading: boolean,
  error: string | null,
};

const initialState = {
  valido: false,
  loading: false,
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.GET_CPF_EXISTS_REQUEST:
      return { ...state, loading: true };
    case Types.GET_CPF_EXISTS_SUCCESS:
      return {
        valido: true,
        loading: false,
        error: null,
      };
    case Types.GET_CPF_EXISTS_FAILURE:
      return { valido: false, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getCpfExistsRequest: cpf => ({
    type: Types.GET_CPF_EXISTS_REQUEST,
    payload: { cpf },
  }),
  getCpfExistsSuccess: () => ({
    type: Types.GET_CPF_EXISTS_SUCCESS,
  }),
  getCpfExistsFailure: error => ({
    type: Types.GET_CPF_EXISTS_FAILURE,
  }),
};
