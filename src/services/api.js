import axios from 'axios';
import Constantes from '../constants/Constantes'
import { getToken } from './auth';

export const api = axios.create({ baseURL: `http://${Constantes.HTTP_HOST}:3333` });

api.interceptors.request.use(async config => {
  const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  return config;
});

export default api;