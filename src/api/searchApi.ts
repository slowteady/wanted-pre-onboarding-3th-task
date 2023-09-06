import { SickObj } from '../types/sickTypes';
import CacheManager from '../utils/CacheManager';

interface Searchdata {
  data: SickObj[];
  status: number;
}

const cacheManager = new CacheManager('sick-cache');

export const getSearchResult = async (keyword: string): Promise<Searchdata> => {
  const path = `/sick?q=${keyword}`;

  return cacheManager.getSearchData(path);
};
