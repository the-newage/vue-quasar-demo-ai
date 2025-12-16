import axios from 'axios';
// import { useAuthStore } from '@/stores/auth';

export const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  // const auth = useAuthStore();
  // if (auth.token) {
  //   config.headers = config.headers ?? {};
  //   config.headers.Authorization = `Bearer ${auth.token}`;
  // }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 419) {
      // const auth = useAuthStore();
      // auth.logout();
    }
    return Promise.reject(new Error(error.message));
  },
);
