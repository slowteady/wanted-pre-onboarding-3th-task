import apiClient from '../api/axiosInstance';

const REQUEST_SUCCESS = 200;

class CacheManager {
  cacheName: string;

  constructor(cacheName: string) {
    this.cacheName = cacheName;
  }

  async set(key: string, value: string) {
    const cache = await caches.open(this.cacheName);
    const response = new Response(JSON.stringify(value));
    await cache.put(key, response);
  }

  async get(key: string) {
    const cache = await caches.open(this.cacheName);
    const response = await cache.match(key);

    if (response) {
      return response.json();
    }
  }

  async getSearchData(path: string) {
    const cachedData = await this.get(path);

    if (cachedData) {
      return Promise.resolve({ data: cachedData, status: REQUEST_SUCCESS });
    } else {
      const response = await apiClient.get(path);
      await this.set(path, response.data);

      return response;
    }
  }
}

export default CacheManager;
