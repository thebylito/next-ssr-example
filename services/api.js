import { create } from 'apisauce';

export const apiUrl =
  process.env.NODE_ENV === 'production' ? 'https://reqres.in/api' : 'https://reqres.in/api';

const api = create({
  baseURL: apiUrl,
  headers: {
    Authorization: '',
  },
});

export default api;
