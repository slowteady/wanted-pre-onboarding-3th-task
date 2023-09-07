import apiClient from '../api/axiosInstance';

const REQUEST_SUCCESS = 200;
const EXPIRE_TIME = 1000 * 60 * 60;

class CacheManager {
  cacheName: string;

  constructor(cacheName: string) {
    this.cacheName = cacheName;
  }

  async set(key: string, value: string) {
    const cache = await caches.open(this.cacheName);
    const now = new Date();
    const item = {
      value,
      expire: now.getTime() + EXPIRE_TIME
    };
    const response = new Response(JSON.stringify(item));
    await cache.put(key, response);
  }

  async get(key: string) {
    const cache = await caches.open(this.cacheName);
    const response = await cache.match(key);

    if (response) {
      const item = await response.json();
      const now = new Date();
      if (now.getTime() > item.expire) {
        await cache.delete(key);
        return null;
      }
      return item;
    }
  }

  async getSearchData(path: string) {
    const cachedData = await this.get(path);

    if (cachedData) {
      return Promise.resolve({ data: cachedData.value, status: REQUEST_SUCCESS });
    } else {
      const response = await apiClient.get(path);
      await this.set(path, response.data);

      return response;
    }
  }
}

export default CacheManager;
