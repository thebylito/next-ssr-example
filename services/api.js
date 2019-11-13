import { create } from 'apisauce';

export const apiUrl = process.env.NODE_ENV === 'production'
  ? 'http://meurh.sanesul.ms.gov.br/api/'
  : 'http://localhost:30000/api/';

const api = create({
  baseURL: apiUrl,
  headers: {
    Authorization: '',
  },
});

const debugApi = create({
  baseURL: 'http://applogs.appdev.sanesul.ms.gov.br/api',
});

export default api;
export { debugApi };
