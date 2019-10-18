import { create } from 'apisauce';

export const apiUrl = 'http://meurh.sanesul.ms.gov.br/api/';

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
