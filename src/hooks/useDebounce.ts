import { useEffect, useState } from 'react';

function useDebounce(value: string, timeTerm: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), timeTerm);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeTerm]);

  return debouncedValue;
}

export default useDebounce;
