/* eslint-disable import/prefer-default-export */
const formatPrice = (value) => parseFloat(value).toLocaleString('pt-BR', {
  // Ajustando casas decimais
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
});

const isNullOrUndefined = value => value === undefined || value === null || value === '';

export const appUtils = {
  formatPrice,
  isNullOrUndefined,
};
