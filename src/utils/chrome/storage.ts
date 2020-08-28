import { LocalStorage } from 'models/Storage';

export const getLocalStorage = async (key: string | null = null) => {
  let value = await new Promise(resolve => {
    chrome.storage.local.get(key, resolve);
  });

  return value as LocalStorage;
};

export const setLocalStorage = (value: Partial<LocalStorage>) => {
  return new Promise(resolve => chrome.storage.local.set(value, resolve));
};
