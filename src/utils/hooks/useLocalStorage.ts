import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from 'utils/chrome/storage';
import { LocalStorage } from 'models/Storage';

export const useLocalStorage = () => {
  const [state, setState] = useState({} as LocalStorage);

  useEffect(() => {
    let mounted = true;

    getLocalStorage().then(val => {
      if (mounted) {
        setState(val);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const listener = (changes: Record<string, chrome.storage.StorageChange>) => {
      const clone = { ...state } as any;
      for (let key in changes) {
        clone[key] = changes[key].newValue;
      }
      setState(clone);
      console.log({ state, clone });
    };

    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  });

  return [state, setLocalStorage] as const;
};
