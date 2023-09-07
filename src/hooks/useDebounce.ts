import { useEffect, useRef, useState } from 'react';

function useDebounce(value: string, timeTerm: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => setDebouncedValue(value), timeTerm);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, timeTerm]);

  return debouncedValue;
}

export default useDebounce;
