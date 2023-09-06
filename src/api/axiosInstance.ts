import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.info('calling api');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
