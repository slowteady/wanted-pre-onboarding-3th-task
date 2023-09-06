import { AxiosResponse } from 'axios';
import apiClient from './axiosInstance';

export const getSearchResult = (keyword: string): Promise<AxiosResponse<any>> =>
  apiClient.get('/sick', { params: { q: keyword } });
