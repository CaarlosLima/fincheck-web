import axios from 'axios';

import { localStorageKeys } from '../config/localStorageKeys';
import { delay } from '../utils/delay';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const configAuthorization = config;

  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    configAuthorization.headers.Authorization = `Bearer ${accessToken}`;
  }

  return configAuthorization;
});

httpClient.interceptors.response.use(async (data) => {
  await delay(500);

  return data;
});
