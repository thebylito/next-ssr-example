export const Types = {
  GET_REDEFINIR_SENHA_REQUEST: 'redefinirSenha/GET_REDEFINIR_SENHA_REQUEST',
  GET_REDEFINIR_SENHA_SUCCESS: 'redefinirSenha/GET_REDEFINIR_SENHA_SUCCESS',
  GET_REDEFINIR_SENHA_FAILURE: 'redefinirSenha/GET_REDEFINIR_SENHA_FAILURE',
};

export type RedefinirSenhaStore = {
  loading: boolean,
  error: string | null,
};

const initialState = {
  loading: false,
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REDEFINIR_SENHA_REQUEST:
      return { ...state, loading: true };
    case Types.GET_REDEFINIR_SENHA_SUCCESS:
      return {
        loading: false,
        error: null,
      };
    case Types.GET_REDEFINIR_SENHA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getRedefinirSenhaRequest: ({ cpf, senha, matricula }) => ({
    type: Types.GET_REDEFINIR_SENHA_REQUEST,
    payload: { cpf, senha, matricula },
  }),
  getRedefinirSenhaSuccess: () => ({
    type: Types.GET_REDEFINIR_SENHA_SUCCESS,
  }),
  getRedefinirSenhaFailure: error => ({
    type: Types.GET_REDEFINIR_SENHA_FAILURE,
  }),
};
