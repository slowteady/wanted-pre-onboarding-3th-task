import axios, { AxiosResponse } from 'axios';

export const getSearchResult = (keyword: string): Promise<AxiosResponse<any>> => {
  return axios.get('https://dusty-titanium-middle.glitch.me/sick', {
    params: {
      q: keyword
    }
  });
};
