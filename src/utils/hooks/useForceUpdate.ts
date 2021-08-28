import { useState, useEffect } from 'react';

export const useForceUpdate = (ms?: number) => {
  const [, setState] = useState(true);

  useEffect(() => {
    if (ms) {
      const interval = setInterval(() => {
        setState(s => !s);
      }, ms);

      return () => clearInterval(interval);
    }
  }, [ms]);

  return () => setState(s => !s);
};
