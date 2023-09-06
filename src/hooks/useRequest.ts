import { useEffect, useState } from 'react';
import { getSearchResult } from '../api/searchApi';
import { SickObj } from '../types/sickTypes';
import { strCheck } from '../utils/validate';

const ERROR_MESSAGES = '에러가 발생하였습니다.';

function useRequest(keyword: string) {
  const [sicks, setSicks] = useState<SickObj[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

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
              setIsEmpty(false);
            }
            setIsLoading(false);
          } else {
            setIsLoading(false);

            const msg = ERROR_MESSAGES;
            throw new Error(msg);
          }
        } catch (err) {
          setIsLoading(false);

          if (err instanceof Error) {
            alert(`Error: ${err.message}`);
          } else {
            alert(ERROR_MESSAGES);
          }
        }
      };
      fetchData();
    } else {
      setSicks([]);
      setIsLoading(false);
      setIsEmpty(true);
    }
  }, [keyword]);

  return { sicks, isLoading, isEmpty };
}

export default useRequest;
