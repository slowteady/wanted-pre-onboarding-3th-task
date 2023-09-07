import { useEffect, useState } from 'react';
import { getSearchResult } from '../api/searchApi';
import { SickObj } from '../types/sickTypes';
import handleError from '../utils/handleError';
import { strCheck } from '../utils/validate';

export const ERROR_MESSAGES = '에러가 발생하였습니다.';

function useRequest(keyword: string) {
  const [sicks, setSicks] = useState<SickObj[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (strCheck.isNotEmpty(keyword)) {
      const fetchData = async () => {
        setIsLoading(true);

        try {
          const response = await getSearchResult(keyword);
          if (response.status === 200) {
            const { data } = response;

            if (data && data.length > 0) {
              setSicks(data);
            }
            setIsLoading(false);
          } else {
            setIsLoading(false);
            throw new Error();
          }
        } catch (error) {
          setIsLoading(false);
          handleError(error);
        }
      };
      fetchData();
    } else {
      setSicks([]);
      setIsLoading(false);
    }
  }, [keyword]);

  return { sicks, isLoading };
}

export default useRequest;
