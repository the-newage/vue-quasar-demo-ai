import axios from 'axios';
import { useErrorStore } from '@/stores/error';

export const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  // In a real app, you'd get the token from your auth store
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
    const errorStore = useErrorStore();
    const errorMessage =
      error.response?.data?.message || error.message || 'An unknown error occurred';
    errorStore.setError(errorMessage);

    // Example of handling specific error codes
    if (error.response?.status === 419) {
      // In a real app, you might want to logout the user
      // const auth = useAuthStore();
      // auth.logout();
    }

    return Promise.reject(error);
  },
);
